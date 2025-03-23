const bookModel = require("../models/bookModel");
const { successResponse, errorResponse } = require("../utility/response");


// book upload

const uploadBook = async (req, res) => {
    try {
        let reqBody = req.body;
        let data = await bookModel.create(reqBody);
        return successResponse(res, 201, "Book data upload successfully", data);
    } catch (error) {
        return errorResponse(res, 500, "Something went wrong", error)
    }
};


// book find by id

const singleBook = async (req, res) => {
    try {
        let id = req.params.id;
        const filter = {
            _id: id
        };
        let data = await bookModel.findById(filter);
        if(!data){
            return errorResponse(res,404,"Book not found.", null)
        }
        return successResponse(res, 200, "Data fetch by id book successfully", data);
    } catch (error) {
        return errorResponse(res, 500, "Something went wrong", error);
    }
};

// all books


const allBook = async (req, res) => {
    try {
        const { page, limit, genre, minYear, maxYear, authore, minPrice, maxPrice, sortBy, order, search } = req.query;
        const currentPage = Math.max(1, parseInt(page) || 1);
        const perPage = parseInt(limit) || 10;
        const skip = (currentPage - 1) * perPage;
        const filter = {};
        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: "i" } },
                { author: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } }
            ]
        };

        if (genre) {
            filter.genre = genre
        }

        if (minYear || maxYear) {
            filter.publishedYear = {};

            if (minYear) {
                filter.publishedYear.$gte = parseInt(minYear);
            }

            if (maxYear) {
                filter.publishedYear.$lte = parseInt(maxYear);
            }
        }

        if (authore) filter.author = authore;

        if (minPrice || maxPrice) {
            if (minPrice) {
                filter.price.$gte = parseFloat(minPrice)
            }
            if (maxPrice) {
                filter.price.$lte = parseFloat(maxPrice);
            }
        }

        const sortOptions = {
            [sortBy || "title"]: order === "desc" ? -1 : 1
        }

        const [book, totalBook] = await Promise.all([bookModel.find(filter).sort(sortOptions).skip(skip).limit(perPage), bookModel.countDocuments(filter)])


        // const data = await bookModel.find(filter).sort(sortOptions).skip(skip).limit(perPage);
        // return successResponse(res, 200, "Data fetch successfully", book,totalPage,currentPage);
        return res.status(200).json({
            status: "success",
            data: book,
            totalBook: totalBook,
            totalPage: Math.ceil(totalBook / perPage),
            currentPage: currentPage
        })
    } catch (error) {
        console.log(error)
        return errorResponse(res, 500, "Something went wrong", error);
    }
};

const updateBook = async (req, res) => {
    try {
        let reqBody = req.body;
        const id = req.params.id;
        const filter = {
            _id: id
        };
        const data = await bookModel.updateOne(filter, reqBody, { upsert: true });
        if (!data) return errorResponse(res, 404, "Data not found", null);
        return successResponse(res, 200, "Book update successfully", data);
    } catch (error) {
        console.log(error)
        return errorResponse(res, 500, "Something went wrong", error);
    }
};

const deleteBook = async (req,res)=>{
    try {
        let id = req.params.id;
        const filter = {
            _id : id
        };
        const data = await bookModel.deleteOne(filter);
        if(!data){
            return errorResponse(res,404,"Data not found",null);
        }
        return successResponse(res,200,"Book delete succesfully.",data);
    } catch (error) {
        return errorResponse(res,500,"Something went wrong.", error )
    }
}



module.exports = {
    uploadBook,
    singleBook,
    allBook,
    updateBook,
    deleteBook
};
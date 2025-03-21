const bookModel = require("../models/bookModel");
const { successResponse, errorResponse } = require("../utility/response");


// book upload

const uploadBook = async (req,res)=>{
    try {
        let reqBody = req.body;
        let data = await bookModel.create(reqBody);
        return successResponse(res,201,"Book data upload successfully",data);
    } catch (error) {
        return errorResponse(res,500,"Something went wrong",error)
    }
};


const singleBook =  async (req,res)=>{
    try {
        let id = req.params.id;
        const filter = {
            _id : id
        };
        let data = await bookModel.findById(filter);
        return successResponse(res,200,"Data fetch by id book successfully", data);
    } catch (error) {
        return errorResponse(res,500,"Something went wrong",error);
    }
}




module.exports = {
    uploadBook,
    singleBook
};
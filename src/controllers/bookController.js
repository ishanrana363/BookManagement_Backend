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





module.exports = {
    uploadBook
}
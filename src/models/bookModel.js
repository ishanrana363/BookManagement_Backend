const mongoose = require("mongoose");


const {Schema,model} = mongoose;


const bookSchema = new Schema({
    title : {
        type : String
    },
    author : {
        type : String
    },
    publishedYear : {
        type : String
    },
    genre : {
        type : String
    },
    price : {
        type : String
    },
    description : {
        type : String
    },
    imageUrl : {
        type : String
    },
    bookUrl : {
        type : String
    }
},{timestamps:true,versionKey:false});


const bookModel = model("books",bookSchema);



module.exports = bookModel;
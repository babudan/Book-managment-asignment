const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId

const bookSchema = new mongoose.Schema({
           
    title : {
        type : String,
        required : true,
        unique : true
    },
    author : {
        type : String,
        required : true,
        unique : true
    },
    description : {
        type : String,
        requireD : true
    },
    publishedDate : {
        type : Date,
        required : true
    } ,
    isDeleted : {
        type : Boolean,
          default : false 
    }
}, { timestamps: true })


module.exports = mongoose.model("book", bookSchema);

const mongoose = require('mongoose')

const BookModel = require('../models/bookModel');

const {isValid ,isEmpty ,isValidName ,isValidBookTitle ,isvalidDate} = require("../validation/validator");


//========================================== creating Books=========================================================================

const createBook = async function (req, res) {
    try {
        let data = req.body;
       
        let {title ,author ,description ,publishedDate } = data;

          if(!isEmpty(data)) return res.status(400).send({status : false ,message : "plss put some data in body"});

          if(!isValid(title) || !isValidBookTitle(title)) return res.status(400).send({status : false ,message : "plss put any titile or put a valid book titile with alphabets or any other character "});

          let uniquetitle = await BookModel.findOne({title});

          if(uniquetitle) return res.status(400).send({status : false ,message : "title is already present"})

          if(!isValid(author) || !isValidName(author)) return res.status(400).send({status : false ,message : "plss put any authorname or put a valid author name and spaces are not allowed and it contains more than 2 character"});
          
          let uniqueauthor = await BookModel.findOne({author});

          if(uniqueauthor) return res.status(400).send({status : false ,message:"author is already present"})
          if(!isValid(description)) return res.status(400).send({status : false ,message : "plss put any description"})

          if(!isValid(publishedDate) || !isvalidDate(publishedDate)) return res.status(400).send({status : false ,message : "plss put any publishedDate or enter the valid date in format of 'YYYY-MM-DD'"})
       
        let finalData = await BookModel.create(data)

        return res.status(201).send({ status: true, message: "created book", data: finalData })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

// //================================get-book-details==================================================================================

const getbook = async function (req, res) {
    try {

        let que = req.query
         let {titlesort ,authorsort ,publishdatesort} = que;
        // ------------------------------get books-------------------------------------------------------- 

        const pageSize = 10; // Desired page size
        const currentPage = parseInt(req.query.page) || 1;   // Get current page from query params or default to 1
        const skip = (currentPage - 1) * pageSize;

        // if(titlesort || titlesort == ''){
        //          if(titlesort == 1) {
        //             let newgetBooks = await BookModel.find({ $and: [{ isDeleted: false }, que] }).sort({title : 1}).limit(pageSize).skip(skip);
        //             if(!newgetBooks) return res.status(404).send({status : false ,message : "no data found in ascending order"})
        //             return res.status(200).send({status : true ,data : newgetBooks});
        //          }
        //          if(titlesort == -1){
        //             let newgetBooks = await BookModel.find({ $and: [{ isDeleted: false }, que] }).sort({title : -1}).limit(pageSize).skip(skip);
        //             if(!newgetBooks) return res.status(404).send({status : false ,message : "no data found in ascending order"})
        //             return res.status(200).send({status : true ,data : newgetBooks});
        //          }
        // }

//          if(authorsort || authorsort == ''){
//                  if(authorsort == 1) {
//                     let newgetBooks = await BookModel.find({ $and: [{ isDeleted: false }, que] }).sort({author : 1}).limit(pageSize).skip(skip);
//                     if(!newgetBooks) return res.status(404).send({status : false ,message : "no data found in ascending order"})
//                     return res.status(200).send({status : true ,data : newgetBooks});
//                  }
//                  if(authorsort == -1){
//                     let newgetBooks = await BookModel.find({ $and: [{ isDeleted: false }, que] }).sort({author : -1}).limit(pageSize).skip(skip);
//                     if(!newgetBooks) return res.status(404).send({status : false ,message : "no data found in ascending order"})
//                     return res.status(200).send({status : true ,data : newgetBooks});
//                  }
//         }

//         if(publishdatesort || publishdatesort == ''){
//             if(publishdatesort == 1) {
//                let newgetBooks = await BookModel.find({ $and: [{ isDeleted: false }, que] }).sort({publishedDate : 1}).limit(pageSize).skip(skip);
//                if(!newgetBooks) return res.status(404).send({status : false ,message : "no data found in ascending order"})
//                return res.status(200).send({status : true ,data : newgetBooks});
//             }
//             if(publishdatesort == -1){
//                let newgetBooks = await BookModel.find({ $and: [{ isDeleted: false }, que] }).sort({publishedDate : -1}).limit(pageSize).skip(skip);
//                if(!newgetBooks) return res.status(404).send({status : false ,message : "no data found in ascending order"})
//                return res.status(200).send({status : true ,data : newgetBooks});
//             }
//    }

        let newgetBooks = await BookModel.find({ $and: [{ isDeleted: false }, que] }).skip(skip).limit(pageSize);
        
        if(newgetBooks.isDeleted == true)   return res.status(400).send({ status: false, message: "Book is already deleted" })

        // ---------------nothing found----------------------------------------------------------
        if (!newgetBooks || newgetBooks == null || newgetBooks.length == 0 ) return res.status(404).send({ status: false, message: "no books found" })  

        return res.status(200).send({ status: true, message: "Books list", data: newgetBooks});

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

//===============================get by query-params=============================================================================

const getBookByParams = async function (req, res) {

    try {

        let bookId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(bookId)) { return res.status(400).send({ status: false, message: "bookId is not valid" }) }

        const book = await BookModel.findById(bookId)

        if (!book) return res.status(404).send({ status: false, message: "No book found from this bookId" })
        if(book.isDeleted == true) return res.status(400).send({ status: false, message: "books are already deleted" })

        return res.status(200).send({ status: true, message: 'Books list', data: book });

    } catch (err) {
        res.status(500).send({ status: false, message: err.message });
    }
}

//==========================================updated book==========================================================================

const updateBook = async function (req, res) {
    try {
        let bookId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(bookId)) { return res.status(400).send({ status: false, message: "bookId is not valid" }) }
        let data = req.body;
        let {title ,author ,description ,publishedDate} = data;
        let newbook = {};

        //--------------CHECKING BOOK IS ALREADY DELETED OR NOT-------------------------------------
        const book = await BookModel.findById(bookId);
        if(!book)  return res.status(400).send({ status: false, message: "Book is not present in the db" });

        if (book.isDeleted == true)  return res.status(400).send({ status: false, message: "Book is already deleted" });

        if(data.hasOwnProperty("title")) {
            if(!isValid(title) || !isValidBookTitle(title)) return res.status(400).send({status : false ,message : "plss put any titile or put a valid book titile with alphabets or any other character "});

            let uniquetitle = await BookModel.findOne({title});

            if(uniquetitle) return res.status(400).send({status : false ,message : "title is already present"})

            newbook.title = title;
               
        }

        if(data.hasOwnProperty("author")) {
            if(!isValid(author) || !isValidName(author)) return res.status(400).send({status : false ,message : "plss put any authorname or put a valid author name and spaces are not allowed and it contains more than 2 character"});
          
            let uniqueauthor = await BookModel.findOne({author});
  
            if(uniqueauthor) return res.status(400).send({status : false ,message:"author is already present"});

            newbook.author = author;
        }
         
        if(data.hasOwnProperty("description")) {
            if(!isValid(description)) return res.status(400).send({status : false ,message : "plss put any description"})
                newbook.description = description;
        }

        if(data.hasOwnProperty("publishedDate")) {
            if(!isValid(publishedDate) || !isvalidDate(publishedDate)) return res.status(400).send({status : false ,message : "plss put any publishedDate or enter the valid date in format of 'YYYY-MM-DD'"})
            newbook.publishedDate = publishedDate;
        }

        let updateBook = await BookModel.findOneAndUpdate({ _id: bookId, isDeleted: false },{ $set: newbook }, { new: true });

        if (!updateBook) return res.status(404).send({ status: false, message: "book is not found or its alreday deleted" })
        
        return res.status(200).send({ status: true, message: "Successfully updated", data: updateBook })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

//============================================delete book ====================================================================

const deleteBook = async function (req, res) {
    try {
        let bookId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(bookId)) { return res.status(400).send({ status: false, message: "bookId is not valid" }) }

        const book = await BookModel.findById(bookId)
        if (book.isDeleted == true)  return res.status(400).send({ status: false, message: "Book is already Deleted" })

        let deletedBook = await BookModel.findOneAndUpdate({ _id: bookId }, { $set: { isDeleted: true } }, { new: true })
        
        if (!deletedBook)  return res.status(404).send({ status: false, message: "Book is not present in the collection" })

        return res.status(200).send({ status: true, message: "Book has been Deleted", data: deletedBook })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}


module.exports = { createBook ,getbook ,getBookByParams ,updateBook ,deleteBook}

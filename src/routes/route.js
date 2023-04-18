const express = require('express');
const router = express.Router();

const {createBook ,getbook ,getBookByParams ,updateBook ,deleteBook} = require('../controllers/bookcontroller')


//----------dummy---------------------------------------------------------------------------------------------------------------------
router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})


//-----------create book---------------------------------------------------------------------------------------------------------
router.post("/books" ,createBook)

//------------get books------------------------------------------------------------------------------------------------------------
router.get("/books", getbook)

//--------get by params-------------------------------------------------------------------------------------------------------
router.get("/books/:id", getBookByParams)


//-----------------------------update----------------------------------------------------------------------------

router.put("/books/:id", updateBook)


//-------------delete books-----------------------------------------------------------------------------------------------------
router.delete("/books/:id", deleteBook)





module.exports = router

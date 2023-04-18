# Book-managment-asignment

# Book-managment-asignment

<!-- Book-managment-asignment -->

I have not applied any authentication or authorization here because in asignment there are mentioned 5 routes only so there is no routes related to users thats why i have not apllied authentication and authorization.

Books API

POST /books -----> 
-----------------------

Create a book document from request body.
here are total 4 fields are there like - title , author , description and publishedDate .
Return HTTP status 201 on a succesful book creation. Also return the book document. The response should be a JSON object like this
Return HTTP status 400 for an invalid request with a response body like this


GET /books ----> 
--------------------------

Returns all books in the collection that aren't deleted. 
Return the HTTP status 200 if any documents are found.
If no documents are found then return an HTTP status 404 with a response .
In query you can put page as key (means the page no) and it will take you to that particular page no and in each page there are 10 books present.And if you dont put any page (means the page no) then in default it will take 1.
Filter books list by applying filters. Query param can have any combination of below filters.
By title
By author
By description
By publishedDate
By subcategory example of a query url: books?filtername=filtervalue&f2=fv2


GET /books/:id ------->
--------------------------------

Take the id key (means booksid) in params and as per that it will give you that particular book in response.
If the books is already deleted then it will throw a proper message for that with 400 HTTP statuscode.
If no documents are found then return an HTTP status 404 with a response .


PUT /books/:id ------->
---------------------------------

Update a book by changing its
   title
   author
   description
   publishedDate
Make sure the unique constraints are not violated when making the update
Check if the bookId exists (must have isDeleted false and is present in collection). If it doesn't, return an HTTP status 404 with a response.
Return an HTTP status 200 if updated successfully with a response.
Also make sure in the response you return the updated book document.

DELETE /books/:id -------->
---------------------------------------

Check if the bookId exists and is not deleted. If it does, mark it deleted and return an HTTP status 200 with a response body with status and message.
If the book document doesn't exist then return an HTTP status of 404 with a respone.
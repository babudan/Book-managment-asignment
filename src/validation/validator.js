


const isValid =  (value) => {
  if (typeof value === undefined || value == null || value.length <= 2) return false;
  if (typeof value === "string" && value.trim().length === 0) return false;
  return true;
};

const isEmpty = (empty) => {
  if(Object.keys(empty).length == 0) return false;
  return true;
}


const isValidName = function (string) {
  let regex = /^[a-zA-Z\\s]{2,50}$/;
  if (regex.test(string)) {
      return true;
  }
  return false;
};

const isValidBookTitle = function (title) {
  return /^[A-Za-z ,.'-]{1,45}/i.test(title);
};


const isvalidDate = function (date) {
   let regex = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/;

   if(regex.test(date)) {
    return true;
   }
   return false;
}


module.exports = {isValid ,isEmpty ,isValidName ,isValidBookTitle ,isvalidDate} ;
require("dotenv").config();

let PORT = process.env.PORT;
//let PORT = 3003;

//let MONGODB_URI = process.env.MONGODB_URI;
let MONGODB_URI = process.env.NODE_ENV === "test"
? process.env.TEST_MONGODB_URI
: process.env.MONGODB_URI

/*
if (process.argv.length < 3) {
  //siirrä tämä (7-12) ja ota edellinen lause käyttöön!
  console.log("give password as argument");
  process.exit(1);
}
const password = process.argv[2];
let MONGODB_URI = `mongodb+srv://slehti:${password}@cluster0.dahto.mongodb.net/bloglist?retryWrites=true&w=majority`;
*/
module.exports = {
  MONGODB_URI,
  PORT,
};

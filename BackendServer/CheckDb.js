const mongoose = require('mongoose');
require("dotenv").config({ path: "E:/ToDoApp/.env" });
const mongoURI = process.env.DATABASE_URL;
console.log(mongoURI);
const connectToMongo = async () => {
    try {
  await mongoose.connect(mongoURI, {
    useNewURLParser:true,
     useUnifiedTopology: true,
  });
   
  console.log("your database is connected successfully😊")
}
catch (error){
    console.log("failed to connect to mongodb",error)
}
}

module.exports = connectToMongo;

 require("dotenv").config({ path: "E:/ToDoApp/.env" }); // Load environment variables from .env file

 const connectToMongo = require("./CheckDb");
 const bodyParser = require("body-parser");
 const express = require("express");
 const app = express();

 connectToMongo();

 console.log(process.env.DB_HOST);

 const port = process.env.PORT || 3000;

 app.use(bodyParser.json());

 const work = require("./Router/ToDoItemsPost");
 const delwork = require("./Router/ToDoItemsdelete");
 const getData = require("./Router/ToDoGetData");

 app.use("/api/items", work);
 app.use("/api/items", delwork);
 app.use("/api/items", getData);

 app.listen(port, () => {
   console.log(`iNotebook Backend listening on port ${port}`);
 });

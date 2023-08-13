const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();

const DB = process.env.DATABASE;

mongoose.connect(DB).then(console.log("DB Connected Successfully"));

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server Is Running On ${port}`);
});

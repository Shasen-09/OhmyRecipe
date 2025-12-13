const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const path = require("path");


dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

const PORT = process.env.PORT || 5000;

app.use('/', require('./routes/startRoute'));
app.use('/user', require('./routes/userRoutes'))
app.use('/api/recipes', require('./routes/recipeRoute'))
app.use('/api', require('./routes/groqRoutes'))
app.use('/api/bookmark', require('./routes/bookmarkRoutes'))
app.use("/payment", require('./routes/paymentRoutes'));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/dist/index.html"));
  });
}


app.listen(PORT, () => {
  console.log(`Server is running on ${process.env.DEV_MODE} on PORT: ${PORT}`.bgWhite)
})



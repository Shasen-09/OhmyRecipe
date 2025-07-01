const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");


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


app.listen(PORT, () => {
  console.log(`Server is running on ${process.env.DEV_MODE} on PORT: ${PORT}`.bgWhite)
})



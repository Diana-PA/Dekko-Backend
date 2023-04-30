const express = require("express");
const userRouter = require("./routes/userRoutes");
const productRouter = require('./routes/productRoutes')
const orderRouter = require("./routes/orderRoutes");
const cors = require("cors")

require('dotenv').config();
require('./config/database');

const app = express();
app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(productRouter);
app.use(orderRouter);
app.listen(process.env.PORT, () => console.log(`Servidor conectado en puerto: ${process.env.PORT}`))
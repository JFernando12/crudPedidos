import express from "express";
import morgan from "morgan";
import cors from "cors";
import clientsRoute from "./routes/clients";
import productsRoute from "./routes/products";
import ordersRoute from "./routes/orders";
const multer = require("multer");
const path = require("path");

require("dotenv").config();

const app = express();

app.set("port", process.env.PORT || 8000);

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const storage = multer.diskStorage({
    destination: path.resolve(__dirname, "public/uploads")
    ,
    filename: function (req, file, cb) {
        const uniqeSuffix = new Date().getTime();
        cb(null, uniqeSuffix + path.extname(file.originalname));
    }
});

app.use(multer({storage: storage}).single("image"));

//Routes
app.use("/api/clients", clientsRoute);
app.use("/api/products", productsRoute);
app.use("/api/orders", ordersRoute);

export default app;
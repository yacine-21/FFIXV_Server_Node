// DEPENDENCIES
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
const express             = require("express");
const app                 = express();
const helmet              = require("helmet")
const bodyParser          = require("body-parser");
const cors                = require('cors');
const morgan              = require("morgan");
const PORT                = process.env.PORT || 1234;

app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// IMPORT MIDDLEWARES

const RoutesGet = require("./Routes/GET/RoutesGet")
const errorHandler = require("./MIDDLEWARES/errorHandler");
const notFound = require("./MIDDLEWARES/errorHandler");



// ROUTES GET

app.use("/", RoutesGet)

app.get(notFound);
app.get(errorHandler);



//PORT
app.listen(PORT, () =>
  console.log("Server Started at http://" + process.env.URL + ":" + PORT)
);
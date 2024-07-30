import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";

/* ----------------------------- CONFIGURATIONS ----------------------------- */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* --------------------------------- ROUTES --------------------------------- */


/* --------------------------------- SERVER --------------------------------- */
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server listening on port ${port} 🚀`);})

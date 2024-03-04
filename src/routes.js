import Express from "express";
import { consult } from "./controllers/QueryServices.js";

const app = Express();
app.use(Express.json());


app.post('/', consult);

export default app
import express from "express"
import router from "./src/routes"
import cors from 'cors';
let app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ 
  credentials : true, 
  origin : "*"
}));
app.use(router);

export default app;

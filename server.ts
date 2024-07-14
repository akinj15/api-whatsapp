import App from "./app"
import { connect } from "./src/database";

const port = process.env.PORT || 4000;

const app = App   
connect()
app.listen(port, () => console.log("running at port: ", port));



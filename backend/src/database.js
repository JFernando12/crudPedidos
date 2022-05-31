import { config } from "./config";
import mysql from "mysql2/promise";

const connect =async() => {
    return await mysql.createConnection(config);
}

export default connect;
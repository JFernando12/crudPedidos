import connect from "../database";

export const showOrders = async(req, res) => {
    const connection = await connect();
    const [orders] = await connection.query("SELECT * FROM orders");
    res.json(orders);
}
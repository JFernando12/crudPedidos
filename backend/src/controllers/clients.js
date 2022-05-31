import connect from "../database";

export const showClients = async(req, res) => {
    const connection = await connect();
    const [row] = await connection.query("SELECT * FROM clients")
    res.json(row);
}

export const selectClient = async(req, res) => {
    const client_id = req.params.client_id;
    const connection = await connect();
    const [row] = await connection.query("SELECT * FROM clients WHERE client_id=?", [client_id]);
    res.json(row[0]);
}

export const addClient = async(req, res) => {
    const client = req.body;
    const connection = await connect();
    await connection.query(`INSERT INTO clients SET ?`, [client]);
    res.send("Listo");
}

export const deleteClient = async(req, res) => {
    const client_id = req.params.client_id;
    const connection = await connect();
    await connection.query(`DELETE FROM clients WHERE client_id=?`, [client_id]);
    res.send("Listo")
}

export const updateClient = async(req, res) => {
    const client_id = req.params.client_id;
    const newClient = req.body;
    
    const connection = await connect();
    await connection.query("UPDATE clients SET ? WHERE client_id=?", [newClient, client_id]);
    res.send("Listo")
}
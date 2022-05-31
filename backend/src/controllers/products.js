import connect from "../database";
const cloudinary = require("cloudinary").v2;
const fs = require("fs-extra");

cloudinary.config({ 
    cloud_name: 'dnjmxt14w', 
    api_key: '826188237694693', 
    api_secret: 'e368YQ9TPXCi8Ngpt3yDwvg-oqA' 
  });

export const showProducts = async(req, res) => {
    const connection = await connect();
    const [rows] = await connection.query("SELECT * FROM products");
    res.json(rows)
}

export const saveProduct = async(req, res) => {
    const image = await cloudinary.uploader.upload(req.file.path);
    await fs.remove(req.file.path);
    const product = {
        product_name: req.body.product_name,
        price: req.body.price,
        product_image: image.url, 
        public_id: image.public_id
    }
    const connection = await connect();
    const [ row ] = await connection.query("INSERT INTO products SET ?", [product]);

    res.status(201).json({
        message: "Saved",
        id: row.insertId
    })
}

export const deleteProduct = async(req, res) => {
    const connection = await connect();
    await connection.query("DELETE FROM products WHERE product_id=?", [req.params.product_id]);
    res.status(200).json({
        message: "Eliminado correctamente"
    })
}

export const updateProduct = async(req, res) => {
    const connection = await connect();

    const product_id = req.params.product_id;
    const [row] = await connection.query("SELECT public_id FROM products WHERE product_id=?", [product_id]);
    const public_id = row[0].public_id;
    await cloudinary.uploader.destroy(public_id);

    const image = await cloudinary.uploader.upload(req.file.path);
    
    const newProduct = {
        product_name: req.body.product_name,
        price: req.body.price,
        product_image: image.url,
        public_id: image.public_id
    }
    connection.query("UPDATE products SET ? WHERE product_id=?", [newProduct, product_id]);

    res.status(200).json({
        message: "Updated",
        id: product_id
    });
}

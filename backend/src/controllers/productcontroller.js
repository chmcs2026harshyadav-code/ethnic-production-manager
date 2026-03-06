import Product from "../models/productmodel.js";

// Get all product details
export async function getAllProductDetails(_, res) {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        console.error("Error in getting all product details controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// Get product by ID
export async function getProductByID(req, res) {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.status(200).json(product);
    } catch (error) {
        console.error("Error in get product by ID controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// Create product
export async function createProduct(req, res) {
    try {
        const { customer_id, cust_name, cust_phone_no, order_type, no_of_piece, cost, material, color, address } = req.body;
        if (!customer_id || !cust_name || !cust_phone_no || !order_type || !no_of_piece || !cost || !material || !color || !address) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const product = new Product({ customer_id, cust_name, cust_phone_no, order_type, no_of_piece, cost, material, color, address });
        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        console.error("Error in create product controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// Update product
export async function updateProductDetails(req, res) {
    try {
        const { customer_id, cust_name, cust_phone_no, order_type, no_of_piece, cost, material, color, address } = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { customer_id, cust_name, cust_phone_no, order_type, no_of_piece, cost, material, color, address },
            { new: true }
        );
        if (!updatedProduct) return res.status(404).json({ message: "Product not found" });
        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error("Error in updating product controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// Delete product
export async function deleteProduct(req, res) {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) return res.status(404).json({ message: "Product not found" });
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error("Error in delete product controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// Search by customer_id
export async function searchByCustomerID(req, res) {
    try {
        const customerId = req.params.customer_id;

        const product = await Product.findOne({
            customer_id: { $regex: `^${customerId}$`, $options: "i" }
        });

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(product);
    } catch (error) {
        console.error("Error in search product by customer_id controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// Sort by no_of_piece
export async function sortByNoOfPiece(req, res) {
    try {
        const products = await Product.find().sort({ no_of_piece: 1 }); // ascending
        res.status(200).json(products);
    } catch (error) {
        console.error("Error in sort by no_of_piece controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// Filter by order_type
export async function filterByOrderType(req, res) {
    try {
        const orderType = req.query.type;

        const products = await Product.find({
            order_type: { $regex: orderType, $options: "i" }
        });

        res.status(200).json(products);
    } catch (error) {
        console.error("Error in filter by order_type controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
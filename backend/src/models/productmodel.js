import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    customer_id: {
        type: String,
        required: true,
        unique: true,
    },
    cust_name: {
        type: String,
        required: true,
    },
    cust_phone_no: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 15,
    },
    order_type: {
        type: String,
        required: true,
    },
    no_of_piece: {
        type: Number,
        required: true,
        min: 1,
    },
    cost: {
        type: Number,
        required: true,
        min: 0,
    },
    material: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    }
    
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);
export default Product;
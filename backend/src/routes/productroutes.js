import express from "express";
import {
    createProduct,
    deleteProduct,
    filterByOrderType,
    getAllProductDetails,
    getProductByID,
    searchByCustomerID,
    sortByNoOfPiece,
    updateProductDetails
} from "../controllers/productcontroller.js";

const router = express.Router();

router.get("/", getAllProductDetails);
router.get("/:id", getProductByID);
router.post("/", createProduct);
router.put("/:id", updateProductDetails);
router.delete("/:id", deleteProduct);

router.get("/search/custid/:customer_id", searchByCustomerID);
router.get("/sort/noofpiece", sortByNoOfPiece);
router.get("/filter/order", filterByOrderType);

export default router;
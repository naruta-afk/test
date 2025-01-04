import Product from '../models/product.model.js';




export const getProduct  =async (req, res) => {
    try {
        const products = await Product.find({});    
        res.status(200).json({success: true, data: products});  
    } catch (error) {
        console.error("Error fetching products:", error.message);
        res.status(500).json({success: false, message: error.message}); 

    }
}



export const createProduct = async (req, res) => {
    const product = req.body;
    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({success: false, message: "All fields are required"});
    }
    const newProduct = new Product(product);
    try {
        await newProduct.save();
        res.status(201).json({success: true, data: newProduct});
    } catch (error) {
        console.error("Error saving product:", error.message);
        res.status(500).json({success: false, message: error.message});


    }
}



export const deleteProduct = async (req, res) => {
    const {id}= req.params;
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "Product deleted successfully"});
    } catch (error) {
        console.error("Error deleting product:", error.message);
        res.status(500).json({success: false, message: error.message});
    }
}


export const updateProduct =  async (req, res) => {
    const {id} = req.params;
    const product = req.body;
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true});
        res.status(200).json({success: true, data: updatedProduct});
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).send('No product with that id');
        }


    } catch (error) {
        console.error("Error updating product:", error.message);
        res.status(500).json({success: false, message: error.message});
    }
}
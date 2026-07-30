import { createProductService, getProductsService, getProductByIdService, updateProductService, deleteProductService } from "../services/productService.js";



export const createProductController = async(req,res)=>{
    try{
        const product = await createProductService(req.body, req.file);    
        res.status(201).json({
        success:true,
        message:"Product created successfully",
        product
        });
    }catch(error){
        const statusCode = error.message === "Product image is required." ? 400 : 500;

        res.status(statusCode).json({
        success:false,
        message:error.message
        });
    }

};

export const getProductsController = async(req,res)=>{
    try{
        const products = await getProductsService();
                
        res.status(200).json({
        success:true,
        products
        });
    }catch(error){
        res.status(500).json({
        success:false,
        message:error.message
        });
    }
};

export const getProductController = async(req,res)=>{
    try{
        const product = await getProductByIdService(req.params.id);


        res.status(200).json({
        success:true,
        product
        });
    }catch(error){
        res.status(500).json({
        success:false,
        message:error.message
        });
    }
};

export const updateProductController = async(req,res)=>{
    try{
        const product = await updateProductService( 
            req.params.id, 
            req.body, 
            req.file 
        );

        res.status(200).json({
        success:true,
        message: "Product updated successfully...",
        product
        });
    }catch(error){
        res.status(500).json({
        success:false,
        message:error.message
        });
    }
};

export const deleteProductController = async (req, res) => {
  try {
    await deleteProductService(req.params.id);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(
      error.message === "Product not found" ? 404 : 500
    ).json({
      success: false,
      message: error.message,
    });
  }
};
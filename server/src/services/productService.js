import Product from "../models/Product.js";
import streamifier from "streamifier";
import cloudinary from "../config/cloudinary.js";


const uploadImage = (file) => {
  if (!file) {
    throw new Error("Product image is required.");
  }

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "bakery-products",
        resource_type: "image",
        quality: "auto",
        fetch_format: "auto",
        use_filename: true,
        unique_filename: true,
        overwrite: false,
        transformation: [ { width: 1200, crop: "limit", }, ],
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }

        resolve(result);
      }
    );
    streamifier.createReadStream(file.buffer).pipe(stream);
  });
};


const deleteImage = async (publicId) => {
  if (!publicId) return;

  await cloudinary.uploader.destroy(publicId);
};



export const createProductService = async (data, file) => {
  const uploadResult = await uploadImage(file);

  try {
    return await Product.create({
      ...data,
      image: uploadResult.secure_url,
      imagePublicId: uploadResult.public_id,
    });
  } catch (error) {
    await cloudinary.uploader.destroy(uploadResult.public_id);
    throw error;
  }
};


export const getProductsService = async()=>{

  return await Product.find();

};


export const getProductByIdService = async(id)=>{
  return await Product.findById(id);
};


export const updateProductService = async( id, data, file )=>{
  const product = await Product.findById(id);
  if(!product){
    throw new Error("Product not found");
  }

  if(file){
    await deleteImage(
      product.imagePublicId
    );
    const uploadResult = await uploadImage(file);
    data.image = uploadResult.secure_url;
    data.imagePublicId = uploadResult.public_id;
  }

  return await Product.findByIdAndUpdate(id,data, { new:true } );
};

export const deleteProductService = async (id) => {
  const product = await Product.findById(id);
  if (!product) {
    throw new Error("Product not found");
  }

  await deleteImage(product.imagePublicId);
  await Product.findByIdAndDelete(id);

};
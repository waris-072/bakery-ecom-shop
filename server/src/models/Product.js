import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name:{
      type:String,
      required:true,
      trim:true
    },

    description:{
      type:String,
      required:true
    },

    price:{
      type:Number,
      required:true
    },

    category:{
      type:String,
      required:true
    },

    stock:{
      type:Number,
      required:true,
      default:0
    },

    image: {
      type: String,
      required: true,
    },

    imagePublicId: {
      type: String,
      required: true,
    },

    status:{
      type:String,
      enum:[ "available", "out-of-stock", "hidden" ],
      default:"available"
    }
  },
  {
    timestamps:true
  }
);


export default mongoose.model( "Product", productSchema );
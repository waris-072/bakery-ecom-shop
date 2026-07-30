import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ProductForm from "../../components/admin/ProductForm";
import { getProduct, updateProduct, } from "../../services/productService";


function EditProduct(){
    const { id } = useParams();
    const navigate = useNavigate();
    const [product,setProduct] = useState(null);
    const [loading,setLoading] = useState(false);

    const fetchProduct = async()=>{
        try{
            const data = await getProduct(id);
            setProduct(data.product);
        }
        catch(error){
            console.error(error);
        }
    };


    useEffect(()=>{
        fetchProduct();
    },[id]);

    const handleUpdate = async(formData)=>{
        try{
            setLoading(true);
            await updateProduct( id, formData );
            navigate("/admin/products");
        }
        catch(error){
            console.error(error);
            alert(error.response?.data?.message || "Failed to update product");
        }
        finally{
            setLoading(false);
        }
    };

    if(!product){
        return <p>Loading product...</p>;
    }

    return(
        <ProductForm
            mode="edit"
            product={product}
            loading={loading}
            onSubmit={handleUpdate}
        />
    );
}

export default EditProduct;
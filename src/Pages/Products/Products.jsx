import React, {useEffect, useState} from 'react'
import AddNewProduct from "../../Components/AddNewProduct/AddNewProduct";
import ProductsTable from "../../Components/ProductsTable/ProductsTable";

export default function Products() {

    const [allProducts, setAllProducts] = useState([])

    const getAllProducts = () => {
        fetch("http://localhost:8000/api/products/")
            .then(res => res.json())
            .then((product) =>
                setAllProducts(product)
            )
    }

    useEffect(() => {
        getAllProducts()
    }, []);

    return (
        <>

            <AddNewProduct getAllProducts={getAllProducts}/>
            <ProductsTable allProducts={allProducts} getAllProducts={getAllProducts}/>

        </>
    )
}

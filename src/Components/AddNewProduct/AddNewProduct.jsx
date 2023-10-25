import React, {useState} from 'react'
import './AddNewProduct.css'

import {MdDriveFileRenameOutline} from "react-icons/md";
import {AiOutlineDollarCircle} from "react-icons/ai";
import {BiShoppingBag} from "react-icons/bi";
import {HiPhoto} from "react-icons/hi2";
import {BiLike} from "react-icons/bi";
import {MdOutlineSell} from "react-icons/md";
import {BiColorFill} from "react-icons/bi";

export default function AddNewProduct({getAllProducts}) {

    const [allProducts, setAllProducts] = useState([])

    const [productNewTitle, setProductNewTitle] = useState("");
    const [productNewPrice, setProductNewPrice] = useState("");
    const [productNewCount, setProductNewCount] = useState("");
    const [productNewImg, setProductNewImg] = useState("");
    const [productNewPopularity, setProductNewPopularity] = useState("");
    const [productNewSale, setProductNewSale] = useState("");
    const [productNewColors, setProductNewColors] = useState("");

    const addNewProduct = (event) => {

        event.preventDefault()

        const title = productNewTitle.trim()
        const price = productNewPrice.trim()
        const count = productNewCount.trim()
        const img = productNewImg.trim()
        const popularity = productNewPopularity.trim()
        const sale = productNewSale.trim()
        const colors = productNewColors.trim()

        if (title && price && count && img && popularity && sale && colors) {

            fetch(`http://localhost:8000/api/products/`, {
                method: "POST",
                body: JSON.stringify({
                    title, price, count, img, popularity, sale, colors,
                }),
                headers: {
                    "Content-type": "application/json",
                },
            })
                .then(response => response.json())
                .then(data => {
                    setAllProducts([...allProducts, data])
                    emptyInput()
                    getAllProducts()
                })
        }
    }

    function emptyInput() {
        setProductNewTitle("")
        setProductNewPrice("")
        setProductNewCount("")
        setProductNewImg("")
        setProductNewPopularity("")
        setProductNewSale("")
        setProductNewColors("")
    }

    return (
        <div className="products-main">

            <p className="products-title">
                Add new product
            </p>

            <form className="add-products-form">

                <div className="add-products-form-wrap">

                    <div className="add-products-form-group">
                        <MdDriveFileRenameOutline className="input-icon"/>
                        <input type="text"
                               placeholder="Write the name of the product"
                               value={productNewTitle}
                               onChange={event =>
                                   setProductNewTitle(event.target.value)
                               }/>
                    </div>

                    <div className="add-products-form-group">
                        <AiOutlineDollarCircle className="input-icon"/>
                        <input type="text"
                               placeholder="Write the price of the product"
                               value={productNewPrice}
                               onChange={event =>
                                   setProductNewPrice(event.target.value)
                               }/>
                    </div>

                    <div className="add-products-form-group">
                        <BiShoppingBag className="input-icon"/>
                        <input type="text"
                               placeholder="Write the inventory of the product"
                               value={productNewCount}
                               onChange={event =>
                                   setProductNewCount(event.target.value)
                               }/>
                    </div>

                    <div className="add-products-form-group">
                        <HiPhoto className="input-icon"/>
                        <input type="text"
                               placeholder="Write the address of the product photo"
                               value={productNewImg}
                               onChange={event =>
                                   setProductNewImg(event.target.value)
                               }/>
                    </div>

                    <div className="add-products-form-group">
                        <BiLike className="input-icon"/>
                        <input type="text"
                               placeholder="Write the popularity of the product"
                               value={productNewPopularity}
                               onChange={event =>
                                   setProductNewPopularity(event.target.value)
                               }/>
                    </div>

                    <div className="add-products-form-group">
                        <MdOutlineSell className="input-icon"/>
                        <input type="text"
                               placeholder="Write the sales amount of the product"
                               value={productNewSale}
                               onChange={event =>
                                   setProductNewSale(event.target.value)
                               }/>
                    </div>

                    <div className="add-products-form-group">
                        <BiColorFill className="input-icon"/>
                        <input type="text"
                               placeholder="Write the number of color of the product"
                               value={productNewColors}
                               onChange={event =>
                                   setProductNewColors(event.target.value)
                               }/>
                    </div>

                </div>

                <button className="add-products-submit" onClick={addNewProduct}>Product registration</button>

            </form>

        </div>
    )
}

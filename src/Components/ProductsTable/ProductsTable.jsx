import React, {useState} from 'react'
import './ProductsTable.css'
import DeleteModal from "../DeleteModal/DeleteModal";
import DetailsModal from "../DetailsModal/DetailsModal";
import EditModal from "../EditModal/EditModal";
import ErrorBox from "../../Components/ErrorBox/ErrorBox";

import {MdDriveFileRenameOutline} from "react-icons/md";
import {AiOutlineDollarCircle} from "react-icons/ai";
import {BiShoppingBag} from "react-icons/bi";
import {HiPhoto} from "react-icons/hi2";
import {BiLike} from "react-icons/bi";
import {MdOutlineSell} from "react-icons/md";
import {BiColorFill} from "react-icons/bi";
import {IoClose} from "react-icons/io5";

export default function ProductsTable({allProducts, getAllProducts}) {

    const [isShowDeleteModal, setIsShowDeleteModal] = useState(false)
    const [isShowDetailsModal, setIsShowDetailsModal] = useState(false)
    const [isShowEditModal, setIsShowEditModal] = useState(false)
    const [productID, setProductID] = useState(null)
    const [mainProductInfos, setMainProductInfos] = useState({})

    const [productNewTitle, setProductNewTitle] = useState("");
    const [productNewPrice, setProductNewPrice] = useState("");
    const [productNewCount, setProductNewCount] = useState("");
    const [productNewImg, setProductNewImg] = useState("");
    const [productNewPopularity, setProductNewPopularity] = useState("");
    const [productNewSale, setProductNewSale] = useState("");
    const [productNewColors, setProductNewColors] = useState("");



    const deleteModalCancelAction = () => {
        setIsShowDeleteModal(false)
    }

    const deleteModalSubmitAction = () => {

        fetch(`http://localhost:8000/api/products/${productID}`, {
            method: "DELETE",
        })
            .then(res => res.json())
            .then((result) => {
                console.log(result)
                setIsShowDeleteModal(false)
                getAllProducts()
            })
    }

    const closeDetailsModal = () => {
        setIsShowDetailsModal(false)
    }

    const submitEditModal = (event) => {
        event.preventDefault()

        const productsNewInfos = {
            title: productNewTitle,
            price: productNewPrice,
            count: productNewCount,
            img: productNewImg,
            popularity: productNewPopularity,
            sale: productNewSale,
            colors: productNewColors,
        }

        fetch(`http://localhost:8000/api/products/${productID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productsNewInfos)
        })
            .then(res => res.json())
            .then(result => {
                console.log(result)
                getAllProducts()
                setIsShowEditModal(false)
            })
    }

    const closeEditModal = () => {
        setIsShowEditModal(false)
    }

    const separate = (Number) => {
        {
            Number += '';
            Number = Number.replace(',', '');
            let x = Number.split('.');
            let y = x[0];
            let z = x.length > 1 ? '.' + x[1] : '';
            let rgx = /(\d+)(\d{3})/;
            while (rgx.test(y))
                y = y.replace(rgx, '$1' + ',' + '$2');
            return y + z;
        }
    }

    return (
        <>

            {
                allProducts.length ? (
                    <table className="products-table">

                        <thead>
                        <tr className="products-table-heading-tr">
                            <th className="products-table-heading-th">Photo</th>
                            <th className="products-table-heading-th">Name</th>
                            <th className="products-table-heading-th">Price</th>
                            <th className="products-table-heading-th">Inventory</th>
                        </tr>
                        </thead>

                        <tbody>
                        {
                            allProducts.map((product) => (
                                <tr className="products-table-tr" key={product.id}>
                                    <td className="products-table-td">
                                        <img src={product.img} alt={product.title} className="products-table-img"/>
                                    </td>
                                    <td className="products-table-td">
                                        {product.title}
                                    </td>
                                    <td className="products-table-td">
                                        {separate(product.price)} $
                                    </td>
                                    <td className="products-table-td">
                                        {product.count}
                                    </td>
                                    <td className="products-table-td">

                                        <button className="products-table-btn" onClick={() => {
                                            setIsShowDetailsModal(true)
                                            setMainProductInfos(product)
                                        }}>
                                            details
                                        </button>

                                        <button className="products-table-btn" onClick={() => {
                                            setIsShowDeleteModal(true)
                                            setProductID(product.id)
                                        }}>
                                            delete
                                        </button>

                                        <button className="products-table-btn" onClick={() => {

                                            setIsShowEditModal(true)
                                            setProductID(product.id)

                                            setProductNewTitle(product.title)
                                            setProductNewPrice(separate(product.price))
                                            setProductNewCount(product.count)
                                            setProductNewImg(product.img)
                                            setProductNewPopularity(product.popularity)
                                            setProductNewSale(separate(product.sale))
                                            setProductNewColors(product.colors)

                                        }}>
                                            edit
                                        </button>

                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>

                    </table>

                ) : (
                    <ErrorBox msg="No products found"/>
                )
            }

            {isShowDeleteModal &&
                <DeleteModal
                    submitAction={deleteModalSubmitAction}
                    cancelAction={deleteModalCancelAction}/>
            }

            {isShowDetailsModal &&
                <DetailsModal onHide={closeDetailsModal}>

                    {/*  Children of DetailsModal  */}

                    <div className="details-modal-close">
                        <IoClose onClick={closeDetailsModal} className="details-modal-close-btn"/>
                    </div>

                    <table className="cms-table">
                        <thead>
                        <tr>
                            <th>Popularity</th>
                            <th>Sale</th>
                            <th>Colors</th>
                        </tr>
                        </thead>

                        <tbody>
                        <tr>
                            <td>{mainProductInfos.popularity}</td>
                            <td>{separate(mainProductInfos.sale)} $</td>
                            <td>{mainProductInfos.colors}%</td>
                        </tr>
                        </tbody>

                    </table>
                </DetailsModal>}

            {isShowEditModal &&
                <EditModal
                    className="edit-products-form-column"
                    onSubmit={submitEditModal}
                    onClose={closeEditModal}
                >

                    {/*  Children of EditModal  */}

                    <div className="edit-products-form-group">
                        <MdDriveFileRenameOutline className="input-icon"/>
                        <input type="text"
                               placeholder="Enter the new name of the product"
                               value={productNewTitle}
                               onChange={(event) => setProductNewTitle(event.target.value)}
                        />
                    </div>

                    <div className="edit-products-form-group">
                        <AiOutlineDollarCircle className="input-icon"/>
                        <input type="text"
                               placeholder="Enter the new price of the product"
                               value={productNewPrice}
                               onChange={(event) => setProductNewPrice(event.target.value)}
                        />
                    </div>

                    <div className="edit-products-form-group">
                        <BiShoppingBag className="input-icon"/>
                        <input type="text"
                               placeholder="Enter the new inventory of the product"
                               value={productNewCount}
                               onChange={(event) => setProductNewCount(event.target.value)}
                        />
                    </div>

                    <div className="edit-products-form-group">
                        <HiPhoto className="input-icon"/>
                        <input type="text"
                               placeholder="Enter the new address of the product photo"
                               value={productNewImg}
                               onChange={(event) => setProductNewImg(event.target.value)}
                        />
                    </div>

                    <div className="edit-products-form-group">
                        <BiLike className="input-icon"/>
                        <input type="text"
                               placeholder="Enter the new popularity of the product"
                               value={productNewPopularity}
                               onChange={(event) => setProductNewPopularity(event.target.value)}
                        />
                    </div>

                    <div className="edit-products-form-group">
                        <MdOutlineSell className="input-icon"/>
                        <input type="text"
                               placeholder="Enter the new sales amount of the product"
                               value={productNewSale}
                               onChange={(event) => setProductNewSale(event.target.value)}
                        />
                    </div>

                    <div className="edit-products-form-group">
                        <BiColorFill className="input-icon"/>
                        <input type="text"
                               placeholder="Enter the new number of color of the product"
                               value={productNewColors}
                               onChange={(event) => setProductNewColors(event.target.value)}
                        />
                    </div>

                </EditModal>
            }

        </>
    )
}

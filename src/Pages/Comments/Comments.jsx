import React, {useEffect, useState} from 'react'
import './Comments.css'
import {IoClose} from "react-icons/io5";
import ErrorBox from "../../Components/ErrorBox/ErrorBox";
import DetailsModal from "../../Components/DetailsModal/DetailsModal";
import DeleteModal from "../../Components/DeleteModal/DeleteModal"
import EditModal from "../../Components/EditModal/EditModal";
import {MdDriveFileRenameOutline} from "react-icons/md";

export default function Comments() {

    const [allComments, setAllComments] = useState([])
    const [isShowDetailsModal, setIsShowDetailsModal] = useState(false)
    const [isShowDeleteModal, setIsShowDeleteModal] = useState(false)
    const [isShowEditModal, setIsShowEditModal] = useState(false)
    const [mainProductInfos, setMainProductInfos] = useState("")
    const [commentID, setCommentID] = useState(null)

    const [commentEditText, setCommentEditText] = useState("");

    const getAllComments = () => {
        fetch('http://localhost:8000/api/comments')
            .then(res => res.json())
            .then(comments => setAllComments(comments))
    }

    useEffect(() => {
        getAllComments()
    }, [])

    const closeDetailsModal = () => {
        setIsShowDetailsModal(false)
    }

    const deleteModalCancelAction = () => {
        setIsShowDeleteModal(false)
    }

    const deleteModalSubmitAction = () => {

        fetch(`http://localhost:8000/api/comments/${commentID}`, {
            method: "DELETE",
        })
            .then(res => res.json())
            .then((result) => {
                console.log(result)
                setIsShowDeleteModal(false)
                getAllComments()
            })
    }

    const submitEditModal = (event) => {
        event.preventDefault()

        const commentEditInfos = {
            body: commentEditText,
        }

        fetch(`http://localhost:8000/api/comments/${commentID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(commentEditInfos)
        })
            .then(res => res.json())
            .then(result => {
                console.log(result)
                getAllComments()
                setIsShowEditModal(false)
            })
    }

    const closeEditModal = () => {
        setIsShowEditModal(false)
    }

    return (
        <div className="cms-main">

            {
                allComments.length ? (
                    <table className="cms-table">

                        <thead>
                        <tr>
                            <th>User Name</th>
                            <th>Product</th>
                            <th>Comment</th>
                            <th>Date</th>
                            <th>Time</th>
                        </tr>
                        </thead>

                        <tbody>
                        {
                            allComments.map(comment => (
                                <tr key={comment.id}>
                                    <th>{comment.userID}</th>
                                    <th>{comment.productID}</th>
                                    <th>
                                        <button className="text-modal-btn" onClick={() => {
                                            setIsShowDetailsModal(true)
                                            setMainProductInfos(comment)
                                        }}>
                                            View text
                                        </button>
                                    </th>
                                    <th>{comment.date}</th>
                                    <th>{comment.hour}</th>
                                    <th>

                                        <button
                                            className="text-modal-btn" onClick={() => {
                                            setIsShowDeleteModal(true)
                                            setCommentID(comment.id)
                                        }}>
                                            Delete
                                        </button>

                                        <button
                                            className="text-modal-btn" onClick={() => {

                                            setIsShowEditModal(true)
                                            setCommentID(comment.id)
                                            setCommentEditText(comment.body)

                                        }}>
                                            Edit
                                        </button>

                                        <button className="text-modal-btn">Response</button>

                                        <button className="text-modal-btn">Confirm</button>

                                    </th>
                                </tr>
                            ))
                        }
                        </tbody>

                    </table>
                ) : (
                    <ErrorBox msg="No comment found"/>
                )
            }

            {
                isShowDetailsModal && (
                    <DetailsModal onHide={closeDetailsModal}>

                        {/*  Children of DetailsModal  */}
                        <div className="details-modal-close">
                            <IoClose onClick={closeDetailsModal} className="details-modal-close-btn"/>
                        </div>
                        <br/>
                        <p>{mainProductInfos.body}</p>
                    </DetailsModal>
                )
            }

            {
                isShowDeleteModal && (
                    <DeleteModal submitAction={deleteModalSubmitAction} cancelAction={deleteModalCancelAction}/>
                )
            }

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
                               placeholder="Enter the new Text of the comment"
                               value={commentEditText}
                               onChange={(event) => setCommentEditText(event.target.value)}
                        />
                    </div>

                </EditModal>
            }

        </div>
    )
}

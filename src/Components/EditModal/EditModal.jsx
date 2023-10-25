import React, {useEffect} from 'react'
import './EditModal.css'

export default function EditModal({children, onClose, onSubmit}) {

    useEffect(() => {

        const onCloseKey = (event) => {
            if (event.keyCode === 27) {
                onClose()
            }
        };

        window.addEventListener("keydown", onCloseKey)

        return () => {
            window.removeEventListener("keydown", onCloseKey)
        };

    });

    return (
        <div className="modal-parent active">
            <form className="edit-modal-form">

                <div className="edit-modal">

                    <p>Enter the new information</p>

                    <div className="edit-modal-content">
                        {children}
                    </div>

                    <div className="edit-modal-btns">
                        <button className="edit-form-submit edit-btn" onClick={onSubmit}>Save</button>
                        <button className="edit-form-reject edit-btn" onClick={onClose}>Cancel</button>
                    </div>

                </div>

            </form>
        </div>
    )
}

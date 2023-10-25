import React, {useEffect} from 'react'
import ReactDOM from 'react-dom'
import './DeleteModal.css'

export default function DeleteModal({submitAction, cancelAction}) {

    useEffect(() => {

        const onCloseKey = (event) => {
            if (event.keyCode === 27) {
                cancelAction()
            }
        };

        window.addEventListener("keydown", onCloseKey)

        return () => {
            window.removeEventListener("keydown", onCloseKey)
        };

    });

    return ReactDOM.createPortal(
        <div className="modal-parent active">
            <div className="delete-modal">

                <p>Are you sure you want to delete ?</p>
                <div className="delete-modal-btns">
                    <button className="delete-btn delete-modal-accept-btn" onClick={() => submitAction()}>Yes</button>
                    <button className="delete-btn delete-modal-reject-btn" onClick={() => cancelAction()}>No</button>
                </div>

            </div>
        </div>, document.getElementById('modals-parent')
    )
}

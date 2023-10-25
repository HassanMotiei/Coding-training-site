import React, {useEffect} from 'react'
import './DetailsModal.css'

export default function DetailsModal({onHide, children}) {

    useEffect(() => {

        const onHideKey = (event) => {
            if (event.keyCode === 27) {
                onHide()
            }
        };

        window.addEventListener("keydown", onHideKey)

        return () => {
            window.removeEventListener("keydown", onHideKey)
        };

    });

    return (
        <div className="modal-parent active">
            <div className="details-modal">
                {children}
            </div>
        </div>
    )
}

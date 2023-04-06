import React from 'react'

const Notification = ({category, message, timestamp}) => {

    
    return (
        <div className="toast-container position-fixed top-0 start-50 translate-middle-x p-3">
            <div id="liveToast" className="toast" role="alert" aria-live="assertive" aria-atomic="true">
                <div className="toast-header">

                    <strong className="me-auto">{category}</strong>
                    <small>{timestamp}</small>
                    <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div className="toast-body">
                    {message}
                </div>
            </div>
        </div>
    )
}

export default Notification
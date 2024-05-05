import React from 'react'

function DeleteModal({handleDelete, setToDelete}) {
  return (
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <p className="py-4">Are you sure you want to delete?</p>
          <div className="modal-action">
            <form method="dialog" className="flex gap-2">
              <button className="btn btn-primary" onClick={handleDelete}>
                Yes
              </button>
              <button
                className="btn btn-error"
                onClick={() => setToDelete("")}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      </dialog>
  )
}

export default DeleteModal
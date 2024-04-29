function CreateNew({ children }) {
  return (
    <div>
      <button
        className="btn btn-secondary"
        onClick={() => document.getElementById("my_modal_2").showModal()}
      >
        Create new
      </button>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box text-center">
          <h2 className="text-2xl font-bold text-primary mb-8">Create new</h2>
          {children}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}

export default CreateNew;

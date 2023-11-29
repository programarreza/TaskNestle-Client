const RequestModal = () => {
//   console.log(asset);
  return (
    <>
      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box relative p-12">
          <input
            type="text"
            placeholder="Additional Notes"
            className="input input-bordered input-info w-full"
          />

          <div className="mt-5 mx-auto flex justify-center">
            <button className="btn rounded-md  bg-[#D1A054] hover:bg-[#eba43b] text-white">
              Request{" "}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RequestModal;

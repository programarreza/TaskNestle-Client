import { useState } from "react";
import CustomAssetUpdate from "../Employee/CustomAssetUpdate";
import { useForm } from "react-hook-form";
import useAxiosLocal from "../../Hooks/useAxiosLocal";
import toast from "react-hot-toast";
import { imageUpload } from "../../api/Utils/Utils";

const Modal = ({ modalId, asset }) => {
  // console.log(asset);
  const {
    additional,
    assetInfo,
    assetType,
    date,
    image,
    name,
    price,
    status,
    _id,
  } = asset;
  console.log(asset);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box relative max-w-none">
          {isOpen ? (
            // update filed
            <>
              <CustomAssetUpdate asset={asset} setIsOpen={setIsOpen} isOpen={isOpen}/>
               
            </>
          ) : (
            // table
            <>
              <div className="overflow-x-auto">
                <table className="table">
                  {/* head */}
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Asset Name</th>
                      <th>Price</th>
                      <th>Type</th>
                      <th>Request date</th>
                      <th>Why needed</th>
                      <th>Additional info</th>
                      <th>Status</th>
                      <th>Action</th>
                      {/* <th>Action</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {/* row */}
                    <tr>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img src={image} alt="Asset image" />
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>{name}</td>
                      <td>$ {price}</td>
                      <th>{assetType}</th>
                      <th>{date}</th>
                      <th>{assetInfo}</th>
                      <th>{additional}</th>
                      <th>{status}</th>
                      <th>
                        <button
                          onClick={() => setIsOpen(!isOpen)}
                          className="btn"
                        >
                          update
                        </button>
                      </th>
                      {/* <th>
                    <button className="btn">btn</button>
                  </th> */}
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="modal-action">
                <label htmlFor="my_modal_6" className="btn">
                  Close!
                </label>
              </div>
            </>
          )}

          {/* update form */}
        </div>
      </div>
    </>
  );
};

export default Modal;

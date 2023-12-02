import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import { axiosSecure } from "../../../Hooks/useAxiosSecure";
import useUserRole from "../../../Hooks/useUserRole";
import Container from "../../../components/shared/Container/Container";

const RequestAnAsset = () => {
  const { user, loading } = useAuth();
  const [asset, setAsset] = useState({});
  const [assets, setAssets] = useState([]);
  const [searchValue, setSearchValue] = useState([]);
  const [type, setType] = useState("");
  const navigate = useNavigate();
  const [, users] = useUserRole()

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const typeValue = ["Returnable", "Non-returnable"];

  useEffect(() => {
    axiosSecure(`/assets?name=${searchValue}&type=${type}`)
      .then((res) => {
        console.log(res.data);
        setAssets(res.data);
      })
      .then((err) => {
        console.log(err);
      });
    }, [searchValue, type]);
    
    console.log(37, asset);
  const onSubmit = async (data) => {
    const assetInfo = {
      name: asset?.name,
      type: asset?.type,
      email: user?.email,
      userName: user?.displayName,
      adminEmail: users?.adminEmail,
      date: new Date(),
      additionalNotes: data.additionalNotes,
      status: "pending",
    };
    console.log(assetInfo);

    axiosSecure
      .post("/request-asset", assetInfo)
      .then((res) => {
        if (res.data.insertedId) {
          reset();
          toast.success("Request Successfully");
          console.log(res.data);
          navigate("/request-asset");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log(75, assets);
  console.log(83, type);
  console.log(84, asset);

  return (
    <Container>
      <div className="py-6 h-screen">
        {/* search & filter */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div>
            <input
              className="border py-3 px-12 rounded-lg border-[#D1A054] outline-[#D1A054]"
              type="text"
              placeholder="Search by Asset Name"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>

          <div>
            <select
              onChange={(e) => setType(e.target.value)}
              className="select select-bordered rounded-md border  border-[#D1A054]"
              required
            >
              <option disabled selected>
                Type
              </option>
              {typeValue?.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>
        <h2 className="text-4xl text-center uppercase font-semibold">
          Request For An Asset
        </h2>

        <div>
          <div className="overflow-x-auto">
            <table className="table text-center my-12">
              {/* head */}
              <thead>
                <tr className="bg-[#D1A054]  text-white text-xl">
                  <th>SL.</th>
                  <th>Asset Name</th>
                  <th>Asset Type</th>
                  <th>Availability</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {assets?.length === 0 ? (
                  <span className="text-2xl text-center ">
                    Search Result Not Match
                  </span>
                ) : (
                  <>
                    {assets?.map((asset, index) => (
                      <tr key={index}>
                        <th>{index + 1}</th>
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="font-bold">{asset?.name}</div>
                          </div>
                        </td>
                        <td>{asset?.type}</td>
                        <td>
                          {asset?.quantity === "0"
                            ? " Out of stock"
                            : "Available"}
                        </td>
                        <th>
                          {asset?.quantity === "0" ? (
                            <div className="my-3">
                              <label className="p-3.5 rounded-md  bg-[#d19f5459]  text-white">
                                Request
                              </label>
                            </div>
                          ) : (
                            <>
                              <label
                                onClick={() => setAsset(asset)}
                                htmlFor="my_modal_6"
                                className="btn rounded-md  bg-[#D1A054] hover:bg-[#eba43b] text-white"
                              >
                                Request
                              </label>
                            </>
                          )}
                        </th>
                      </tr>
                    ))}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
        {/* Modal */}
        <div>
          <input type="checkbox" id="my_modal_6" className="modal-toggle" />
          <div className="modal" role="dialog">
            <div className="modal-box relative p-12">
              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  {...register("additionalNotes", { required: true })}
                  type="text"
                  placeholder="Additional Notes"
                  className="input input-bordered input-info w-full"
                />

                <div className="mt-5 mx-auto flex justify-center">
                  <button
                    type="submit"
                    className="btn rounded-md  bg-[#D1A054] hover:bg-[#eba43b] text-white"
                  >
                    Request{" "}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default RequestAnAsset;

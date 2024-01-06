import moment from 'moment';
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import Loading from "../../../components/Loading/Loading";
import Container from "../../../components/shared/Container/Container";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const MyAssets = () => {
  const { user, loading } = useAuth();
  const [searchValue, setSearchValue] = useState([]);
  const [type, setType] = useState("");
  const [assets, setAssets] = useState([]);
  const axiosSecure = useAxiosSecure()

  const typeValue = ["Returnable", "Non-returnable"];

  useEffect(() => {
    axiosSecure(
      `/request-assets/${user?.email}?name=${searchValue}&type=${type}`
    )
      .then((res) => {
        console.log(res.data);
        setAssets(res.data);
      })
      .then((err) => {
        console.log(err);
      });
  }, [searchValue, type, user?.email, axiosSecure]);
 

  if (loading && !assets) {
    return <Loading />;
  }
  // console.log(assets);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      customClass: "swal-wide",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/request-asset/${id}`).then((res) => {
          console.log(res.data);
          if (res.data.deletedCount > 0) {
           
            const remaining = assets.filter(asset => asset._id !== id)
            setAssets(remaining)
            toast.success("Cancel Successfully");
          }
        });
      }
    });
  };

  const typeInfo = {
    status: "returned",
  };
  const handleReturn = (id) => {
    axiosSecure.patch(`/request-asset/${id}`, typeInfo);
    // refetch();
  };

  console.log(searchValue);
  console.log(type);
  return (
    <Container>
      <div className="py-12 h-screen" data-aos="fade-top">
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
          My Assets
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
                  <th>Request Date</th>
                  <th>Approved Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {assets?.length === 0 ? (
                  <span className="text-2xl text-center ">
                    Search Result Not Found
                  </span>
                ) : (
                  <>
                    {assets?.map((asset, index) => (
                      <tr key={asset._id}>
                        <th>{index + 1}</th>
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="font-bold">{asset?.name}</div>
                          </div>
                        </td>
                        <td>{asset?.type}</td>
                        <td>{moment(asset?.date).format("DD-MM-YYYY")}</td>
                        <td>{moment(asset?.approvedDate).format("DD-MM-YYYY")}</td>
                        <th>{asset?.status}</th>
                        <th>
                          {asset?.status === "pending" && (
                            <label
                              onClick={() => handleDelete(asset?._id)}
                              htmlFor="my_modal_6"
                              className="btn rounded-md  bg-[#D1A054] hover:bg-[#eba43b] text-white"
                            >
                              Cancel
                            </label>
                          )}
                          {asset?.status === "approved" &&
                          asset.type === "Returnable" ? (
                            <label
                              onClick={() => handleReturn(asset?._id)}
                              htmlFor="my_modal_6"
                              className="btn rounded-md  bg-[#D1A054] hover:bg-[#eba43b] text-white"
                            >
                              Return
                            </label>
                          ) : (
                            <>
                              {asset?.status === "approved" && (
                                <label
                                  htmlFor="my_modal_6"
                                  className="btn rounded-md  bg-[#D1A054] hover:bg-[#eba43b] text-white"
                                >
                                  Print
                                </label>
                              )}
                            </>
                          )}

                          {asset?.status === "returned" && (
                            <div className="my-3">
                              <label className="p-3.5 rounded-md  bg-[#d19f5459]  text-white">
                                Return
                              </label>
                            </div>
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
      </div>
    </Container>
  );
};

export default MyAssets;

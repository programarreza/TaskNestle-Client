import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import { axiosSecure } from "../../../Hooks/useAxiosSecure";
import Loading from "../../../components/Loading/Loading";
import Container from "../../../components/shared/Container/Container";

const CustomRequestList = () => {
  const {loading } = useAuth();

  const { data: assets, refetch } = useQuery({
    enabled: !loading,
    queryFn: async () => await axiosSecure("/custom-asset"),
    queryKey: ["assets"],
  });

  if (loading || !assets) {
    return <Loading />;
  }
  console.log(assets.data);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      customClass: "swal-wide",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Reject!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/custom-asset/${id}`).then((res) => {
          console.log(res.data);
          if (res.data.deletedCount) {
            refetch();
            toast.success("Reject Done!");
          }
        });
      }
    });
  };
  const statusInfo = {
    status: "approved",
  };
  const handleApprove = (id) => {
    console.log(id);
    axiosSecure.patch(`/custom-asset-update/${id}`, statusInfo);
    refetch();
  };

  return (
    <Container>
      <div className="py-12 h-screen">
        <h2 className="text-4xl text-center uppercase font-semibold">
          Custom Request List
        </h2>

        <div>
          <div className="overflow-x-auto">
            <table className="table text-center my-12">
              {/* head */}
              <thead>
                <tr className="bg-[#D1A054]  text-white text-xl">
                  <th>Image</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Type</th>
                  <th>Why you need this</th>
                  <th>Additional info</th>
                  <th>Action</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {assets?.data?.map((asset) => (
                  <tr key={asset._id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={asset?.image}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="font-bold">{asset?.name}</div>
                      </div>
                    </td>
                    <td>$ {asset?.price}</td>
                    <td>{asset?.assetType}</td>
                    <th>{asset?.assetInfo}</th>
                    <th>{asset?.additional}</th>
                    <th>
                      {asset?.status === "pending" ? (
                        <label
                          onClick={() => handleApprove(asset?._id)}
                          htmlFor="my_modal_6"
                          className="btn rounded-md  bg-[#D1A054] hover:bg-[#eba43b] text-white"
                        >
                          Approve
                        </label>
                      ) : (
                        <span>Approved</span>
                      )}
                    </th>
                    <th>
                      <label
                        onClick={() => handleDelete(asset?._id)}
                        htmlFor="my_modal_6"
                        className="btn btn-sm rounded-md  bg-[#d15454] hover:bg-[#eba43b] text-white"
                      >
                        Reject
                      </label>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CustomRequestList;

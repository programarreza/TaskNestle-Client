import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/Loading/Loading";
import Container from "../../../components/shared/Container/Container";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import { axiosSecure } from "../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";

const AllRequests = () => {
  const { loading } = useAuth();

  const { data: requestAssets, refetch } = useQuery({
    enabled: !loading,
    queryFn: async () => await axiosSecure("/request-asset"),
    queryKey: ["request-asset"],
  });

  if (loading || !requestAssets) {
    return <Loading />;
  }

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
        axiosSecure.delete(`/request-asset/${id}`).then((res) => {
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
    approvedDate: new Date(),
  };
  const handleApprove = (id) => {
    console.log(id);
    axiosSecure.patch(`/request-asset-update/${id}`, statusInfo);
    refetch();
  };

  return (
    <Container>
      <div className="py-12 h-screen">
        <h2 className="text-4xl text-center uppercase font-semibold">
          All Request
        </h2>

        <div>
          <div className="overflow-x-auto">
            <table className="table text-center my-12">
              {/* head */}
              <thead>
                <tr className="bg-[#D1A054]  text-white text-xl">
                  <th> Asset</th>
                  <th>Type</th>
                  <th>Email</th>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Additional note</th>
                  <th>Status</th>
                  <th>Action</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {requestAssets?.data?.map((asset) => (
                  <tr key={asset._id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="font-bold">{asset?.name}</div>
                      </div>
                    </td>
                    <td>{asset?.type}</td>
                    <td>{asset?.email}</td>
                    <th>{asset?.userName}</th>
                    <th>{asset?.date}</th>
                    <th>{asset?.additionalNotes}</th>
                    <th>{asset?.status}</th>
                    <th>
                      {asset?.status === "pending" ? (
                        <label
                          onClick={() => handleApprove(asset?._id)}
                          htmlFor="my_modal_6"
                          className="btn btn-sm rounded-md  bg-[#D1A054] hover:bg-[#eba43b] text-white"
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

export default AllRequests;

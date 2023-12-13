import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import { getPendingAssets } from "../../api/auth";
import Loading from "../Loading/Loading";
import Container from "../shared/Container/Container";
import toast from "react-hot-toast";
import { axiosSecure } from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const MyPendingRequest = () => {
  const { user, loading } = useAuth();
  const { data: assets, refetch } = useQuery({
    enabled: !loading,
    queryFn: async () => await getPendingAssets(user?.email),
    queryKey: ["my-team"],
  });

  if (loading || !assets) {
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
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/request-asset/${id}`).then((res) => {
          console.log(res.data);
          if (res.data.deletedCount) {
            refetch();
            toast.success("Cancel Successfully");
          }
        });
      }
    });
  };

  if (assets.length > 0) {
    return (
      <Container>
        <div className="py-12 h-screen shadow-xl rounded-lg my-12" data-aos="fade-right">
          <h2 className="text-4xl text-center uppercase font-semibold">
            My Pending Request
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
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {assets?.map((asset, index) => (
                    <tr key={asset._id}>
                      <th>{index + 1}</th>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="font-bold">{asset?.name}</div>
                        </div>
                      </td>
                      <td>{asset?.type}</td>
                      <td>{asset?.date}</td>
                      <th>{asset?.status}</th>
                      <th>
                        <label
                          onClick={() => handleDelete(asset?._id)}
                          className="btn rounded-md  bg-[#D1A054] hover:bg-[#eba43b] text-white"
                        >
                          Cancel
                        </label>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* Modal */}
          {/* <Modal modalId={"my_modal_6"} asset={asset} /> */}
        </div>
      </Container>
    );
  }
};

export default MyPendingRequest;

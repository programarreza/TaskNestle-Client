import moment from 'moment';
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import { getTopProducts } from "../../api/auth";
import Loading from "../Loading/Loading";
import Swal from "sweetalert2";
import { axiosSecure } from "../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import Container from "../shared/Container/Container";

const TopMostRequest = () => {
  const { loading } = useAuth();

  const { data: topProducts, refetch } = useQuery({
    enabled: !loading,
    queryFn: async () => await getTopProducts(),
    queryKey: ["top-product"],
  });

  if (loading || !topProducts) {
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
	toast.success('approved successfully')
    refetch();
  };

  return (
   <Container>
	<div className="overflow-x-auto shadow-lg my-12 rounded-lg h-screen" data-aos="fade-right">
          <h2 className="text-4xl text-center uppercase font-semibold">
            Top Most Requested
          </h2>
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
              {topProducts?.length ? (
                <>
                  {topProducts?.map((topProduct) => (
                    <tr key={topProduct._id}>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="font-bold">{topProduct?.name}</div>
                        </div>
                      </td>
                      <td>{topProduct?.type}</td>
                      <td>{topProduct?.email}</td>
                      <th>{topProduct?.userName}</th>
                      <th>{moment(topProduct?.date).format("DD-MM-YYYY")}</th>
                      <th>{topProduct?.additionalNotes}</th>
                      <th>{topProduct?.status}</th>
                      <th>
                        {topProduct?.status === "pending" ? (
                          <label
                            onClick={() => handleApprove(topProduct?._id)}
                            htmlFor="my_modal_6"
                            className="btn btn-sm rounded-md border-none opacity-80 hover:opacity-100  bg-gradient-to-r from-[#D32053] to-[#460BC6] text-white"
                          >
                            Approve
                          </label>
                        ) : (
                          <span>Approved</span>
                        )}
                      </th>
                      <th>
                        <label
                          onClick={() => handleDelete(topProduct?._id)}
                          htmlFor="my_modal_6"
                          className="btn btn-sm rounded-md border-none opacity-80 hover:opacity-100  bg-gradient-to-r from-[#D32053] to-[#460BC6] text-white"
                        >
                          Reject
                        </label>
                      </th>
                    </tr>
                  ))}
                </>
              ) : (
                <p className="text-2xl font-semibold my-5">No Data Available</p>
              )}
            </tbody>
          </table>
        </div>
   </Container>
  );
};

export default TopMostRequest;

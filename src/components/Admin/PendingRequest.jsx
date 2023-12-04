import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import { getPendingProducts } from "../../api/auth";
import Loading from "../Loading/Loading";
import Container from "../shared/Container/Container";
import { axiosSecure } from "../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const PendingRequest = () => {
  const { user, loading } = useAuth();

  const { data: products, refetch } = useQuery({
    enabled: !loading,
    queryFn: async () => await getPendingProducts(user?.email),
    queryKey: ["pending-product"],
  });

  if (loading || !products) {
    return <Loading />;
  }
  //   console.log(products);

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
    toast.success("Approved Successfully");
    refetch();
  };

  return (
    <Container>
      <div className="shadow-lg my-24 rounded-lg h-screen">
        <h2 className="text-4xl text-center uppercase font-semibold mt-12">
          Pending Request
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
                {products?.length ? (
                  <>
                    {products?.map((product) => (
                      <tr key={product._id}>
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="font-bold">{product?.name}</div>
                          </div>
                        </td>
                        <td>{product?.type}</td>
                        <td>{product?.email}</td>
                        <th>{product?.userName}</th>
                        <th>{product?.date}</th>
                        <th>{product?.additionalNotes}</th>
                        <th>{product?.status}</th>
                        <th>
                          {product?.status === "pending" ? (
                            <label
                              onClick={() => handleApprove(product?._id)}
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
                            onClick={() => handleDelete(product?._id)}
                            htmlFor="my_modal_6"
                            className="btn btn-sm rounded-md  bg-[#d15454] hover:bg-[#eba43b] text-white"
                          >
                            Reject
                          </label>
                        </th>
                      </tr>
                    ))}
                  </>
                ) : (
                  <p className="text-2xl font-semibold my-5">
                    No Data Available
                  </p>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default PendingRequest;
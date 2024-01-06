import { useQuery } from "@tanstack/react-query";
import { getTopProducts } from "../../api/auth";
import Loading from "../Loading/Loading";
import Container from "../shared/Container/Container";
import useAuth from "../../Hooks/useAuth";
import { axiosSecure } from "../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const FrequentlyRequest = () => {
  const { loading } = useAuth();
  

  const { data: topProducts, refetch } = useQuery({
    enabled: !loading,
    queryFn: async () => await getTopProducts(),
    queryKey: ["frequently"],
  });

  if (loading || !topProducts) {
    return <Loading />;
  }

  

  const handleDelete = async(id) => {
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

  const typeInfo = {
    status: "returned",
  };
  const handleReturn = (id) => {
    axiosSecure.patch(`/request-asset/${id}`, typeInfo);
	toast.success("Return Successfully");
    refetch();
  };

  return (
    <Container>
      <div className="overflow-x-auto shadow-lg my-12 rounded-lg h-screen" data-aos="fade-bottom">
        <h2 className="text-4xl text-center uppercase font-semibold">
		Frequently requested 
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
                    <th>{topProduct?.date}</th>
                    <th>{topProduct?.additionalNotes}</th>
                    <th>{topProduct?.status}</th>
                    {/* <th>
                      {topProduct?.status === "pending" ? (
                        <label
                          // onClick={() => handleApprove(topProduct?._id)}
                        //   htmlFor="my_modal_6"
                          className="btn btn-sm rounded-md  bg-[#D1A054] hover:bg-[#eba43b] text-white"
                        >
                          Approve
                        </label>
                      ) : (
                        <span>Approved</span>
                      )}
                    </th> */}
                    <th>
                          {topProduct?.status === "pending" && (
                            <label
                              onClick={() => handleDelete(topProduct?._id)}
                             
                              className="btn opacity-80 hover:opacity-100 bg-white bg-gradient-to-r from-[#D32053] to-[#460BC6] text-white"
                            >
                              Cancel
                            </label>
                          )}
                          {topProduct?.status === "approved" &&
                          topProduct.type === "Returnable" ? (
                            <label
                              onClick={() => handleReturn(topProduct?._id)}
                             
                              className="btn opacity-80 hover:opacity-100 bg-white bg-gradient-to-r from-[#D32053] to-[#460BC6] text-white"
                            >
                              Return
                            </label>
                          ) : (
                            <>
                              {topProduct?.status === "approved" && (
                                <label
                                 
                                  className="btn opacity-80 hover:opacity-100 bg-white bg-gradient-to-r from-[#D32053] to-[#460BC6] text-white"
                                >
                                  Print
                                </label>
                              )}
                            </>
                          )}

                          {topProduct?.status === "returned" && (
                            <div className="my-3">
                              <label className=" opacity-50 bg-white bg-gradient-to-r from-[#D32053] to-[#460BC6]  p-3.5 rounded-md  bg-[#d19f5459]  text-white">
                                Return
                              </label>
                            </div>
                          )}
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

export default FrequentlyRequest;

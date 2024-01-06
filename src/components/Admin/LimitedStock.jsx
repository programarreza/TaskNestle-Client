import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import Container from "../shared/Container/Container";
import Loading from "../Loading/Loading";
import Swal from "sweetalert2";
import { axiosSecure } from "../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import { getLimitedStock } from "../../api/auth";

const LimitedStock = () => {
  const { user, loading } = useAuth();

  const { data: assets, refetch } = useQuery({
    enabled: !loading,
    queryFn: async () => await getLimitedStock(user?.email),
    queryKey: ["limited-stock"],
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
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/asset/${id}`).then((res) => {
          console.log(res.data);
          if (res.data.deletedCount) {
            console.log(id);
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <Container>
      <div className="my-24 shadow-lg rounded-lg h-screen" data-aos="fade-left">
        <h2 className="text-4xl text-center uppercase font-semibold ">
          Limited Stock items
        </h2>
        <div className="overflow-x-auto">
          <table className="table text-center my-12">
            {/* head */}
            <thead>
              <tr className="bg-[#D1A054]  text-white text-xl">
                <th>SL.</th>
                <th>Product Name</th>
                <th>Product Type</th>
                <th>Product Quantity</th>
                <th>Date</th>
                <th>update</th>
                <th>delete</th>
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
                  <td>{asset?.quantity}</td>
                  <th>{asset?.date}</th>
                  <th>
                    <Link to={`/product-update/${asset?._id}`}>
                      <label
                        htmlFor="my_modal_6"
                        className="btn btn-sm rounded-md border-none opacity-80 hover:opacity-100  bg-gradient-to-r from-[#D32053] to-[#460BC6] text-white"
                      >
                        <FiEdit size={22} />
                      </label>
                    </Link>
                  </th>
                  <th>
                    <label
                      onClick={() => handleDelete(asset?._id)}
                      htmlFor="my_modal_6"
                      className="btn btn-sm rounded-md border-none opacity-80 hover:opacity-100  bg-gradient-to-r from-[#D32053] to-[#460BC6] text-white"
                    >
                      <AiFillDelete size={22} />
                    </label>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Container>
  );
};

export default LimitedStock;

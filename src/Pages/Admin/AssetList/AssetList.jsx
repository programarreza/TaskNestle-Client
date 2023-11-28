import { useQuery } from "@tanstack/react-query";
import { AiFillDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import useAuth from "../../../Hooks/useAuth";
import { axiosSecure } from "../../../Hooks/useAxiosSecure";
import { getAsset } from "../../../api/auth";
import Loading from "../../../components/Loading/Loading";
import Container from "../../../components/shared/Container/Container";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const AssetList = () => {
  const { user, loading } = useAuth();

  const { data: assets, refetch } = useQuery({
    enabled: !loading,
    queryFn: async () => await getAsset(user?.email),
    queryKey: ["assets"],
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

  console.log(24, assets);

  return (
    <Container>
      <div className="py-12 h-screen">
        <h2 className="text-4xl text-center uppercase font-semibold">
          Asset List
        </h2>

        <div>
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
                  <th>
                    <button>update</button>
                  </th>
                  <th>
                    <button>delete</button>
                  </th>
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
                          // onClick={() => handleSingleData(asset?._id)}
                          htmlFor="my_modal_6"
                          className="btn rounded-md  bg-[#D1A054] hover:bg-[#eba43b] text-white"
                        >
                          <FiEdit size={22} />
                        </label>
                      </Link>
                    </th>
                    <th>
                      <label
                        onClick={() => handleDelete(asset?._id)}
                        htmlFor="my_modal_6"
                        className="btn rounded-md  bg-[#D1A054] hover:bg-[#eba43b] text-white"
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
      </div>
    </Container>
  );
};

export default AssetList;

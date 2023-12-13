import { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import Loading from "../../../components/Loading/Loading";
import Container from "../../../components/shared/Container/Container";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AssetList = () => {
  const { user, loading } = useAuth();
  const [searchValue, setSearchValue] = useState([]);
  const [type, setType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [assets, setAssets] = useState([]);
  const axiosSecure = useAxiosSecure()

  const typeValue = ["Returnable", "Non-returnable"];
  console.log(quantity);

  useEffect(() => {
    axiosSecure.get(`/assets/${user?.email}?name=${searchValue}&type=${type}&sortField=quantity&sortOrder=${quantity}`)
      .then((res) => {
        console.log(res?.data);
        setAssets(res?.data);
      })
      .then((err) => {
        console.log(err);
      });
  }, [searchValue, type, user?.email, quantity, axiosSecure]);

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
          if (res.data.deletedCount > 0) {
            console.log(id);
            const remaining = assets.filter(asset => asset._id !== id)
            setAssets(remaining)
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
      <div className="py-12 h-screen" data-aos="zoom-in">
        {/* search & filter */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-2 mb-6">
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

          <div>
            <select
              onChange={(e) => setQuantity(e.target.value)}
              className="select select-bordered rounded-md border  border-[#D1A054]"
              required
            >
              <option disabled selected>
                Quantity
              </option>

              <option value="asc">Low to high</option>
              <option value="desc">High to low</option>
            </select>
          </div>
        </div>
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
                          className="btn btn-sm rounded-md  bg-[#D1A054] hover:bg-[#eba43b] text-white"
                        >
                          <FiEdit size={22} />
                        </label>
                      </Link>
                    </th>
                    <th>
                      <label
                        onClick={() => handleDelete(asset?._id)}
                        htmlFor="my_modal_6"
                        className="btn btn-sm rounded-md  bg-[#d15454] hover:bg-[#eba43b] text-white"
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

import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useUserRole from "../../Hooks/useUserRole";
import { getCustomAsset } from "../../api/auth";
import Loading from "../Loading/Loading";
import Container from "../shared/Container/Container";
import axios from "axios";
import { useState } from "react";
import Modal from "../Modal/Modal";

const MyCustomRequest = () => {
  const { user, loading } = useAuth();
  const [role] = useUserRole();
  const [asset, setAsset] = useState({});

  console.log("role", role);

  const { data: assets } = useQuery({
    enabled: !loading ,
    queryFn: async () => await getCustomAsset(user?.email),
    queryKey: ["custom-assets"],
  });

  if (loading || !assets) {
    return <Loading />;
  }
  console.log(assets);

  const handleSingleData = async(id) => {
    // console.log(id);
    await axios
      .get(`http://localhost:5000/custom-asset/${id}`)
      .then((res) => {
        setAsset(res.data);
        
      })
      .catch((err) => console.log(err));
      // console.log(data);
  };


  return (
    <Container>
      <div className="py-12 h-screen">
        <h2 className="text-4xl text-center uppercase font-semibold">
          My custom request{" "}
        </h2>

        <div>
          <div className="overflow-x-auto">
            <table className="table text-center my-12">
              {/* head */}
              <thead>
                <tr className="bg-[#D1A054]  text-white text-xl">
                  <th>SL.</th>
                  <th>Asset Name</th>
                  <th>Price</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Details</th>
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
                    <td>$ {asset?.price}</td>
                    <td>{asset?.assetType}</td>
                    <th>{asset?.status}</th>
                    <th>
                      <label
                        onClick={() => handleSingleData(asset?._id)}
                        htmlFor="my_modal_6"
                        className="btn rounded-md  bg-[#D1A054] hover:bg-[#eba43b] text-white"
                      >
                        View Details
                      </label>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Modal */}
        <Modal modalId={"my_modal_6"} asset={asset} />
      </div>
    </Container>
  );
};

export default MyCustomRequest;

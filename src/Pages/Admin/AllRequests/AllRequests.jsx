import moment from 'moment';
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";

import Loading from "../../../components/Loading/Loading";
import Container from "../../../components/shared/Container/Container";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AllRequests = () => {
  const {user,  loading } = useAuth();
  const [searchValue, setSearchValue] = useState([]);
  const [assets, setAssets] = useState([]);
  const axiosSecure = useAxiosSecure()

  useEffect(() => {
    axiosSecure(`/request-asset/${user?.email}?email=${searchValue}`)
      .then((res) => {
        console.log(res.data);
        setAssets(res.data);
      })
      .then((err) => {
        console.log(err);
      });
  }, [searchValue, user?.email, axiosSecure]);


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
      confirmButtonText: "Yes, Reject!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/request-asset/${id}`).then((res) => {
          console.log(res.data);
          if (res.data.deletedCount) {
            const remaining = assets.filter(asset => asset._id !== id)
            setAssets(remaining)
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
  };

  return (
    <Container>
      <div className="py-12 h-screen" data-aos="zoom-in">
      <div className="flex items-center justify-center gap-2 mb-6">
          <div>
            <input
              className="border py-3 px-12 rounded-lg border-[#D1A054] outline-[#D1A054]"
              type="text"
              placeholder="Search by email address"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
          
        </div>
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
                {assets?.length ? <>{assets?.map((asset) => (
                  <tr key={asset._id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="font-bold">{asset?.name}</div>
                      </div>
                    </td>
                    <td>{asset?.type}</td>
                    <td>{asset?.email}</td>
                    <th>{asset?.userName}</th>
                    <th>{moment(asset?.date).format("DD-MM-YYYY")}</th>
                    <th>{asset?.additionalNotes}</th>
                    <th>{asset?.status}</th>
                    <th>
                      {asset?.status === "pending" ? (
                        <label
                          onClick={() => handleApprove(asset?._id)}
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
                        onClick={() => handleDelete(asset?._id)}
                        htmlFor="my_modal_6"
                        className="btn btn-sm rounded-md border-none opacity-80 hover:opacity-100  bg-gradient-to-r from-[#D32053] to-[#460BC6] text-white"
                      >
                        Reject
                      </label>
                    </th>
                  </tr>
                ))}</> : <p className="text-2xl font-semibold my-5">No Data Available</p>}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AllRequests;

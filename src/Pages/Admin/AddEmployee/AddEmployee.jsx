import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import useEmployee from "../../../Hooks/useEmployee";
import Loading from "../../../components/Loading/Loading";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AddEmployee = () => {
  const { user } = useAuth();
  const [employee, loading] = useEmployee();
  const [normalUsers, setNormalUser] = useState("");
  const axiosSecure = useAxiosSecure()

  useEffect(() => {
    axiosSecure
      .get("/normalUsers")
      .then((res) => {
        setNormalUser(res?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [axiosSecure]);

  if (loading && !employee) {
    return <Loading />;
  }

  const handleAddTeam = (id) => {
    console.log(id);

    const addTeam = {
      email: user?.email,
    };
    console.log(addTeam);
    axiosSecure
      .patch(`/addedTeam/${id}`, addTeam)
      .then((res) => {
        if (res.data) {
          toast.success("added Successfully");
          console.log(res.data);
          // reset();
          // navigate("/asset-list");
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error);
      });
  };

  // console.log(26, normalUsers, user);
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table text-center my-12 w-2/4 mx-auto shadow-md">
          {/* head */}
          <thead>
            <tr className="text-lg">
              <th> My Employee Count </th>
              <th>Package Limit </th>
              <th>Action </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-xl font-medium">{employee?.length}</td>
              <td>Coming soon</td>
              <td>
                <Link to={"/package"}>
                  <button className="btn btn-sm rounded-md  bg-[#D1A054] hover:bg-[#eba43b] text-white">
                    increase limit
                  </button>
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* all normal user */}
      {normalUsers.length ? (
        <div>
          <div className="overflow-x-auto">
            <table className="table text-center my-12 w-2/4 mx-auto shadow-md">
              {/* head */}
              <thead>
                <tr className="text-lg">
                  <th> Image </th>
                  <th>User Name </th>
                  <th>User Email </th>
                  <th>Action </th>
                </tr>
              </thead>
              <tbody>
                {normalUsers?.map((normalUser) => (
                  <tr key={normalUser._id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img src={normalUser?.image} alt="user image" />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{normalUser?.name}</td>
                    <td>{normalUser?.email}</td>
                    <td>
                      <button
                        onClick={() => handleAddTeam(normalUser?._id)}
                        className="btn btn-sm rounded-md  bg-[#D1A054] hover:bg-[#eba43b] text-white"
                      >
                        Add to the team
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <>
          <span className="text-center flex justify-center text-3xl">
            Not User Available
          </span>{" "}
          <br />{" "}
          <span className="text-center flex justify-center text-xl">
            Request to create user
          </span>
        </>
      )}
    </div>
  );
};

export default AddEmployee;

import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { axiosSecure } from "../../../Hooks/useAxiosSecure";
import useEmployee from "../../../Hooks/useEmployee";
import Loading from "../../../components/Loading/Loading";
import Container from "../../../components/shared/Container/Container";
import '../../../index.css';

const MyEmployeeList = () => {

  const [employee, refetch, loading] = useEmployee()

  if (loading && !employee) {
    return <Loading />;
  }

  console.log(employee);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      customClass: "swal-wide",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Remove",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(id);
        axiosSecure.delete(`/user/${id}`).then((res) => {
          console.log(res.data);
          if (res.data.deletedCount) {
            refetch();
            toast.success("Removed Successfully");
          }
        });
      }
    });
  };

  return (
    <Container>
      <div data-aos="zoom-in">
        <div className="max-w-2xl mx-auto py-12 space-y-4">
          <h2 className="text-4xl font-semibold text-center ">
            My Employee List
          </h2>
          <p>
            My Employee List provides a comprehensive overview of our workforce,
            showcasing the talented individuals who contribute to the success of
            our organization.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  ">
          {employee?.map((user, i) => (
            <>
              <div key={i} className="card w-64 bg-base-100">
                <div className="avatar">
                  <div className="w-full rounded-full">
                    <img src={user?.image} />
                  </div>
                </div>
                <div className="card-body shadow-sm">
                  <h2 className="card-title">{user?.name}</h2>

                  <button
                    onClick={() => handleDelete(user?._id)}
                    className="btn btn-sm rounded-md  bg-[#d15454] hover:bg-[#eba43b] text-white"
                  >
                    Remove From Team{" "}
                  </button>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default MyEmployeeList;

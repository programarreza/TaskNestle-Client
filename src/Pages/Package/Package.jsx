import { Link } from "react-router-dom";
import { axiosSecure } from "../../Hooks/useAxiosSecure";
import usePackage from "../../Hooks/usePackage";
import Container from "../../components/shared/Container/Container";
// import { useState } from "react";
import Loading from "../../components/Loading/Loading";
import useAuth from "../../Hooks/useAuth";

const Package = () => {
  const { loading } = useAuth();
  const [packages] = usePackage();
//   const [singlePackage, setSinglePackage] = useState(null);

//   localStorage.setItem('data',singlePackage);

  if (loading) {
    return <Loading />;
  }

  const handleSinglePackage = async (id) => {
    console.log(id);
    await axiosSecure(`/singePackage/${id}`)
      .then((res) => {
        console.log(res.data);
        // setSinglePackage(res?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //   console.log(24, singlePackage);

  return (
    <Container>
      <div>
        <h2 className="text-4xl font-bold text-center py-12">Our Package </h2>
        <div className="grid grid-cols-3 gap-12 ">
          {packages?.map((item) => (
            <>
              <div className="card card-compact bg-base-100 shadow-xl ">
                <div className="card-body ">
                  <h2 className="card-title text-center mx-auto text-2xl border-b-2 pb-4">
                    {item?.title}
                  </h2>
                  <div className="text-xl space-y-4 font-medium  text-[#383838cc]">
                    <p>{item?.description1}</p>
                    <p>{item?.description2}</p>
                    <p>{item?.description3}</p>
                  </div>

                  <div className="card-actions justify-center">
                    <Link to={"/payment"}>
                      <button
                        onClick={() => handleSinglePackage(item?._id)}
                        className="btn  bg-[#D1A054] hover:bg-[#eba43b] text-white"
                      >
                        Subscription
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Package;

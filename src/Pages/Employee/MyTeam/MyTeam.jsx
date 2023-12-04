import useEmployee from "../../../Hooks/useEmployee";
import Loading from "../../../components/Loading/Loading";
import Container from "../../../components/shared/Container/Container";

const MyTeam = () => {
  const [employee, loading, refetch] = useEmployee();

  if (loading && !employee) {
    return <Loading />;
  }

  console.log(employee);

  return (
    <Container>
      <div>
        {/* upcomming events */}
        <div>
          <div className="max-w-2xl mx-auto py-16 space-y-4 ">
            <h2 className="text-4xl font-semibold text-center ">
              Upcoming events
            </h2>
            <p>
              My Employee List provides a comprehensive overview of our
              workforce, showcasing the talented individuals who contribute to
              the success of our organization.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {employee?.map((user) => (
              <>
                <div className="card card-compact w-96 bg-base-100 shadow-xl">
                  <figure className="w-full h-80">
                    <img
                      className="w-full h-full"
                      src={user?.image}
                      alt="image"
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">{user?.name}</h2>
                    <p>Date Of Birth: {user?.dob}</p>
                    <p>Remaining Days: Coming soon</p>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>

        {/* team member list */}
        <div>
          {" "}
          <div className=" my-24 shadow-lg rounded-2xl mx-auto p-4">
            <div className="max-w-2xl mx-auto space-y-4 p-12">
              <h2 className="text-4xl font-semibold text-center ">
                My Member List
              </h2>
              <p>
                My Employee List provides a comprehensive overview of our
                workforce, showcasing the talented individuals who contribute to
                the success of our organization.
              </p>
            </div>
            <div className="grid grid-cols-4  ">
              {employee?.map((user, i) => (
                <>
                  <div key={i} className="card w-52 bg-base-100">
                    <div className="avatar">
                      <div className="w-full rounded-full">
                        <img src={user?.image} />
                      </div>
                    </div>
                    <div className="card-body shadow-sm">
                      <h2 className="card-title">{user?.name}</h2>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default MyTeam;

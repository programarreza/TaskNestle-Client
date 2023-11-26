import { Link } from "react-router-dom";
import Container from "../shared/Container/Container";

const Packages = () => {
  return (
    <div>
      <Container>
        <h2 className="text-4xl font-bold text-center py-12">Our Package </h2>

        <div className="grid grid-cols-3 gap-12 mb-12">
          <div className="card card-compact bg-base-100 shadow-xl ">
            <div className="card-body ">
              <h2 className="card-title text-center mx-auto text-2xl border-b-2 pb-4">
                Basic Package - $5
              </h2>
              <div className="text-xl space-y-4 font-medium  text-[#383838cc]">
                <p>1. Ideal for businesses with up to 5 employees.</p>
                <p>
                  2. Comprehensive package management services to ensure smooth
                  operations
                </p>
                <p>
                  3. Affordable and tailored to meet the needs of small teams
                </p>
              </div>

              <div className="card-actions justify-center">
                <Link to={"join-admin"}>
                  <button className="btn  bg-[#D1A054] hover:bg-[#eba43b] text-white">
                    Subscription
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Standard Package */}
          <div className="card card-compact bg-base-100 shadow-xl ">
            <div className="card-body">
              <h2 className="card-title text-center mx-auto text-2xl border-b-2 pb-4">
                Standard Package - $8
              </h2>
              <div className="text-xl space-y-4 font-medium  text-[#383838cc]">
                <p>1. Perfect for businesses with up to 10 employees.</p>
                <p>2. Enhanced features for a slightly larger team.</p>
                <p>3. Priority support and additional customization options.</p>
              </div>

              <div className="card-actions justify-center">
                <Link to={"join-admin"}>
                  <button className="btn  bg-[#D1A054] hover:bg-[#eba43b] text-white">
                    Subscription
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Premium  Package */}
          <div className="card card-compact bg-base-100 shadow-xl ">
            <div className="card-body">
              <h2 className="card-title text-center mx-auto text-2xl border-b-2 pb-4">
                Premium Package - $15
              </h2>
              <div className="text-xl space-y-4 font-medium  text-[#383838cc]">
                <p>1. Tailored for businesses with up to 20 employees</p>
                <p>2. All-inclusive package management services.</p>
                <p>
                  3. Priority support, advanced customization, and dedicated
                  account management.
                </p>
              </div>

              <div className="card-actions justify-center">
                <Link to={"join-admin"}>
                  <button className="btn  bg-[#D1A054] hover:bg-[#eba43b] text-white">
                    Subscription
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Packages;

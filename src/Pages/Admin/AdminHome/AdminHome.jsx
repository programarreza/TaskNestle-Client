import Chart from "../../../components/Admin/Chart";
import LimitedStock from "../../../components/Admin/LimitedStock";
import PendingRequest from "../../../components/Admin/PendingRequest";
import TopMostRequest from "../../../components/Admin/TopMostRequest";

const AdminHome = () => {
  return (
    <div>
      <PendingRequest />
      <TopMostRequest />
      <LimitedStock />
      <Chart />
    </div>
  );
};

export default AdminHome;

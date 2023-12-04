import FrequentlyRequest from "../../../components/Employee/FrequentlyRequest";
import MyCustomRequest from "../../../components/Employee/MyCustomRequest";
import MyMonthlyRequests from "../../../components/Employee/MyMonthlyRequests";
import MyPendingRequest from "../../../components/Employee/MyPendingRequest";

const EmployeeHome = () => {
  return (
    <div>
      <MyCustomRequest />
      <MyPendingRequest />
      <FrequentlyRequest />
      <MyMonthlyRequests />
    </div>
  );
};

export default EmployeeHome;

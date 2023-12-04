import FrequentlyRequest from "../../../components/Employee/FrequentlyRequest";
import MyCustomRequest from "../../../components/Employee/MyCustomRequest";
import MyPendingRequest from "../../../components/Employee/MyPendingRequest";

const EmployeeHome = () => {
  return (
    <div>
      <MyCustomRequest />
      <MyPendingRequest />
      <FrequentlyRequest/>
    </div>
  );
};

export default EmployeeHome;

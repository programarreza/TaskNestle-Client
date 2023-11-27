import { RingLoader } from "react-spinners";

const Loading = ({ smHeight }) => {
  return (
    <div
      className={` ${smHeight ? "h-[250px]" : "h-[100vh]"}
      flex 
      flex-col 
      justify-center 
      items-center `}
    >
      <RingLoader size={60} color="#D1A054" />
    </div>
  );
};

export default Loading;

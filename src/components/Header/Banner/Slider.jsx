import { Link } from "react-router-dom";

const Slider = ({ heading, subHeading, label, path, image }) => {
  return (
    <div>
      <div className="carousel w-full">
        <div className="carousel-item relative w-full">
          <img
            src={image}
            className="w-full h-[90vh] rounded-xl"
          />
          <div className="absolute  flex items-center h-full left-0 right-0 bottom-0  ">
           
            <div className="text-white space-y-7 pl-12 md:w-1/3">
              <h2 className="text-2xl lg:text-4xl font-bold">{heading}</h2>
              <p>{subHeading}</p>
              <div>
                <Link to={path}>
                  <button className="btn border-none opacity-80 hover:opacity-100  bg-gradient-to-r from-[#D32053] to-[#460BC6] text-white">
                    {label}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;

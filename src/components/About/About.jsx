import Container from "../shared/Container/Container";

const About = () => {
  
  return (
    <div className="mb-12 ">
      <Container>
        <div className="lg:flex shadow-lg border-t-2 rounded-xl" >
          <div className="lg:w-1/2">
            <img
            className="w-full h-full"
              src="https://i.postimg.cc/NM3BxFmT/kate-sade-2z-Zp12-Chxh-U-unsplash.jpg"
              alt=""
            />
          </div>

          <div className="p-2 lg:w-1/2 md:p-12 pr-0 "  data-aos="fade-right">
            <h4 className="uppercase text-xl">innovative business </h4>
            <h2 className="text-5xl font-bold my-3">About Us</h2>
            <p className="text-xl pt-2">
              Effortlessly manage tasks, streamline collaboration, and boost
              productivity with [Website Name]. Our user-friendly platform
              offers customizable workflows, real-time updates, and secure
              mobile access. Perfect for businesses, organizations, and
              individuals seeking efficient assist management
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default About;

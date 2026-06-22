import "./about.css";
import useScrollAnimation from "./useScrollAnimation.tsx";
import "./global.css";

function About() {
  useScrollAnimation();
  return (
    <section
      id="about"
      className="scroll-hidden pt-30 min-h-screen w-full  lg:flex-col flex flex-row justify-between items-center pl-10 nope "
    >
      <div className="about flex sm:flex-col lg:flex-row ">
        <div className="leftside lg:pt-10 ">
          <h2 className="text-3xl font-bold mb-4 text-[#ece6f9]">About</h2>
          <p className="max-w-2xl text-5xl font-bold ">
            Where Web Meets Intelligence
          </p>
          <p className="text1 mt-7 text-2xl font-semibold sm:w-180  text-[#f1edfb]">
            I combine the creativity of web development with the rigor of AI
            engineering. From crafting sleek, responsive interfaces to building
            agentic AI systems and advanced automation, my mission is to create
            technology that is both functional and inspiring.
          </p>
          <div className="cont101 flex flex-col gap-3 mt-10 mb-10">
            <p className="p1">
              <img
                className="img "
                src="/ai.png"
              ></img>
              Scalable AI application Development
            </p>
            <p className="p1  ">
              <img
                className="img "
                src="/ml.png"
              ></img>
              Machine Learning & Computer Vision
            </p>
            <p className="p1   ">
              <img
                className="img p-2"
                src="/web.png"
              ></img>
              Responsive & Creative Web Development
            </p>
            <p className="p1 relative">
              <img
                className="img"
                src="/edu.png"
              ></img>

              Bachelors in Computer Science
            </p>
          </div>
        </div>
        <div className="maincard rounded-4xl p-5 flex justify-center items-center lg:ml-20 ">
          <div className="card relative flex bg-[#f1edfb] lg:mt-10  border-3 border-[#3d315c] rounded-4xl  shadow-gray-500 shadow-md  h-130 w-100">
            <div className=" pr-9">
              <div className="absolute z-51 bg-white right-4 top-3 bg-gray text-black font-bold border-2 border-white  shadow-sm shadow-gray-700 rounded-2xl px-3">
                Web Dev & AI
              </div>
            </div>
            <div className=" text-black mx-auto ">
              <img
                src="https://i.pinimg.com/1200x/60/71/ea/6071ea85096c89b9dafddf26403c84c7.jpg"
                className=" rounded-t-4xl right-[0px] absolute "
              />
            </div>
            <div className="absolute top-12 left-5 text-black font-bold mt-90 ">
              <p className="text-3xl text-[#2f2741]">Sahil Alam</p>
              <p className="mb-2 text-md font-semibold text-[#2f2741]">
                Computer Science Student
              </p>
              <p className="font-semibold text-[#2f2741]">
                Graphic Era Deemed To Be University
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;

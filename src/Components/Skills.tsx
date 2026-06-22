import "./skills.css";
import useScrollAnimation from "./useScrollAnimation";
import "./global.css";

function Skills() {
  useScrollAnimation();
  return (
    <section
      id="skills"
      className="scroll-hidden main min-h-screen flex flex-col  mt-30 mb-30 sm:pl-10"
    >
      <div className="">
        <div className="mt-35 sm:mr-10">
          <h2 className="text-5xl font-bold md:pl-3 w-3/5 sm:w-2/5 xl:w-2/12 border pt-4 px-3 rounded-xl pb-5 border-[#a892cd] bg-[#5d487f] ml-3">
            My Skills
          </h2>

          <p className="font-semibold md:w-2/5 bg-white opacity-80 shadow-2xl ml-3 mt-5 text-2xl text-[#3f3457] p-3 rounded-lg ">
            Core technologies and frameworks I work with:
          </p>
        </div>
        <div
          className="flex lg:flex-row flex-col 
        lg:gap-10 mt-10 sm:mr-10 lg:mr-15"
        >
          <div className="container">
            <ul className="mt-4 font-semibold">
              <h1 className="text-3xl items-center font-semibold border-2 py-2 px-3 rounded-xl flex border-[#a892cd] bg-[#5d487f]">
                <img
                  className="w-15 ml-[-10px] m-[-3px] "
                  src="/web1.png"
                  alt="Web Development"
                />
                Frontend
              </h1>

              <li>HTML, CSS, JavaScript</li>
              <li>React, TypeScript, Tailwind, MUI</li>
              <li>Redux & Next.js</li>
            </ul>
          </div>
          <div className="container">
            <ul className="mt-4 font-semibold">
              <h1 className="flex items-center text-3xl font-semibold border-2 py-2 px-3 rounded-xl border-[#a892cd] bg-[#5d487f]">
                <img
                  className="w-7 h-7 mr-2"
                  src="/backend.png"
                  alt="Web Development"
                />
                Backend
              </h1>
              <li>Node.js & Express.js</li>
              <li>Mongoose, JWT</li>
              <li>MongoDB, FireBase</li>
            </ul>
          </div>
          <div className="container">
            <ul className="mt-4  font-semibold">
              <h1
                className="flex items-center text-3xl font-semibold 
              border-2 py-2 px-3 rounded-xl
               border-[#a892cd] bg-[#5d487f]"
              >
                <img
                  className="w-10 h-10 mr-2"
                  src="/ml1.png"
                  alt="Web Development"
                />
                Machine Learning
              </h1>
              <li>Python, Pandas, NumPy</li>
              <li>TensorFlow & Scikit-learn</li>
              <li>PyTorch & Flask</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;

import "./home.css";
import useScrollAnimation from "./useScrollAnimation.tsx";
import { useState } from "react";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

function Contact() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const submithandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formElement = e.currentTarget;
    const formData = new FormData(formElement);
    setForm({
      ...form,
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    });
    alert(`Form submitted: ${formData.get("name")}`);
  };
  useScrollAnimation();

  return (
    <section id="contact" className="scroll-hidden min-h-screen pt-30 ">
      <div className="text-center">
        <h2 className="text-5xl font-bold">Get in Touch</h2>
        <p className="mt-4 text-xl font-medium text-[#dcd3f1]">
          Have a project in mind or want to collaborate?
        </p>
        <p className="mt-2 text-xl font-semibold">Let's connect!</p>
      </div>
      <div className="flex flex-col xl:w- mt-5 sm:p-4  xl:px-80 xl:flex-row items-center justify-center">
        <div className="mt-[60px] xl:-mt-[-15px] xl:w-2/4 sm:px-20 md:px-42 xl:px-0 pb-5">
          <p className=" text-xl p-5 md:mt-[-90px] font-semibold text-[#dcd3f1]">
            I'm always excited to discuss new opportunities, AI research
            collaborations, or interesting ideas.Feel free to reach out throuugh
            any of the channels below.
          </p>
          <div className="flex flex-col gap-2 m-4 text-[#3f3457] text-xl font-bold">
            <a
              href="https://github.com/Sahilgeu123"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div
                className="flex items-center bg-zinc-300 w-full p-5 rounded-2xl
                 border-2 border-[#786796]
              hover:bg-white transition-colors duration-300 ease-in-out"
              >
                <img
                  className="w-8 h-8 inline-block mr-2 rounded-full"
                  src="/git.jpg"
                  alt="GitHub"
                />
                GitHub
              </div>
            </a>

            <a
              href="https://www.linkedin.com/in/sahil-alam-456816294/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div
                className="flex items-center bg-zinc-300 w-full p-5 rounded-2xl
                 border-2 border-[#786796]
              hover:bg-white transition-colors duration-300 ease-in-out"
              >
                <img
                  className="w-8 h-8 inline-block mr-2 rounded-full"
                  src="/in.jpg"
                  alt="LinkedIn"
                />
                LinkedIn
              </div>
            </a>

            <a
              href="mailto:sahilalam3d@example.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div
                className="flex items-center bg-zinc-300 w-full p-5 rounded-2xl
                 border-2 border-[#786796]
              hover:bg-white transition-colors duration-300 ease-in-out"
              >
                <img
                  className="w-8 h-8  inline-block mr-2 rounded-full"
                  src="/email.jpg"
                  alt="Email"
                />
                Email
              </div>
            </a>
          </div>
        </div>
        <form
          onSubmit={(e) => {
            submithandler(e);
          }}
          className=" my-10 sm:m-0 form pt-11 space-y-4 px-4 py-4 shadow-[0_10px_20px_rgba(0,0,0,0.2)] shadow-3xl
          border-3 border-[#8f87a3] rounded-4xl bg-[#1c142a]
          flex flex-col w-md md:w-2/3"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="w-full">
              <p className="text-xl font-semibold text-[#dcd3f1] ml-1 mb-3">Name</p>
              <input
                className="p-2 border-2 border-[#8f87a3] rounded-xl focus:outline-none focus:ring-2 w-full"
                type="text"
                placeholder="Your Name"
                name="name"
              />
            </div>
            <div className="w-full">
              <p className="text-xl font-semibold text-[#dcd3f1] ml-1 mb-3">Email</p>
              <input
                className="p-2 border-2 border-[#8f87a3] rounded-xl w-full focus:outline-none focus:ring-2 "
                type="email"
                placeholder="Your Email"
                name="email"
              />
            </div>
          </div>
          <p className="text-xl font-semibold text-[#dcd3f1] ml-1 mb-3">Subject</p>
          <input
            className="p-2 border-2 border-[#8f87a3] rounded-xl focus:outline-none focus:ring-2 "
            type="text"
            placeholder="Subject"
            name="subject"
          />
          <p className="text-xl font-semibold text-[#dcd3f1] ml-1">Message</p>
          <textarea
            className="p-2 border-2 border-[#8f87a3] h-32 rounded-xl focus:outline-none focus:ring-2 "
            placeholder="Your Message"
            name="message"
          ></textarea>
          <button
            className="hover:scale-95 transition-transform duration-700 bg-[#1c142a] hover:bg-[#382e4f] "
            type="submit"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}

export default Contact;

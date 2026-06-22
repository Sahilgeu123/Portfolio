
const Footer = () => {
  return (
    <div
      className="sm:px-30 xl:px-60 md:h-25 border-t-2 border-[#8f87a3] scroll-hidden
     flex flex-col md:flex-row md:justify-between 
     items-center bg-[#1c142a] text-white p-4 opacity-50"
    >
      <div className="text-center md:text-left text-[#e6dff6]">
        <p className="text-xl font-bold ">SA</p>
        <p>©2026 Sahil Alam. All rights reserved.</p>
      </div>
      <div className="p-2 rounded-md  flex space-x-4">
        <a
          href="https://www.linkedin.com/in/sahil-alam-456816294/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className="opa rounded-full p-1 bg-black w-8"
            src="https://i.pinimg.com/736x/ae/e6/d4/aee6d4bd48fd5449e0fb71ae59297ebc.jpg"
            alt="linkedin"
          />
        </a>

        <a
          href="https://github.com/Sahilgeu123"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className="opa w-8 p-1 bg-black rounded-full"
            src="https://i.pinimg.com/736x/64/88/0b/64880b9b0fe5b53bbe3f7280d262b33f.jpg"
            alt="github"
          />
        </a>
        <a
          href="mailto:sahilalam3d@example.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className="opa w-8 p-1 bg-black rounded-full"
            src="https://i.pinimg.com/736x/14/37/e2/1437e20410b83de7ea06d9ba3c6560f1.jpg"
            alt="email"
          />
        </a>
      </div>
    </div>
  );
};

export default Footer;

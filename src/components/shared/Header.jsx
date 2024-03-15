import { CgClose } from "react-icons/cg";
const Header = ({ title, text, onClick }) => {
  return (
    <div className="welcomeHeader flex flex-col-reverse md:flex-row justify-between p-4 md:p-8 bg-teal-700 text-white rounded-lg ">
      <div className="w-full md:w-4/5">
        <h1 className="text-lg font-bold -mt-4 md:mt-0">{title}</h1>
        <p className="mt-3">{text}</p>
      </div>
      <div className="flex justify-end md:block">
        <button
          onClick={onClick}
          className="w-10 h-10 bg-teal-800 flex items-center justify-center rounded-full text-xl "
        >
          <CgClose />
        </button>
      </div>
    </div>
  );
};

export default Header;

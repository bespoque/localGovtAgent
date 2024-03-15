import AgentSignupForm from "../../components/Form/AgentSignup";
import DownloadReceipt from "../../components/Form/DownloadReceipt";
import { LoginImage } from "../../components/Images/Images";
const DownloadReceiptPage = () => {
  return (
    <div className="w-full">
      {/* <h1>Agent Signup</h1> */}
      <div className="h-full flex justify-center w-full">
        <div className="flex justify-center items-center w-full md:px-2 ">
          {/* <div className="hidden md:hidden lg:flex justify-center  lg:w-1/2 md:w-2/5 ">
            <LoginImage />
          </div> */}

          <div className="w-full flex items-center justify-center md:w-full pb-14">
            <div className=" w-full">
              <DownloadReceipt />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadReceiptPage;

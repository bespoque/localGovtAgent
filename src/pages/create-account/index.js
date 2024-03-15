import { TokenModals, TokenModalsOverlay } from "../../components/modals/Modal";
import { CreateABSSINImage } from "../../components/Images/Images";
import CreateAbssin from "../../components/Form/CreateAbssin";

const Index = () => {
  return (
    <div className="w-full">
      <TokenModalsOverlay>
        <TokenModals />
      </TokenModalsOverlay>

      <div className="flex justify-center w-full ">
        <div className="flex justify-between  w-full lg:px-8 md:px-2">
          {/* <div className="hidden md:hidden lg:flex justify-center lg:w-1/2">
            <CreateABSSINImage />
          </div> */}

          <div className="flex items-center justify-center md:w-full ">
            <div className="px-2 w-96 bg-white shadow-xl py-6 md:py-10 rounded-xl">
              <CreateAbssin />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

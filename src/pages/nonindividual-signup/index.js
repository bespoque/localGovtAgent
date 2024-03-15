import { TokenModals,TokenModalsOverlay } from "../../components/modals/Modal";
import CorporateSignUpForm from "../../components/Form/corporateSignUp";
import { SignUpImage } from "../../components/Images/Images";
const Index = () => {
    return ( 
        <div className="w-full">
        <TokenModalsOverlay>
          <TokenModals />
        </TokenModalsOverlay>
  
        <div className="flex justify-center w-full">
          <div className="flex justify-between mx-auto  w-full lg:px-8 md:px-2">
            {/* <div className="hidden md:hidden lg:flex justify-center lg:w-1/2">
              <SignUpImage />
            </div> */}
  
            <div className="bg-white shadow-xl flex items-center justify-center md:w-full py-6 md:py-10 rounded-xl">
              <div className=" w-96">
                <CorporateSignUpForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    
};
 
export default Index;
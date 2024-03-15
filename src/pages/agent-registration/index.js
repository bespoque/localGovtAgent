import AbssinRegistration from "../../components/Form/abssinRegistration";
import { TokenModals, TokenModalsOverlay } from "../../components/modals/Modal";
import { EmailVerification } from "../../components/Images/Images";
import Link from "next/link.js";

const Index = () => {
    return ( 
        <div className="w-full">
        <TokenModalsOverlay>
          <TokenModals />
        </TokenModalsOverlay>
  
        <div className="flex justify-center w-full">
        <div className="flex justify-between mx-auto  w-full lg:px-8 md:px-2 ">
          <div className="bg-white shadow-xl flex items-center justify-center md:w-full py-6 md:py-10 rounded-xl ">
            <div className="w-96 ">
              <AbssinRegistration />
              {/* <div className="flex flex-col items-center justify-between mt-2">
                <div className="text-xs mt-1 bg-gray-100 w-full py-6 mt-3 text-center">
                  <p>
                    Already have an account?
                    <Link legacyBehavior href="/login">
                      <a className="text-teal-600 font-bold"> Log in</a>
                    </Link>
                  </p>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      </div>
     );
}
 
export default Index;
import SignUpForm from '../../components/Form/SignUpForm';
import { TokenModals, TokenModalsOverlay } from '../../components/modals/Modal';
import Link from "next/link.js";
const Login = () => {
  return (
    <div className="w-full">
      <TokenModalsOverlay>
        <TokenModals />
      </TokenModalsOverlay>

      <div className="flex justify-center w-full">
        <div className="flex justify-between mx-auto  w-full lg:px-4 md:px-2 ">
          <div className="bg-white shadow-xl flex items-center justify-center md:w-full py-6 md:py-10 rounded-xl">
            <div className="w-96">
              <SignUpForm />
              <div className="flex flex-col items-center justify-between mt-2">
                <div className="text-xs mt-1 bg-gray-100 w-full py-6 text-center">
                  <p>
                    Already have an account?
                    <Link legacyBehavior href="/login">
                      <a className="text-teal-600 font-bold"> Log in </a>
                    </Link>
                  </p>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

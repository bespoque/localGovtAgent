import ForgotPasswordForm from '../../components/Form/ForgotPassword';
import Link from "next/link.js";
const Index = () => {
  return (
    <div className="w-full">
      <div className="flex justify-center w-full items-center">
        <div className="flex justify-center items-center mx-auto w-full">
          <div className="bg-white shadow-xl flex items-center justify-center  py-6 md:py-10 rounded-xl">
            <div className="w-96">
              <ForgotPasswordForm />
              <div className="flex flex-col items-center justify-between mt-2">
                <div className="text-xs mt-1 bg-gray-100 w-full py-6 mt-3 text-center">
                  <p>
                    Already have an account?
                    <Link legacyBehavior href="/login">
                      <a className="text-teal-600 font-bold"> Log in</a>
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

export default Index;

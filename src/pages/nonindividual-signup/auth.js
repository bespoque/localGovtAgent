import NonIndividualAuthForm from "../../components/Form/NonIndividualAuthForm";
import { CompleteSignUpImage } from "../../components/Images/Images";

const Index = () => {
  return (
    <div className="w-full">
      <div className="h-full flex justify-center w-full bg-white">
        <div className="flex justify-between  w-full  lg:px-8 md:px-6">
          <div className="lg:w-1/2  md:w-2/5 hidden md:hidden lg:flex justify-center">
            <div>
              <CompleteSignUpImage />
              <div className="text-justify">
                <h1 className="text-base font-semibold">
                  DATA <span className="font-normal">PROTECTION</span>
                </h1>
                <p>
                  For data security/safety, provide the 6 digit token sent to
                  <br></br>
                  the registered number and email on the ILIDNumber used.
                </p>
              </div>
            </div>
          </div>

          <div className="w-full flex items-center justify-center lg:w-1/2 md:w-full pb-14">
            <div className="px-2 w-96">
              <NonIndividualAuthForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

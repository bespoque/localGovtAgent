import Header from "../../components/Header/header";
import Footer from "../../components/landing/Footer";
const Layout2 = ({ children }) => {
  return (
    <>
      {/* <div className="onboarding flex flex-col justify-between h-screen w-full"> */}
      {/* <div className="onboarding flex flex-col w-full"> */}
      <div className="bg-gray-100 flex flex-col justify-between w-full min-h-screen">
        {/* <div className=""></div> */}

        <div data-layout="" className="my-10 space-y-4 mx-auto">
          <Header />
          <section>{children}</section>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Layout2;

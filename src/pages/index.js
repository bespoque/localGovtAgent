// import React, { useRef} from 'react';
// import Nav from '../components/landing/Nav';
// import Home from '../components/landing/Home';
// import Service from '../components/landing/Services';
// import Resources from '../components/landing/Resources';
// import Footer from '../components/landing/Footer';
// import { ToastContainer } from "react-toastify";
// import TawkMessengerReact from "@tawk.to/tawk-messenger-react";
// import 'react-toastify/dist/ReactToastify.css';
// const Landing = () => {
//   const tawkMessengerRef = useRef();

//   const handleMinimize = () => {
//     tawkMessengerRef.current.minimize();
//   }
//   return (
//     <div>
//       <Nav/>
//       <Home />
//       <Service/>
//       <Resources />
//       <Footer />
//       <ToastContainer/>
//       <button onClick={handleMinimize}></button>
//       <TawkMessengerReact
//         propertyId="6505e36c0f2b18434fd8e5af"
//         widgetId="1hafg0og9"
//         ref={tawkMessengerRef}
//       />
//     </div>
//   )
// }

// export default Landing

import React, { useRef, useEffect } from "react";
import Nav from "../components/landing/Nav";
import Home from "../components/landing/Home";
import Service from "../components/landing/Services";
import Resources from "../components/landing/Resources";
import Footer from "../components/landing/Footer";
import TawkMessengerReact from "@tawk.to/tawk-messenger-react";
import url from "../config/url";
const Landing = () => {
  const tawkMessengerRef = useRef();

  const handleMinimize = () => {
    tawkMessengerRef.current.minimize();
  };

  return (
    <div>
      <Nav />
      <Home />
      <Service />
      {/* <Resources /> */}
      <Footer />
      <button onClick={handleMinimize}></button>
      <TawkMessengerReact
        propertyId="6505e36c0f2b18434fd8e5af"
        widgetId="1hafg0og9"
        ref={tawkMessengerRef}
      />
    </div>
  );
};

export default Landing;
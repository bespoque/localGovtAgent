import { useRouter } from "next/router";
import Centered from "./centered";
import Empty from "./empty";
import Layout1 from "./layout-1";
import Layout2 from "./layout-2";
const Layouts = ({ children }) => {
  const router = useRouter();
  let { pathname } = { ...router };
  if (["/404", "/500"].includes(pathname)) {
    return <Centered>{children}</Centered>;
  }
  if (
    [
      "/login-1",
      "/contact-us-1",
      
      "/email-confirmation",
      "/logout",
      "/reset-password",
      "/reset-password/update",
      "/print-tcc/[ref]",
      "/forgot-password",
      "/lock-screen",
      "/subscribe",
      "/error-page",
      "/coming-soon",
    ].includes(pathname)
  ) {
    return <Centered>{children}</Centered>;
  } else if (
    [
      "/",
      "/landing",
      "/login-1",
      "/faqs",
      "/view/paye-tcc/[ref]",
      "/collection-receipt",
      "/login-2",
      "/login-3",
    ].includes(pathname)
  ) {
    return <Empty>{children}</Empty>;
  } else if (
    [
      // "/",

      "/login",
      "/signup",
      "/create-account",
      "/signup/auth",
      "/create-account",
      "/agent-signup",
      "/download-slip",
      "/agent-registration",
      "/agent-signup-receipt",
      "/userDetails",
      "/instant-payment",
      "/reset-password",
      "/instant-payment-status/[ref]",
      "/abssin-registration",
      "/signup-no-id",
      "/corporate-registration",
      "/nonindividual-signup",
      "/nonindividual-signup/auth",
      "/termsandconditions",
      "/privacy-policy",
      "/blog-page",
    ].includes(pathname)
  ) {
    return <Layout2>{children}</Layout2>;
  } else {
    return <Layout1>{children}</Layout1>;
  }
};

export default Layouts;

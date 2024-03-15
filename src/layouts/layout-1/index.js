import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import Navbar1 from "../../components/navbar-1";
import LeftSidebar1 from "../../components/left-sidebar-1";
import RightSidebar1 from "../../components/right-sidebar-1";
import jwt from "jsonwebtoken";
import { logout } from "../../redux/authentication/auth.actions";
import { AuthSpinner } from "../../components/spiner/index";
import DashboardFooter from "../../components/landing/dashboardFooter";

const Layout1 = ({ children }) => {
  const dispatch = useDispatch();
  const [authorizedRoute, setAuthorizedRoute] = useState(false);
  const { config, palettes, auth } = useSelector(
    (state) => ({
      config: state.config,
      palettes: state.palettes,
      auth: state.authentication.auth,
    }),
    shallowEqual
  );
  const { layout, collapsed } = { ...config };
  let { background, navbar, leftSidebar, rightSidebar } = {
    ...palettes,
  };
  const router = useRouter();
  let { pathname } = { ...router };

  useEffect(() => {
    if (!auth) {
      router.push("/");
    }
    const decoded = jwt.decode(auth);
    const currentTime = Date.now() / 1000;
    if (decoded?.exp < currentTime) {
      alert("Session Timeout! Please log in again");
      router.reload();
      dispatch(logout());
      router.push("/");
    }

    if (
      [
        "/uploads",
        "/uploads/annual",
        "/uploads/monthly",
        "/uploads/withholding",
        "/view",
        "/wallet",
        "/view/annual/[ref]",
        "/view/annual/docs/[ref]",
        "/view/monthly",
        "/view/withholding",
        "/file-annual-returns",
        "/list-annual-returns",
        "/uploads/annual/csv/[ref]",
        "/uploads/annual/supporting-doc/[ref]",
      ].includes(pathname) &&
      decoded?.type === "Individual"
    ) {
      router.push("/dashboard");
    } else {
      setAuthorizedRoute(true);
    }
  }, [pathname, auth]);
  return (
    <>
      {!auth ? (
        <AuthSpinner />
      ) : !authorizedRoute ? (
        <AuthSpinner />
      ) : (
        <>
          <Head>
            <title>IBEJU-LEKKI IRS</title>
          </Head>
          <div
            data-layout={layout}
            data-collapsed={collapsed}
            data-background={background}
            data-navbar={navbar}
            data-left-sidebar={leftSidebar}
            data-right-sidebar={rightSidebar}
            className={`font-sans antialiased text-sm disable-scrollbars ${
              background === "dark" ? "dark" : ""
            }`}
          >
            <div className="wrapper">
              <LeftSidebar1 />
              <div className="main w-full bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white">
                <Navbar1 />
                <div className="min-h-screen w-full p-4">{children}</div>
                <DashboardFooter/>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default Layout1;

{/* <aside className="h-screen bg-slate-200"> */}

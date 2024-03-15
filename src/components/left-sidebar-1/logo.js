import { RiMenuUnfoldLine } from "react-icons/ri";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import Link from "next/link";
import { ABirsLogoHead, KgirsLogo, AbiaPayLogoHead} from "../Images/Images";

const Logo = () => {
  const dispatch = useDispatch();
  const { config, leftSidebar } = useSelector(
    (state) => ({
      config: state.config,
      leftSidebar: state.leftSidebar,
    }),
    shallowEqual
  );
  const { name, collapsed } = { ...config };
  const { showLogo } = { ...leftSidebar };
  if (showLogo) {
    return (
      <div className="logo truncate">
        <Link legacyBehavior href="/">
          <a className="flex flex-row items-center justify-start ">
            {/* <KgirsLogo size={28} /> */}
            {/* <AbiaPayLogoHead /> */}
            {/* <span className="text-green-600">{name}</span> */}
          </a>
        </Link>
        <button
          onClick={() =>
            dispatch({
              type: "SET_CONFIG_KEY",
              key: "collapsed",
              value: !collapsed,
            })
          }
          className="ml-auto mr-4 block lg:hidden"
        >
          <RiMenuUnfoldLine size={25} className="text-white" />
        </button>
      </div>
    );
  }
  return null;
};

export default Logo;

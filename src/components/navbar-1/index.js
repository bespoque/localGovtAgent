import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { RiMenuFoldLine } from "react-icons/ri";
import { RxCopy } from "react-icons/rx";
import Dropdown5 from "./dropdown-5";
import Dropdownmsg from "./dropdown-msg";
import { login } from "../../redux/authentication/auth.actions";

const Navbar = () => {
  const ABSSIN_number = localStorage.getItem("ABSSIN_number");
  // console.log(ABSSIN_number, "ILIDNumber");
  const textToCopy = JSON.parse(ABSSIN_number);
  const [isCopied, setIsCopied] = useState(false);
  const [copiedText, setCopiedText] = useState(textToCopy);
  const [state, setState] = useState({
    isUploading: false,
  });

  const copyToClipboard = () => {
    const textarea = document.createElement("textarea");
    textarea.value = textToCopy;

    document.body.appendChild(textarea);

    textarea.select();
    textarea.setSelectionRange(0, 99999);

    document.execCommand("copy");

    document.body.removeChild(textarea);

    setIsCopied(true);
    setCopiedText(textToCopy);

    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  const { config } = useSelector(
    (state) => ({
      config: state.config,
    }),
    shallowEqual
  );
  let { rightSidebar, collapsed } = { ...config };
  const dispatch = useDispatch();

  return (
    <div className="navbar navbar-1 border-b ">
      <div className="navbar-inner w-full flex items-center justify-start">
        <button
          onClick={() =>
            dispatch({
              type: "SET_CONFIG_KEY",
              key: "collapsed",
              value: !collapsed,
            })
          }
          className="mx-4"
        >
          <RiMenuFoldLine size={25} />
        </button>

        <span className="ml-auto"></span>
        <div
          onClick={copyToClipboard}
          className={`flex items-center space-x-2 border px-2 py-1 rounded-md ${
            isCopied ? "bg-green-50" : "bg-gray-50"
          } cursor-pointer transition-all`}
        >
          <p>
            {" "}
            ILIDNumber:{" "}
            <span className="font-bold">
              {isCopied ? "COPIED!" : copiedText}
            </span>
          </p>
          <RxCopy className="text-gray-500" />
        </div>
        <Dropdownmsg />
        <Dropdown5 />
        <button
          className="btn-transparent flex items-center justify-center h-16 w-4 mx-0 md:w-8 md:mx-4"
          onClick={() =>
            dispatch({
              type: "SET_CONFIG_KEY",
              key: "rightSidebar",
              value: !rightSidebar,
            })
          }
        ></button>
      </div>
    </div>
  );
};

export default Navbar;

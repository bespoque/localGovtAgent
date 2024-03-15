import React, { useState } from "react";
import { FiStar } from "react-icons/fi";

export const BtnGroup = ({ tabs, type = null, title }) => {
  const [openTab, setOpenTab] = useState(0);
  const items = [
    {
      title: "First",
      onClick: () => {
        setOpenTab(0);
      },
    },
    {
      title: "Second",
      onClick: () => {
        setOpenTab(1);
      },
    },
    {
      title: "Third",
      onClick: () => {
        setOpenTab(2);
      },
    },
  ];
  return (
    <div className="flex flex-wrap items-center justify-start btn-group">
      {items.map((item, i) => (
        <button
          key={i}
          onClick={item.onClick}
          className={`btn btn-default btn-outlined bg-transparent ${
            i === openTab
              ? "text-teal-500 hover:text-teal-700 border-teal-500 hover:border-teal-700"
              : "text-teal-500 hover:text-teal-700 border-teal-500 hover:border-teal-700"
          }`}
        >
          {title}
        </button>
      ))}
    </div>
  );
};

export const BtnCircle = ({ tabs, type = null }) => {
  const [openTab, setOpenTab] = useState(0);
  const items = [
    {
      title: "First",
      icon: <FiStar className="stroke-current stroke-1" size={18} />,
      onClick: () => {
        setOpenTab(0);
      },
    },
    {
      title: "Second",
      icon: <FiStar className="stroke-current stroke-1" size={18} />,
      onClick: () => {
        setOpenTab(1);
      },
    },
  ];
  return (
    <div className="flex flex-wrap items-center justify-start space-x-2">
      {items.map((item, i) => (
        <button
          key={i}
          onClick={item.onClick}
          className={`btn btn-circle ${
            i === openTab
              ? "bg-teal-500 hover:bg-teal-600 text-white"
              : "bg-transparent hover:bg-gray-50 text-gray-900"
          } `}
        >
          {item.icon}
        </button>
      ))}
    </div>
  );
};

export const BtnRounded = ({ tabs, type = null }) => {
  const [openTab, setOpenTab] = useState(0);
  const items = [
    {
      title: "First",
      icon: <FiStar className="stroke-current stroke-2" size={14} />,
      onClick: () => {
        setOpenTab(0);
      },
    },
    {
      title: "Second",
      icon: <FiStar className="stroke-current stroke-2" size={14} />,
      onClick: () => {
        setOpenTab(1);
      },
    },
  ];
  return (
    <div className="flex flex-wrap items-center justify-start space-x-2">
      {items.map((item, i) => (
        <button
          key={i}
          onClick={item.onClick}
          className={`btn btn-default btn-rounded btn-outlined btn-icon ${
            i === openTab
              ? "bg-transparent text-teal-500 hover:text-teal-700 border-teal-500 hover:border-teal-700"
              : "bg-transparent text-teal-500 hover:text-teal-700 border-teal-500 hover:border-teal-700"
          } `}
        >
          <span className="mr-2">{item.title}</span>
          {item.icon}
        </button>
      ))}
    </div>
  );
};

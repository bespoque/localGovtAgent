import { BsArrowRightShort } from "react-icons/bs";
import Link from "next/link";

const Section = ({ title, description, right, action, href = null, children }) => {
  return (
    <div className="w-full p-4 rounded-lg bg-white border border-gray-100 dark:bg-gray-900 dark:border-gray-800">
      <div className="flex flex-row items-center justify-between mb-6">
        <div className="flex flex-col">
          <div className="text-sm font-bold text-gray-900 uppercase">{title}</div>
          <div className="text-sm font-bold">{description}</div>
        </div>
        {action && (
          <Link href={href} className="font-bold text-teal-600 flex items-center space-x-3 cursor-pointer">
            <span className="hidden md:block">{action}</span>{" "}
            <BsArrowRightShort className="w-6 h-6" />
          </Link>
        )}
        {right}
      </div>
      {children}
    </div>
  );
};

export default Section;

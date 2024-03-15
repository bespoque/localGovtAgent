const Widget1 = ({ title, description, color, right = null }) => {
  return (
    <div
      className={`widget cursor-pointer w-full p-4 rounded-xl bg-white border border-${color}-400 bg-${color}-100 hover:border-2 hover:shadow-lg`}
    >
      <div className="flex flex-row items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className=" animate-pulse">
            {right}
          </div>
          
          <div className="text-xs font-medium text-gray-500 md:text-sm">
            {title}
          </div>
        </div>
        <div className="text-lg md:text-xl font-bold text-gray-900">{description}</div>
      </div>
    </div>
  );
};

export default Widget1;

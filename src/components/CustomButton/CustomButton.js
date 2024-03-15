const CustomButton = ({ children, ...props }) => {
  return (
    <button
      className={`inline-flex disabled:opacity-50 bg-emerald-600 py-2 px-6 rounded-md w-full justify-center text-white border-2 border-emerald-800 font-bold hover:text-emerald-100 hover:bg-emerald-800 hover:border-emerald-900 ${
        props.disabled && "cursor-not-allowed"
      }`}
      {...props}
    >
      {children}
    </button>
  );
};

export default CustomButton;

export const NewButton = ({ title, color, animation, icon, ...props }) => {
  return (
    <button
      {...props}
      className={`${
        animation && animation
      } btn btn-default btn-outlined  mr-4 bg-transparent text-${color}-500 hover:text-${color}-700 border-${color}-500 hover:border-${color}-700`}
    >
      <div className="flex overflow-hidden">
        <span className="animate-bounce"> {icon}</span>
        {title}
      </div>
    </button>
  );
};

export const SubmitButton = ({ children, ...props }) => {
  return (
    <button
      className={`inline-flex disabled:opacity-50 bg-emerald-500 py-2 px-6 rounded-md w-full md:w-auto justify-center text-white border-2 border-emerald-600 font-bold  hover:bg-emerald-600 hover:border-emerald-500 ${
        props.disabled && "cursor-not-allowed"
      }`}
      {...props}
    >
      {children}
    </button>
  );
};
export const ETransactButton = ({ children, ...props }) => {
  return (
    <button
      className={`inline-flex disabled:opacity-50 bg-emerald-500 py-2 px-6 rounded-md  text-white border-2 border-emerald-600 font-bold hover:text-emerald-500 hover:bg-emerald-100 hover:border-emerald-500 ${
        props.disabled && "cursor-not-allowed"
      }`}
      {...props}
    >
      {children}
    </button>
  );
};
export const RemitaButton = ({ children, ...props }) => {
  return (
    <button
      className={`inline-flex disabled:opacity-50 bg-yellow-500 py-2 px-6 rounded-md  text-white border hover:text-yellow-600 hover:bg-white hover:border-yellow-600 ${
        props.disabled && "cursor-not-allowed"
      }`}
      {...props}
    >
      {children}
    </button>
  );
};

export const DeleteButton = ({ children, ...props }) => {
  return (
    <button
      className={`inline-flex disabled:opacity-50 bg-emerald-500 py-2 px-8 rounded-md  text-white border hover:text-emerald-500 hover:bg-white hover:border-emerald-500 ${
        props.disabled && "cursor-not-allowed"
      }`}
      {...props}
    >
      {children}
    </button>
  );
};

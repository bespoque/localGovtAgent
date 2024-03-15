const Index = ({ title, subtitle, children }) => {
  return (
    <div className="flex flex-col bg-white p-4 w-full max-w-xl">
      <div className="flex flex-col items-center text-center w-full mb-4">
        <div className="text-lg font-bold uppercase">{subtitle}</div>
        <div className="text-xs text-gray-500">{title}</div>
        
      </div>
      {children}
    </div>
  );
};

export default Index;

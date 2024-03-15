import React, { useState, useEffect } from 'react'


const PopupAlert = ({ message, type, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const timeout = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 3000); // Display the alert for 3 seconds

    return () => clearTimeout(timeout);
  }, [message, onClose]);

  return (
    <>
    
    <div className="fixed top-0 left-0 bottom-0 w-screen bg-black/[0.2] flex items-center justify-center">
          <div className="bg-white max-w-[27.25rem] mx-4 md:mx-0 w-full h-72 rounded-md py-12 px-4 lg:px-10 text-center">
            {/* <img src={success} className="mx-auto" alt="success" /> */}
            <h6 className="text-lightPurple font-bold mt-3 mb-1">
              Downloaded Successfully
            </h6>
            <div className="mt-4 space-x-4 flex justify-center">
              <button
                className="py-3.5 px-7 text-primaryy border border-primaryy rounded-md text-sm"
                onClose={handleCloseAlert}
              >
                OK
              </button>
            </div>
          </div>
        </div>
    </>



  );
};

export default PopupAlert;

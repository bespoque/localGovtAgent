import React from 'react';


const Index = () => {
  return (
    <div className="">
       <header className="bg-red-500 py-4">
      <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>

      </div>
    </header>
      <div className="container mx-auto py-8">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="prose">
            <h4 className=''>1. Introduction</h4>
            <p className='mb-4'>
              Welcome to our website. These terms and conditions outline the rules and regulations for the use of our website.
            </p>

            <h4>2. Interpretation and Definitions</h4>
            <p className='mb-4'> 
              The following terminology applies to these Terms and Conditions: "You" and "Your" refers to you, the person accessing this website and accepting the Company's terms and conditions. "The Company," "Ourselves," "We," "Our," and "Us" refer to our Company.
            </p>

            <h4 >3. Use of the Website</h4>
            <p className='mb-4'>
              By accessing this website, you are agreeing to be bound by these website terms and conditions. You agree that you will not use this website for any purpose that is unlawful or prohibited by these terms and conditions.
            </p>

            <h4>4. Privacy Policy</h4>
            <p className='mb-4'>
              Your use of this website is also governed by our Privacy Policy. Please review our Privacy Policy for information on how we collect, use, and share your personal information.
            </p>

            <h4 className='mb-4'>5. Intellectual Property</h4>
            <p>
              This website and its original content, features, and functionality are owned by the Company and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
            </p>
          </div>
        </div>
      </div>
      {/* <footer className="bg-green-500 text-white py-4">
      <div className="container mx-auto">
      </div>
    </footer> */}
    </div>
  );
};

export default Index;
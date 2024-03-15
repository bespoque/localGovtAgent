import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="bg-green-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-semibold text-green-800 mb-8">Privacy Policy</h1>
        
        <div className="prose prose-lg text-green-800">
          <p>This privacy policy ("policy") will help you understand how [Your Company Name] ("us", "we", "our") uses and protects the data you provide to us when you visit and use [Your Website/App] ("website", "service").</p>
          
          <h2 className="text-xl font-semibold mb-4">What User Data We Collect</h2>
          <p>When you visit the website, we may collect the following data:</p>
          <ul>
            <li>Your IP address.</li>
            <li>Your contact information and email address.</li>
            <li>Other information such as interests and preferences.</li>
          </ul>

          <h2 className="text-xl font-semibold mb-4">Why We Collect Your Data</h2>
          <p>We are collecting your data for several reasons:</p>
          <ul>
            <li>To better understand your needs.</li>
            <li>To improve our services and products.</li>
            <li>To send you promotional emails containing the information we think you will find interesting.</li>
            <li>To contact you to fill out surveys and participate in other types of market research.</li>
          </ul>

          <h2 className="text-xl font-semibold mb-4">Safeguarding and Securing the Data</h2>
          <p>[Your Company Name] is committed to securing your data and keeping it confidential. [Your Company Name] has done all in its power to prevent data theft, unauthorized access, and disclosure by implementing the latest technologies and software, which help us safeguard all the information we collect online.</p>

          <h2 className="text-xl font-semibold mb-4">Our Cookie Policy</h2>
          <p>Once you agree to allow our website to use cookies, you also agree to use the data it collects regarding your online behavior (analyze web traffic, web pages you spend the most time on, and websites you visit).</p>
          <p>The data we collect by using cookies is used to customize our website to your needs. After we use the data for statistical analysis, the data is completely removed from our systems.</p>
          <p>Please note that cookies don't allow us to gain control of your computer in any way. They are strictly used to monitor which pages you find useful and which you do not so that we can provide a better experience for you.</p>

          <h2 className="text-xl font-semibold mb-4">Links to Other Websites</h2>
          <p>Our website contains links that lead to other websites. If you click on these links [Your Company Name] is not held responsible for your data and privacy protection. Visiting those websites is not governed by this privacy policy agreement. Make sure to read the privacy policy documentation of the website you go to from our website.</p>

          <h2 className="text-xl font-semibold mb-4">Restricting the Collection of your Personal Data</h2>
          <p>At some point, you might wish to restrict the use and collection of your personal data. You can achieve this by doing the following:</p>
          <ul>
            <li>When you are filling the forms on the website, make sure to check if there is a box which you can leave unchecked, if you don't want to disclose your personal information.</li>
            <li>If you have already agreed to share your information with us, feel free to contact us via email and we will be more than happy to change this for you.</li>
          </ul>

          <p>[Your Company Name] will not lease, sell or distribute your personal information to any third parties unless we have your permission. We might do so if the law forces us. Your personal information will be used when we need to send you promotional materials if you agree to this privacy policy.</p>

          <p>For further information, please contact [Your Company Name] by email at [Your Email Address].</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

import React from 'react';


const Index = () => {
  return (
    <div className="">
      <div className="container mx-auto py-8">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="prose">
            <p>
              Welcome to our blog! In this post, we'll explore the valuable role of our Systems Admin in the West Region and how their expertise contributes to the success of our organization.
            </p>
          </div>
          <h1 className="text-3xl font-bold mb-6">Our Systems Admin in the West Region</h1>
          <p className="text-gray-600 mb-4">Published on November 8, 2023</p>
          <div className="prose">
            {/* Add the rest of your blog content here */}
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
            </p>
            <p>
              Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.
            </p>
            {/* Add more paragraphs as needed */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

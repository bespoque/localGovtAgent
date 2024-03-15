import React from 'react';

const Base64Image = ({ src, alt }) => {
    return (
      <img
        src={src}
        alt={alt}
        className=" w-32 h-32 object-cover shadow-lg"
      />
    );
  };

export default Base64Image;
import React from 'react';

const Logo = ({ className = "" }) => {
  return (
    <div className={`font-bold text-2xl ${className}`}>
      <span className="text-orange-500">O</span>
      <span className="text-orange-600">Plus</span>
      <span className="text-orange-500 ml-1">+</span>
    </div>
  );
};

export default Logo;
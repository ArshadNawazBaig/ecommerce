import React from 'react';

const Heading = ({ title, subtitle, className }) => {
  return (
    <div className={className}>
      <h1 className="text-2xl font-bold">{title}</h1>
      {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
    </div>
  );
};

export default Heading;

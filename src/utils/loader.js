import React from 'react';

const loaderStyles = {
  position: 'absolute',
  animation: 'spinAround 0.5s infinite linear',
  border: '2px solid #dbdbdb',
  borderRadius: '290486px',
  borderRightColor: 'transparent',
  borderTopColor: 'transparent',
  display: 'block',
};

export default ({ size = '1' }) => {
  return (
    <div
      style={{
        position: 'relative',
        paddingTop: `${size / 2}em`,
        paddingBottom: `${size / 2}em`,
      }}
    >
      <div
        style={{
          ...loaderStyles,
          height: `${size}em`,
          width: `${size}em`,
          left: `calc(50% - (${size}em / 2))`,
          top: `calc(50% - (${size}em / 2))`,
          borderWidth: `${size >= 6 ? 4 : 2}px`,
        }}
      >
        {' '}
      </div>
    </div>
  );
};

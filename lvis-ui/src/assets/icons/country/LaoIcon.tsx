import React from 'react';

const LaoIcon = ({ width = 24, height = 18 }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect y="0.428589" width="24" height="17.1429" rx="4" fill="white" />
      <mask id="mask0_7950_9204" style={{ maskType: "luminance" }} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="18">
        <rect y="0.428589" width="24" height="17.1429" rx="4" fill="white" />
      </mask>
      <g mask="url(#mask0_7950_9204)">
        <path fillRule="evenodd" clipRule="evenodd" d="M0 13H24V5H0V13Z" fill="#073A88" />
        <path fillRule="evenodd" clipRule="evenodd" d="M0 5.00002H24V0.428589H0V5.00002Z" fill="#E2273E" />
        <path fillRule="evenodd" clipRule="evenodd" d="M0 17.5714H24V13H0V17.5714Z" fill="#E2273E" />
        <circle cx="12" cy="9.00003" r="2.85714" fill="white" />
      </g>
    </svg>
  );
};

export default LaoIcon;
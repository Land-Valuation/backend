
import PropTypes from 'prop-types';

const MarkerIcon = ({ color = '#686C7F'}) => {
  return (
    <svg width="20" height="28" viewBox="0 0 20 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_f_7032_15022)">
        <ellipse cx="9.99984" cy="24.3331" rx="3.33333" ry="1.19048" fill="black" fillOpacity="0.2"/>
      </g>
      <path fillRule="evenodd" clipRule="evenodd" d="M10 0.761719C15.5228 0.761719 20 5.23887 20 10.7617C20 14.9963 17.368 18.6161 13.6506 20.0744L10.5696 24.2858C10.5053 24.374 10.4201 24.446 10.3209 24.4956C10.2218 24.5453 10.1117 24.5713 10 24.5713C9.88829 24.5713 9.77821 24.5453 9.67908 24.4956C9.57995 24.446 9.49466 24.374 9.43043 24.2858L6.34936 20.0744C2.63203 18.6161 0 14.9963 0 10.7617C0 5.23887 4.47715 0.761719 10 0.761719Z" fill={color} />
      <path d="M13.468 19.609L13.3328 19.662L13.2471 19.7792L10.166 23.9906L10.1654 23.9914C10.149 24.014 10.1259 24.0341 10.0969 24.0486L10.3209 24.4956L10.0969 24.0486C10.0678 24.0632 10.0345 24.0713 10 24.0713C9.96546 24.0713 9.93215 24.0632 9.90308 24.0486L9.67908 24.4956L9.90307 24.0486C9.87407 24.0341 9.85098 24.014 9.83455 23.9914L9.83397 23.9906L6.7529 19.7792L6.66715 19.662L6.53197 19.609C2.99963 18.2232 0.5 14.7838 0.5 10.7617C0.5 5.51502 4.7533 1.26172 10 1.26172C15.2467 1.26172 19.5 5.51502 19.5 10.7617C19.5 14.7838 17.0004 18.2232 13.468 19.609Z" stroke="black" strokeOpacity="0.2"/>
      <path d="M14.2858 10.7613C14.2858 8.39437 12.367 6.47559 10.0001 6.47559C7.63313 6.47559 5.71436 8.39437 5.71436 10.7613C5.71436 13.1282 7.63313 15.047 10.0001 15.047C12.367 15.047 14.2858 13.1282 14.2858 10.7613Z" fill="white"/>
      <defs>
      <filter id="filter0_f_7032_15022" x="4.6665" y="21.1426" width="10.6665" height="6.38086" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
      <feFlood floodOpacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feGaussianBlur stdDeviation="1" result="effect1_foregroundBlur_7032_15022"/>
      </filter>
      </defs>
    </svg>
  )
}

MarkerIcon.propTypes = {
  color: PropTypes.string,
};

export default MarkerIcon
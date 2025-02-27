
import React from 'react';

interface CavalierDogProps {
  className?: string;
}

const CavalierDog: React.FC<CavalierDogProps> = ({ className = "" }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 100 125"
      fill="currentColor"
      className={className}
    >
      <path d="M89.07,43.5C88.67,37.5,79.9,29,75.68,25c-.49-.47-.9-.87-1.2-1.18-2.75-2.74-8.43-3.27-9.6-3.34a30.3,30.3,0,0,0-6.88-2,63.89,63.89,0,0,0-7.82-.92h-.63l-.53,0c-1.17.09-3.62.3-6.36.77q-.33,0-.66.12a29.83,29.83,0,0,0-6.88,2c-1.17.07-6.85.6-9.6,3.34-.3.31-.71.71-1.2,1.18C20.1,29,11.33,37.5,10.93,43.5A29.24,29.24,0,0,1,10,48.3c-1.2,4.81-2.68,10.79,1.53,20.41.85,1.94,1.55,3.62,2.15,5.08,2.47,6,3.59,8.66,7.28,8.66a17.34,17.34,0,0,0,4.75-.89c5.48-1.64,6.61-11.22,6.4-20.26a8.38,8.38,0,0,0,2,3.69,6.23,6.23,0,0,0,4.56,1.91,7.13,7.13,0,0,0,.79-.05l.46,0a46.38,46.38,0,0,0,3.66,4.3c1.24,1.13,4.25,1.27,5.68,1.27h.83c1.1,0,4.8,0,6.21-1.26A46.38,46.38,0,0,0,60,66.8l.46,0A6.32,6.32,0,0,0,65.83,65a8.38,8.38,0,0,0,2-3.69c-.21,9,.92,18.62,6.4,20.26a17.34,17.34,0,0,0,4.75.89c3.69,0,4.81-2.7,7.28-8.66.6-1.46,1.3-3.14,2.15-5.08,4.21-9.62,2.73-15.6,1.53-20.41A29.24,29.24,0,0,1,89.07,43.5ZM25,79.16c-5.68,1.7-5.68,1.7-9-6.33-.61-1.47-1.31-3.17-2.17-5.13-3.87-8.83-2.56-14.13-1.4-18.79a29.59,29.59,0,0,0,1-5.24c.34-5,9.27-13.66,12.63-16.9l1.24-1.21a10.48,10.48,0,0,1,4.94-2.18C29.31,28.29,26.9,38.19,28.05,45,30.19,57.74,31.14,77.33,25,79.16Zm8.62-26.25a20.07,20.07,0,0,0-1.58-4.52A36.24,36.24,0,0,1,30.5,44.5C29.07,35.69,33.71,24.34,35.64,23a20.49,20.49,0,0,1,4-1.43c-.45,1.85.08,3.91.6,5.92.21.81.42,1.64.59,2.48.81,4.23,2.25,5.79,3.4,7a4.55,4.55,0,0,1,1.56,3.7c.11,4-.78,6.51-2.34,6.6C41.56,47.41,36.42,49.53,33.63,52.91Zm21,16.35c-.41.36-2.53.65-4.5.61h-.4c-1.91,0-4.05-.25-4.46-.61a34.74,34.74,0,0,1-2.39-2.76l.21,0h.07a10.84,10.84,0,0,0,4.1-1A6.09,6.09,0,0,0,50,63.15a6.15,6.15,0,0,0,2.7,2.3,10.92,10.92,0,0,0,4.09,1h.07l.21,0A34.74,34.74,0,0,1,54.68,69.26ZM47,55.84a2.64,2.64,0,0,1-.36-2.3c.25-.55,1.76-.83,2.91-.83h.54c1.18-.07,3,.21,3.27.82a2.64,2.64,0,0,1-.36,2.3,3.31,3.31,0,0,1-3,1.45A3.29,3.29,0,0,1,47,55.84Zm17,7.39a3.83,3.83,0,0,1-3.3,1.14h0l-2-.2L57.08,64H57a8.51,8.51,0,0,1-3.23-.8c-1.15-.55-2-1.17-2.34-3.54a5.6,5.6,0,0,0,3.68-2.46,5.15,5.15,0,0,0,.52-4.7c-1.09-2.36-4.76-2.32-5.63-2.27s-4.54-.09-5.63,2.27a5.15,5.15,0,0,0,.52,4.7,5.51,5.51,0,0,0,3.68,2.45c-.35,2.38-1.19,3-2.34,3.55a8.27,8.27,0,0,1-3.17.79h-.14l-1.69.18-2,.2A3.83,3.83,0,0,1,36,63.23a7.43,7.43,0,0,1-1.64-6.1v-.08c.55-3.86,7.33-7.14,9.3-7.27,1.48-.09,4.9-1.16,4.68-9.17a7,7,0,0,0-2.22-5.33C45,34.15,44,33,43.28,29.46c-.18-.92-.4-1.79-.62-2.64-.76-2.91-1.13-4.69.15-6a62.73,62.73,0,0,1,7-.82h.3a61.44,61.44,0,0,1,7.07.82c1.28,1.3.91,3.08.15,6-.22.85-.44,1.72-.62,2.64C56,33,55,34.15,53.93,35.28a7,7,0,0,0-2.22,5.33c-.22,8,3.2,9.08,4.67,9.17,2,.13,8.75,3.4,9.31,7.26v.09A7.43,7.43,0,0,1,64.05,63.23ZM69.5,44.5A36.24,36.24,0,0,1,68,48.39a20.07,20.07,0,0,0-1.58,4.52c-2.79-3.38-7.94-5.5-9.83-5.63-1.55-.09-2.44-2.62-2.33-6.6A4.55,4.55,0,0,1,55.77,37c1.15-1.26,2.59-2.82,3.4-7,.17-.84.38-1.67.59-2.48.52-2,1.05-4.07.6-5.92a20.49,20.49,0,0,1,4,1.43C66.29,24.34,70.93,35.69,69.5,44.5ZM86.16,67.7c-.86,2-1.56,3.66-2.17,5.13-3.32,8-3.32,8-9,6.33C68.86,77.33,69.81,57.74,72,45c1.15-6.83-1.26-16.73-4.18-21.64a10.48,10.48,0,0,1,4.94,2.18L74,26.77C77.31,30,86.24,38.63,86.58,43.67a29.59,29.59,0,0,0,1,5.24C88.72,53.57,90,58.87,86.16,67.7Z"/>
      <path d="M38.73,38.63a3.74,3.74,0,1,0,3.74,3.74A3.75,3.75,0,0,0,38.73,38.63Zm0,5A1.24,1.24,0,1,1,40,42.37,1.25,1.25,0,0,1,38.73,43.61Z"/>
      <path d="M61.27,38.63A3.74,3.74,0,1,0,65,42.37,3.75,3.75,0,0,0,61.27,38.63Zm0,5a1.24,1.24,0,1,1,1.24-1.24A1.24,1.24,0,0,1,61.27,43.61Z"/>
    </svg>
  );
};

export default CavalierDog;

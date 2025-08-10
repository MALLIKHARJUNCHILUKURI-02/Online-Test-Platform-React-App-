// import { useEffect, useState } from 'react';

// const useTimer = (initialTime, onExpire) => {
//   const [timeLeft, setTimeLeft] = useState(initialTime); // in seconds

//   useEffect(() => {
//     if (timeLeft <= 0) {
//       onExpire(); // auto-submit exam
//       return;
//     }

//     const timer = setInterval(() => {
//       setTimeLeft((prev) => prev - 1);
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [timeLeft, onExpire]);

//   return {
//     minutes: Math.floor(timeLeft / 60),
//     seconds: timeLeft % 60,
//   };
// };

// export default useTimer;

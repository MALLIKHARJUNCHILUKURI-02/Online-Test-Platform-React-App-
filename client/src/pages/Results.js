// import React from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';

// export default function Results() {
//   const location = useLocation();
//   const navigate = useNavigate();

//   // result object passed from Exam page
//   const result = location.state?.result;

//   if (!result) {
//     return (
//       <div>
//         <p>No results to display.</p>
//         <button onClick={() => navigate('/exam')}>Go to Exam</button>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <h2>Exam Results - Full-Stack Developer | Performance Assessment</h2>
//       <p>
//         Score: {result.score} / {result.total}
//       </p>

//       <div>
//         {result.details.map((q, index) => (
//           <div key={index} style={{ marginBottom: '1rem', borderBottom: '1px solid #ccc' }}>
//             <p>
//               <strong>Q{index + 1}:</strong> {q.question}
//             </p>
//             <p>Your answer: {q.givenAnswer || <em>No answer</em>}</p>
//             <p>Correct answer: {q.correctAnswer}</p>
//             <p style={{ color: q.isCorrect ? 'green' : 'red' }}>
//               {q.isCorrect ? 'Correct' : 'Incorrect'}
//             </p>
//           </div>
//         ))}
//       </div>

//       <button onClick={() => navigate('/exam')}>Retake Exam</button>
//     </div>
//   );
// }

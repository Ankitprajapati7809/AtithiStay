// import React, { useState, useEffect } from 'react';
// // import { useCookies } from 'react-cookie'; // Using react-cookie for managing cookies
// // const jwtDecode = await import('jwt-decode').then(module => module.default);
// //  // Using jwt-decode to decode JWT tokens
// import { useNavigate } from "react-router-dom";

// // function CurrentUser() {
// //   const [currentUser, setCurrentUser] = useState(null);
// //   const [cookies] = useCookies('authToken');
// // console.log(cookies);
// //   useEffect(() => {
// //     // Check if JWT token exists in cookies
// //     if (cookies.jwt) {
// //       // Decode the JWT token to extract user information
// //       const decodedToken = jwtDecode(cookies.jwt);
// //       // Assuming username is stored in the 'sub' claim of the JWT token
// //       console.log(decodedToken)
// //       setCurrentUser(decodedToken.sub);
// //     } else {
// //       setCurrentUser(null);
// //     }
// //   }, [cookies.jwt]);

// //   return ( 
// //     <div>
// //       {currentUser ? (
// //         <p>Welcome, {currentUser}</p>
// //       ) : (
// //         <p>Please log in</p>
// //       )}
// //     </div>
// //   );
// // }

// // export default CurrentUser;

// function currUser() {
//     const [user, setUser] = useState(null);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchUser = async () => {
//           try {
//             const response = await Axios.get('/listing/verify', { withCredentials: true });
//             console.log("==================")
//             console.log(response.data)
//             setUser(response.data); // Make sure this updates the correct state
//           } catch (error) {
//             navigate('/login'); // Redirect if not authenticated
//           }
//         };
    
//         fetchUser();
//       }, []);

//   return (
//      <div>Welcome, {user ? user.username : 'Guest'}!</div>
//   )
// }

// export default currUser
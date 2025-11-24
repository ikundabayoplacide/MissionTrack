// import React, { useState, useEffect } from "react";
// import { jwtDecode } from "jwt-decode";

// const TokenDebugger: React.FC = () => {
//     const [tokenInfo, setTokenInfo] = useState<any>(null);
//     const [error, setError] = useState<string>("");

//     const checkToken = () => {
//         const token = localStorage.getItem("token");
//         const user = localStorage.getItem("user");

//         if (!token) {
//             setError("No token found in localStorage");
//             setTokenInfo(null);
//             return;
//         }

//         try {
//             const decoded: any = jwtDecode(token);
//             setTokenInfo({
//                 token: token.substring(0, 30) + "...",
//                 decoded,
//                 user: user ? JSON.parse(user) : null,
//                 isExpired: decoded.exp * 1000 < Date.now(),
//             });
//             setError("");
//         } catch (err) {
//             setError("Invalid token format");
//             setTokenInfo(null);
//         }
//     };

//     useEffect(() => {
//         checkToken();
//     }, []);

//     const clearAndReload = () => {
//         localStorage.removeItem("token");
//         localStorage.removeItem("user");
//         localStorage.removeItem("userId");
//         window.location.href = "/login";
//     };

//     return (
//         <div className="fixed bottom-4 right-4 bg-white shadow-lg rounded-lg p-4 max-w-md border-2 border-blue-500 z-50">
//             <h3 className="font-bold text-lg mb-2 text-blue-700">🔍 Token Debugger</h3>

//             {error && (
//                 <div className="bg-red-100 text-red-700 p-2 rounded mb-2 text-sm">
//                     {error}
//                 </div>
//             )}

//             {tokenInfo && (
//                 <div className="space-y-2 text-sm">
//                     <div>
//                         <strong>Role:</strong> {tokenInfo.decoded.role || "N/A"}
//                     </div>
//                     <div>
//                         <strong>Email:</strong> {tokenInfo.decoded.email || "N/A"}
//                     </div>
//                     <div>
//                         <strong>Expired:</strong>{" "}
//                         <span className={tokenInfo.isExpired ? "text-red-500" : "text-green-500"}>
//                             {tokenInfo.isExpired ? "Yes ❌" : "No ✅"}
//                         </span>
//                     </div>
//                     <div className="text-xs text-gray-500 break-all">
//                         <strong>Token:</strong> {tokenInfo.token}
//                     </div>
//                 </div>
//             )}

//             <div className="mt-3 space-y-2">
//                 <button
//                     onClick={checkToken}
//                     className="w-full bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
//                 >
//                     Refresh Token Info
//                 </button>
//                 <button
//                     onClick={clearAndReload}
//                     className="w-full bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
//                 >
//                     Clear Token & Re-login
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default TokenDebugger;

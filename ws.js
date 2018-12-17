"use strict";


let userId = new Date().getTime();

import DSAuth from './dataServices/auth';

let mainWs = {
  instance: null
};

// DSAuth.getUserDetails()
//   .then(user => {
//       console.log("Trying to connect WS for userID: ", user.userId);

//       let ws = new WebSocket('ws://10.10.6.54:9808/sub/' + user.userId);

//       ws.onopen = () => {
//         // connection opened
//         console.log("ws connection is now open");
        
//         let msg = {
//           userId: userId,
//           eventType: "connected"
//         };
      
//         ws.send(JSON.stringify(msg)); // send a message
//       };
      
//       ws.onmessage = (e) => {
//         // a message was received
//         console.log("onmessage", e.data);
//       };
      
//       ws.onerror = (e) => {
//         // an error occurred
//         console.log(e.message);
//       };
      
//       ws.onclose = (e) => {
//         // connection closed
//         console.log(e.code, e.reason);
//       };
      
//       ws.sendMessage = function(msg = {}){
//         let message = Object.assign({
//           userId: userId,
//           eventType: "newMessage"
//         }, msg);
      
//         return new Promise((resolve, reject) => {
//           ws.send(JSON.stringify(message), error => {
//             // If error is not defined, the send has been completed, otherwise the error object will indicate what failed.
      
//             if(error) {
//               console.log("[WS] send message failed with error: ", error);
//               return reject(error);
//             }
      
//             return resolve();
//           });
//         });
//       };

//       mainWs.instance = ws;
//   })
//   .catch(error => {
//       console.log("[APP container] Error in fetching user details, error: ", error);
//       navigation.navigate("Login", {params: {}});
//   });



export default mainWs;
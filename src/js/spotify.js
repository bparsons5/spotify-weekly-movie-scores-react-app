// var generateRandomString = function(length) {
//     var text = '';
//     var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

//     for (var i = 0; i < length; i++) {
//     text += possible.charAt(Math.floor(Math.random() * possible.length));
//     }
//     return text;
// };

const authEndpoint = "https://accounts.spotify.com/authorize";
const redirectUri = "http://192.168.0.203:3000/playlist"; // should trigger the /callback function
const clientId = "4f26a217282c49cba3e4ba32726a203a";

const scopes = [
    "user-read-private",
    "user-read-email",
    "playlist-modify-private",
    "playlist-modify-public",
];

// var generateRandomString = function(length) {
//   var text = '';
//   var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

//   for (var i = 0; i < length; i++) {
//     text += possible.charAt(Math.floor(Math.random() * possible.length));
//   }
//   return text;
// };

// var state = generateRandomString(16);
// res.cookie(stateKey, state);
// var stateKey = 'spotify_auth_state';

// var querystring = require('querystring');

// var returnQueryString = querystring.stringify({
//     response_type: 'code',
//     client_id: clientId,
//     scope: scopes.join(" "),
//     redirect_uri: redirectUri,
//     state: generateRandomString(16)
// })

export const loginUrl = `${authEndpoint}?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scopes.join(
    "%20"
  )}`;

// export const loginUrl = authEndpoint + returnQueryString
// console.log(loginUrl)
const { google } = require('googleapis');
const { http } = require('http');
const { url} = require('url');
const port = 3000
// { "installed": { "client_id": "540632768463-uba08ph7949vbpjf536ascg41p33enkq.apps.googleusercontent.com", "project_id": "vsmail-392016", "auth_uri": "https://accounts.google.com/o/oauth2/auth", "token_uri": "https://oauth2.googleapis.com/token", "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs", "client_secret": "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", "redirect_uris": ["http://localhost"] } }

const oauth2Client = new google.auth.OAuth2(
    "540632768463-uba08ph7949vbpjf536ascg41p33enkq.apps.googleusercontent.com",
    "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",
    "http://localhost"
);

google.options({auth: oauth2Client});
// generate a url that asks permissions for Blogger and Google Calendar scopes

async function authenticate(scopes) {
const authorizeUrl = oauth2Client.generateAuthUrl({
    // 'online' (default) or 'offline' (gets refresh_token)
    access_type: 'offline',
    // If you only need one scope you can pass it as a string
    scope: scopes
});

console.log(authorizeUrl);


// Create a server object:
const server = http.createServer(function (req, res) {

	// Write a response to the client
	res.write('Hello World')

	// End the response
	res.end()
})

// Set up our server so it will listen on the port
server.listen(port, function (error) {

	// Checking any error occur while listening on port
	if (error) {
		console.log('Something went wrong', error);
	}
	// Else sent message of listening
	else {
		console.log('Server is listening on port' + port);
	}
})


// const server = http.createServer(function (req, res) {
//     try {
//         const qs = new url.URL('http://localhost:3000').searchParams;
//         res.end('Authentication successful! Please return to the console.');
//     } catch (e) {
//         console.error(e);
//     }
// })
// .listen(3000, () => {
//     console.log("testing");
// });
// destroyed(server);
// This will provide an object with the access_token and refresh_token.
// Save these somewhere safe so they can be used at a later time.

// const {tokens} = await oauth2Client.getToken(code)
// oauth2Client.setCredentials(tokens);
}

// oauth2Client.on('tokens', (tokens) => {
//     if (tokens.refresh_token) {
//       // store the refresh_token in my database!
//       console.log(tokens.refresh_token);
//     }
//     console.log(tokens.access_token);
//   });

  const scopes = [
    'https://www.googleapis.com/auth/blogger',
    'https://www.googleapis.com/auth/calendar'
];
authenticate(scopes);
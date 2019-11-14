const xhr = new XMLHttpRequest();
const clientId = "2041601f364e4ccc9197c572b2f911d8";
let globalAccessToken;

function spotifyAuth() {
	accessToken = window.location.hash.substr(1).split('&')[0].split("=")[1]
	
	if (accessToken) {
		document.getElementById("auth").innerHTML = "Already authorized!";
		globalAccessToken = accessToken;
	} else if (!accessToken) {
		const authParams = {
			"respType": "&response_type=token",
			"redirUri": "&redirect_uri=https://crayonz420.github.io/spotify-chords/",
			"clientId": ["&client_id=", clientId],
			"scope": ["&scope=",
				"streaming ",
				"user-read-currently-playing"
				]
		};
		let uriAuthParams = authParams.respType + authParams.redirUri + authParams.clientId[0] + authParams.clientId[1] + authParams.scope[0] + authParams.scope[1] + authParams.scope[2];
		window.location.href = "https://accounts.spotify.com/authorize?" + uriAuthParams;
	}
}

function refresh() {
	//fetch("https://accounts.spotify.com/api/token", {
	//		method: "POST",
	//		body: "grant_type=authorization_code&code=globalAccessToken&redirect_uri=https://crayonz420.github.io/spotify-chords/",
	//		headers: { "Content-Type": "application/x-www-form-urlencoded" }
	//	}).then(console.log("hi"))
	
	const xhrAccessToken = "Bearer" + accessToken;
	xhr.open("POST", "https://api.spotify.com/v1/me", true);
	xhr.setRequestHeader("Authorization", xhrAccessToken);
	xhr.send(xhrBody);
}
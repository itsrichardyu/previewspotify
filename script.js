const clientId = "2041601f364e4ccc9197c572b2f911d8";
let globalAuthToken;

function spotifyAuth() {
	accessToken = window.location.hash.substr(1).split('&')[0].split("=")[1]
	
	if (accessToken) {
		document.getElementById("auth").innerHTML = "Already authorized!";
		globalAuthToken = accessToken;
	} else if (!accessToken) {
		const authParams = {
			"respType": "&response_type=token",
			"redirUri": "&redirect_uri=https://crayonz420.github.io/spotify-chords/",
			"clientId": ["&client_id=", clientId],
			"scope": ["&scope=",
				"streaming ",
				"user-read-currently-playing"
				]
		}
		window.location.href = "https://accounts.spotify.com/authorize?" + authParams.respType + authParams.redirUri + authParams.clientId[0] + authParams.clientId[1] + authParams.scope[0] + authParams.scope[1] + authParams.scope[2];
	}
}

function refresh() {
}

fetch("https://api.spotify.com/v1/me/player/currently-playing", {
		method: "POST",
		headers: {
			"Application": "Bearer" + globalAuthToken
		},
	}).then(console.log("hi"))
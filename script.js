const xhr = new XMLHttpRequest();
const clientId = "2041601f364e4ccc9197c572b2f911d8";
let globalAccessToken;

function spotifyAuth() {
	accessToken = window.location.hash.substr(1).split('&')[0].split("=")[1]
	
	if (accessToken) {
		document.getElementById("auth").innerHTML = "Already authorized!";
		document.getElementById("authKey").innerHTML = accessToken;
		globalAccessToken = accessToken;
	} else if (!accessToken) {
		const authParams = {
			"respType": "&response_type=token",
			"redirUri": "&redirect_uri=https://crayonz420.github.io/spotify-chords/",
			"clientId": ["&client_id=", clientId],
			"loginDialog": "&show_dialog=true",
			"scope": ["&scope=",
				"streaming ",
				"user-read-currently-playing"
				]
		};
		let uriAuthParams = authParams.respType + authParams.redirUri + authParams.clientId[0] + authParams.clientId[1] + authParams.scope[0] + authParams.scope[1] + authParams.scope[2] + authParams.loginDialog[0];
		window.location.href = "https://accounts.spotify.com/authorize?" + uriAuthParams;
	}
}

function refresh() {
	const xhrAccessToken = "Bearer " + globalAccessToken;
	let spotifyResponse;
	xhr.onreadystatechange = function() {
		if (xhr.readyState == xhr.DONE) {
			spotifyResponse = xhr.responseText;
			spotifyResponse = JSON.parse(spotifyResponse);
			spotifyResponse = [spotifyResponse];
		}
	}
	xhr.open("GET", "https://api.spotify.com/v1/me/player/currently-playing", false);
	xhr.setRequestHeader("Authorization", xhrAccessToken);
	xhr.send();	
	
	let songTitle = spotifyResponse[0].item.name;
	let albumTitle = spotifyResponse[0].item.album.name;
	let artistNames = "";
	let spotifyListenLink = spotifyResponse[0].item.album.external_urls.spotify;
	let albumImageLnk = spotifyResponse[0].item.album.images[0].url;
	
	for (i = 0; i < spotifyResponse[0].item.artists.length; i++) {
		let singleArtistName = spotifyResponse[0].item.artists[i].name;
		artistNames += singleArtistName + ", ";
	}
	
	//console.log(albumImageLnk);
	//console.log("Song name: " + songTitle);
	//console.log("Album name: " + albumTitle);
	//console.log("Artists: " + artistNames.replace(/,\s*$/, ""));
	//console.log("Listen on Spotify - " + spotifyListenLink);
	document.getElementById("albumImg").src = albumImageLnk;
	document.getElementById("songTitle").innerHTML = songTitle;
	document.getElementById("albumTitle").innerHTML = "on " + albumTitle;
	document.getElementById("artistNames").innerHTML = "by " + artistNames.replace(/,\s*$/, "");
	document.getElementById("spotifyListenLink").innerHTML = "Listen on Spotify";
	document.getElementById("spotifyListenLink").href = spotifyListenLink;
}

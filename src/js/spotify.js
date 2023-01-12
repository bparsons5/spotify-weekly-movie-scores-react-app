
import SpotifyWebApi from 'spotify-web-api-js';

const authEndpoint = "https://accounts.spotify.com/authorize";
const redirect_uri = "http://localhost:3000/playlist"; // should trigger the /callback function
const client_id = "4f26a217282c49cba3e4ba32726a203a";
const client_secret = "1dedfdab9fda4d5a96d0c42e959e59c4";

const scopes = [
    "user-read-private",
    "user-read-email",
    "playlist-modify-private",
    "playlist-modify-public",
];

export const loginUrl = `${authEndpoint}?client_id=${client_id}&response_type=code&redirect_uri=${redirect_uri}&scope=${scopes.join(
    "%20"
)}`;

// export const loginUrl = authEndpoint + returnQueryString
// console.log(loginUrl)

export const spotifyApi = new SpotifyWebApi({
  clientId: client_id, // do these need to be updated to get from the users login? currently getting it from the spotify dashboard
  clientSecret: client_secret,
  redirectUri: redirect_uri
});

// export const access_token = useAuth(code);

export const authorizedUserData = async () => {
  spotifyApi.getMe()
  .then(function(data) {
    console.log(data);
  }, function(err) {
    console.error(err);
  });

  return await spotifyApi.getMe()
}

export const playlists = async () => {
  return await spotifyApi.getUserPlaylists()
}



export const searchArtist = async (searchText) => {
  // spotifyApi.searchArtists('search?q=album:The+Son+(Original+Motion+Picture+Soundtrack)+artist:Hans+Zimmer&type=album')
  return await spotifyApi.searchArtists(searchText)
}

export const artistById = async (id) => {
  // "0YC192cP3KPCRWx8zr8MfZ" id for hans zimmer
  return await spotifyApi.getArtist(id)
}

export const albumById = async (id) => {
  return await spotifyApi.getAlbum(id)
}

export function addSongs(playlistId, trackList) {
  spotifyApi.addTracksToPlaylist(playlistId, trackList)
  .then(function(data) {
    console.log(data);
  }, function(err) {
    console.error(err);
  });
}

export const playlistById = async (id) => {
  // '15a8yM3uV2nouNvpbeAhYl' Weekly Movie Scores Playlist Id

  spotifyApi.getPlaylist(id)
  .then(function(data) {
    console.log(data);
  }, function(err) {
    console.error(err);
  });

  return await spotifyApi.getPlaylist(id)
}

export const clearPlaylist = async (id) => {
  let playlist = await playlistById(id) // await here or in playlistById
  let songs = playlist.tracks.items.map(x => 'spotify:track:' + x.track.id)
  console.log(playlist)
  console.log(songs)

  spotifyApi.removeTracksFromPlaylist(id, songs)
  .then(function(data) {
    console.log(data);
  }, function(err) {
    console.error(err);
  });
}

export const addAccessToken = async (access_token) => {
  await spotifyApi.setAccessToken(access_token);
}

export const catchErrors = fn => function(...args) {
    return fn(...args).catch(err => {
      console.error(err);
    });
};

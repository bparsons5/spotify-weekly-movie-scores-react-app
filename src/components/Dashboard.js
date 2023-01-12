// import React, { useEffect } from "react";
// import useAuth from '../js/useAuth';
// import { Row, Col } from 'react-bootstrap'
import { useEffect, useState } from "react";
import { BsSpotify } from "react-icons/bs";
import SpotifyWebApi from 'spotify-web-api-js';
import useAuth from "../js/useAuth";
import '../css/dashboard.css';

const redirect_uri = "http://192.168.0.203:3000/playlist";
const client_id = "4f26a217282c49cba3e4ba32726a203a";
const client_secret = "1dedfdab9fda4d5a96d0c42e959e59c4";
// let access_token;

let spotifyApi = new SpotifyWebApi({
  clientId: client_id, // do these need to be updated to get from the users login? currently getting it from the spotify dashboard
  clientSecret: client_secret,
  redirectUri: redirect_uri
});

const authorizedUserData = async () => {
  spotifyApi.getMe()
  .then(function(data) {
    console.log(data);
  }, function(err) {
    console.error(err);
  });

  return await spotifyApi.getMe()
}

const playlists = async () => {
  return await spotifyApi.getUserPlaylists()
}



const searchArtist = async (searchText) => {
  // spotifyApi.searchArtists('search?q=album:The+Son+(Original+Motion+Picture+Soundtrack)+artist:Hans+Zimmer&type=album')
  return await spotifyApi.searchArtists(searchText)
}

const artistById = async (id) => {
  // "0YC192cP3KPCRWx8zr8MfZ" id for hans zimmer
  return await spotifyApi.getArtist(id)
}

const albumById = async (id) => {
  return await spotifyApi.getAlbum(id)
}

function addSongs(playlistId, trackList) {
  spotifyApi.addTracksToPlaylist(playlistId, trackList)
  .then(function(data) {
    console.log(data);
  }, function(err) {
    console.error(err);
  });
}

const playlistById = async (id) => {
  // '15a8yM3uV2nouNvpbeAhYl' Weekly Movie Scores Playlist Id

  spotifyApi.getPlaylist(id)
  .then(function(data) {
    console.log(data);
  }, function(err) {
    console.error(err);
  });

  return await spotifyApi.getPlaylist(id)
}

const clearPlaylist = async (id) => {
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

const catchErrors = fn => function(...args) {
    return fn(...args).catch(err => {
      console.error(err);
    });
};


const addAccessToken = async (access_token) => {
  await spotifyApi.setAccessToken(access_token);
}




const Dashboard = ({ code }) => {

  const access_token = useAuth(code);
  spotifyApi.setAccessToken(access_token);
  console.log(access_token);

  // const access_token = useAuth(code);
  // const [user, setUser] = useState(null);
  // // const [access_token, setAccess_token] = useState();


  // useEffect(() => {
  //   const fetchToken = async () => {
  //     console.log(access_token)
  //     await addAccessToken(access_token)
  //   };
  //   catchErrors(fetchToken());
  // }, []);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const { user } = await authorizedUserData()
  //     setUser(user)
  //     console.log(user)
  //   };
  //   catchErrors(fetchUser());
  // }, []);

  return (
    <div id='dashboard'>
      <div id='panel'>
        <BsSpotify id='panel-spotify-logo'></BsSpotify>
        <div id='panel-spotify-banner'>
          <a id='panel-spotify-log-out' href='/'>LOG OUT</a>
        </div>
        <div id='user'>
          {/* <img src={user !== undefined ? user.images[0].url : ''} alt=''></img> */}
          {/* <h3>{user.display_name}</h3>
          <p>{user.followers.total}</p> */}
        </div>
      </div>
      <div id='main'>
          <div id='authentication-code'>
            <h6>authentication code</h6>
            <p>{code}</p> 
          </div>
          <div id='actions'>
            <button id='get-user' className='btn spotify-button' onClick={() => authorizedUserData()}>AUTHORIZED USER DATA</button>
            <button id='get-playlists' className='btn spotify-button' onClick={() => playlists()}>PLAYLISTS</button>
            <button id='get-weekly-movie-scores' className='btn spotify-button' onClick={() => playlistById('15a8yM3uV2nouNvpbeAhYl')}>PLAYLIST BY ID</button>
            <button id='hans-zimmer' className='btn spotify-button' onClick={() => searchArtist('Hans Zimmer')}>SEARCH FOR ARTIST</button>
            <button id='hans-zimmer' className='btn spotify-button' onClick={() => artistById('0YC192cP3KPCRWx8zr8MfZ')}>SPECIFIC ARTIST BY ID</button>
            <button id='get-album' className='btn spotify-button' onClick={() => albumById('7fKZaTDLIJHlyT0yiNk2PY')}>ALBUM BY ID</button>
            <button id='add-song' className='btn spotify-button' onClick={() => addSongs('15a8yM3uV2nouNvpbeAhYl', ['spotify:track:3XJMnCcbUGzJQoJJiO03zL', 'spotify:track:7wEaPRwNN1mrDrnqZZoQ3M', 'spotify:track:3pExSgL0wGADq7CLuL5tEk', 'spotify:track:6HjPYDOmfTcvDc0tJSz9sF', 'spotify:track:6kZzc81vIwciuavsi0aqtQ', 'spotify:track:2ukQJblBVT5GkRCRg2V8en', 'spotify:track:3I5TItjI4pzil1OEVk7Y8n', 'spotify:track:2cXXf7iZ5kcNJgyvTmmOqv', 'spotify:track:5mHYVF0Sr9A6vmLvIdvl1Z'])}>ADD SONGS TO PLAYLIST</button>
            <button id='empty-playlist' className='btn spotify-button' onClick={() => clearPlaylist('15a8yM3uV2nouNvpbeAhYl')}>CLEAR PLAYLIST</button>
            
            <button id='get-user' className='btn spotify-button' onClick={() => authorizedUserData()}>AUTHORIZED USER DATA</button>
            <button id='get-playlists' className='btn spotify-button' onClick={() => playlists()}>PLAYLISTS</button>
            <button id='get-weekly-movie-scores' className='btn spotify-button' onClick={() => playlistById('15a8yM3uV2nouNvpbeAhYl')}>PLAYLIST BY ID</button>
            <button id='hans-zimmer' className='btn spotify-button' onClick={() => searchArtist('Hans Zimmer')}>SEARCH FOR ARTIST</button>
            <button id='hans-zimmer' className='btn spotify-button' onClick={() => artistById('0YC192cP3KPCRWx8zr8MfZ')}>SPECIFIC ARTIST BY ID</button>
            <button id='get-album' className='btn spotify-button' onClick={() => albumById('7fKZaTDLIJHlyT0yiNk2PY')}>ALBUM BY ID</button>
            <button id='add-song' className='btn spotify-button' onClick={() => addSongs('15a8yM3uV2nouNvpbeAhYl', ['spotify:track:3XJMnCcbUGzJQoJJiO03zL', 'spotify:track:7wEaPRwNN1mrDrnqZZoQ3M', 'spotify:track:3pExSgL0wGADq7CLuL5tEk', 'spotify:track:6HjPYDOmfTcvDc0tJSz9sF', 'spotify:track:6kZzc81vIwciuavsi0aqtQ', 'spotify:track:2ukQJblBVT5GkRCRg2V8en', 'spotify:track:3I5TItjI4pzil1OEVk7Y8n', 'spotify:track:2cXXf7iZ5kcNJgyvTmmOqv', 'spotify:track:5mHYVF0Sr9A6vmLvIdvl1Z'])}>ADD SONGS TO PLAYLIST</button>
            <button id='empty-playlist' className='btn spotify-button' onClick={() => clearPlaylist('15a8yM3uV2nouNvpbeAhYl')}>CLEAR PLAYLIST</button>
          </div>
      </div>
    </div>
  );
};

export default Dashboard;
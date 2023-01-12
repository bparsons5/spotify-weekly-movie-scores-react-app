// import React, { useEffect } from "react";
// import useAuth from '../js/useAuth';
// import { Row, Col } from 'react-bootstrap'
import { useEffect, useState } from "react";
import { BsSpotify } from "react-icons/bs";
import useAuth from "../js/useAuth";
import {spotifyApi, authorizedUserData, playlists, searchArtist, artistById, albumById, addSongs, playlistById, clearPlaylist, addAccessToken, catchErrors } from '../js/spotify';
import User from './User'
import Playlist from './Playlist'
import '../css/dashboard.css';

const Dashboard = ({ code }) => {

  const access_token = useAuth(code);
  spotifyApi.setAccessToken(access_token);

  return (
    <div id='dashboard'>
      {/* make panel a component */}
      <div id='panel'> 
        <BsSpotify id='panel-spotify-logo'></BsSpotify>
        <div id='panel-spotify-banner'>
          <a id='panel-spotify-log-out' href='/'>LOG OUT</a>
        </div>
        <User></User>
      </div>
      {/* get rid of main */}
      <div id='main'>
        <Playlist></Playlist>
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
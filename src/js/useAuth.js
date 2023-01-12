import { useEffect, useState } from "react";
import querystring from 'querystring'
import {Buffer} from 'buffer';

export default function useAuth(code) {
  const redirect_uri = "http://192.168.0.203:3000/playlist";
  const client_id = "4f26a217282c49cba3e4ba32726a203a";
  const client_secret = "1dedfdab9fda4d5a96d0c42e959e59c4";
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();

  useEffect(() => {
    fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      body: querystring.stringify({
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      }),
      json: true
    })
    .then(r => r.json())
    .then(r => {
        console.log(r)

        window.history.pushState({}, null, "/playlist");

        setAccessToken(r.access_token);
        setRefreshToken(r.refresh_token);
        setExpiresIn(r.expires_in);
    })
  }, [code]);

  
  // Update 'accessToken' with the help of 'refreshToken' when 'expireIn' time expires
  // Because of this user doesnot have to reLogin after(in this case 3600s = 1hr) its accessToken expires because below code will updates accessToken
  useEffect(() => {
    if (!refreshToken || !expiresIn) {
      return;
    }

    let interval = setInterval(() => {
      
      fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
        },
        body: querystring.stringify({
          code: code,
          redirect_uri: redirect_uri,
          grant_type: 'authorization_code'
        }),
        json: true
      })
      .then(r => r.json())
      .then(r => {
          console.log(r)

          window.history.pushState({}, null, "/playlist");

          setAccessToken(r.access_token);
          setRefreshToken(r.refresh_token);
          setExpiresIn(r.expires_in);
          setAccessToken(r.access_token);
          setExpiresIn(r.expires_in);
      })

    }, (expiresIn - 60) * 1000 );   // 1 min before expire Time and multiplying it with 1000 becoz to convert it in miliseconds

    // This will make sure that if for some reason our refreshtoken or expireTime changes before an actual Refresh then it will clear the interval so that we don't use the incorrect expireTime or refreshtoken
    return () => clearInterval(interval)

  }, [refreshToken, expiresIn, code]);

  return accessToken
}
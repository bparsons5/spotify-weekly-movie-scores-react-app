import { useEffect, useState } from "react";
import { Row, Col } from 'react-bootstrap'
import {spotifyApi, authorizedUserData, playlists, searchArtist, artistById, albumById, addSongs, playlistById, clearPlaylist, addAccessToken, catchErrors } from '../js/spotify';
import '../css/user.css';
import profile from '../images/profile-picture.png'

const User = () => {

    // const [user, setUser] = useState();

    // useEffect(() => {
    //     const user = authorizedUserData()
    //     setUser(user)
    // }, []);

    const user = {
        "country": "US",
        "display_name": "Robert Brett Parsons",
        "email": "parsonsbrett0@gmail.com",
        "explicit_content": {
            "filter_enabled": false,
            "filter_locked": false
        },
        "external_urls": {
            "spotify": "https://open.spotify.com/user/125770832"
        },
        "followers": {
            "href": null,
            "total": 42
        },
        "href": "https://api.spotify.com/v1/users/125770832",
        "id": "125770832",
        "images": [
            {
                "height": null,
                "url": "https://scontent-ord5-1.xx.fbcdn.net/v/t39.30808-1/271185613_4941930399197963_2720651635580075482_n.jpg?stp=dst-jpg_p320x320&_nc_cat=110&ccb=1-7&_nc_sid=0c64ff&_nc_ohc=gg2i5291m4cAX8HDq6E&_nc_ht=scontent-ord5-1.xx&edm=AP4hL3IEAAAA&oh=00_AfC7Q_DQXzPxCPTVbcNrG_YeSedRZJ3h5Ci298Tw9keYYA&oe=63C4230E",
                "width": null
            }
        ],
        "product": "premium",
        "type": "user",
        "uri": "spotify:user:125770832"
    }

    // will also have to get count of playlists


    return (
        <div id='user-wrapper'>
            <div id='user-content'>
            {/* <img id='user-img' src={user ? user.images[0].url : ''}></img> */}
            <img id='user-img' src={profile}></img>
            <a id='user-name' href='/'>{user.display_name}</a>
            <Row id='user-stat-row'>
                <Col className="user-stat">
                    <h6>Followers</h6>
                    <h4>{user.followers.total}</h4>
                </Col>
                <Col className="user-stat">
                    <h6>Playlists</h6>
                    <h4>{user.followers.total}</h4>
                </Col>
            </Row>
            </div>
        </div>
    )
}

export default User
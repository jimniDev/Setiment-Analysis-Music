import React, { useState, useEffect } from 'react';
// import { play, pause } from "../core/api/spotifysdk";

const track = {
    album: 
    {
        id: '7egcy2gtlyoUUl1OlQrY3R',
        imgs:{
            0: {height: 640, url: 'https://i.scdn.co/image/ab67616d0000b2737968a5fd0be134742699910e', width: 640},
            1: {height: 300, url: 'https://i.scdn.co/image/ab67616d00001e027968a5fd0be134742699910e', width: 300},
            2: {height: 64, url: 'https://i.scdn.co/image/ab67616d000048517968a5fd0be134742699910e', width: 64}
        },
        name: 'Rush Hour'},
    artist: {id: '6aLdhHUqgdKE86xbtNmY8g', name: 'Crush'},
    id: "5aucVLKiumD89mxVCB4zvS",
    name: "Rush Hour (Feat. j-hope of BTS)",
    preview: "https://p.scdn.co/mp3-preview/308fa9a7d32bcd0eb5e07895a37bbbf9a44c2a32?cid=254569f6f0b64561a5d1113b728eebf9",
    uri: "spotify:track:5aucVLKiumD89mxVCB4zvS"
}

function WebPlayback(props) {
    const [player, setPlayer] = useState(undefined);
    const [device_id, setId] = useState("");
    const [is_paused, setPaused] = useState(false);
    const [is_active, setActive] = useState(false);
    const [current_track, setTrack] = useState(track);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;
    
        document.body.appendChild(script);
    
        window.onSpotifyWebPlaybackSDKReady = () => {
    
            const player = new window.Spotify.Player({
                name: 'Web Playback SDK',
                getOAuthToken: cb => { cb(props.token); },
                volume: 0.5
            });
    
            setPlayer(player);
    
            player.addListener('ready', ({ device_id }) => {
                setId(device_id);
                console.log('Ready with Device ID', device_id);
            });
    
            player.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
            });

            player.addListener('player_state_changed', ( state => {

                if (!state) {
                    return;
                }
            
                setTrack(state.track_window.current_track);
                setPaused(state.paused);
                console.log(current_track)
            
                player.getCurrentState().then( state => { 
                    (!state)? setActive(false) : setActive(true) 
                });
            
            }));

            player.connect();
        };
    }, [props.token]);

    function onPlay(uri, is_new) {
        console.log('device_id', device_id)

        var requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                device_id: device_id,
                spotify_uri: uri,
                // position_ms: is_new ? 0 : current_position,
            })
        };

        if (uri === undefined) {
            requestOptions['body'] = JSON.stringify({
                    device_id: device_id,
                    spotify_uri: track.uri,
                    // position_ms: current_position,
                })
            }   
        fetch('/play', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log('data')
            });

        };

   return (
      <>
        <div className="container">
           <div className="main-wrapper">
                { current_track.album &&
                <div>
                    <img src={current_track.album.imgs[1].url} 
                        className="now-playing__cover" alt="" />

                    <div className="now-playing__side">
                        <div className="now-playing__name">{
                                    current_track.name
                                    }</div>

                        <div className="now-playing__artist">{
                                    current_track.artist.name
                                    }</div>
                    </div>
                </div>
                }
            
                <button className="btn-spotify" onClick={() => { player.previousTrack() }} >
                    &lt;&lt;
                </button>

                <button className="btn-spotify" onClick={() => {
                        player.togglePlay()
                        onPlay(track.uri, true)
                    }} >
                    { is_paused ? "PLAY" : "PAUSE" }
                </button>

                <button className="btn-spotify" onClick={() => { player.nextTrack() }} >
                    &gt;&gt;
                </button>
            </div>
        </div>
      </>
    );
}

export default WebPlayback
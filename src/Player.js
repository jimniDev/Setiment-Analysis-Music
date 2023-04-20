import { useState, useEffect, useRef, React } from 'react';
import WebPlayback from './Webplayback';

export function Player(track) {
    const [token, setToken] = useState('');

    // useEffect(() => {
    //     fetch('/token', {method: 'GET'})
    //     .then(res => res.json())
    //     .then(data => {
    //         console.log('token', data.token)
    //         setToken(data.token)
    //     })
    // }, [token]);
    useEffect(() => {

        async function getToken() {
            const response = await fetch('/token', {method: 'GET'});
            const json = await response.json();
            console.log(json)

            setToken(json.token);
        } 
        getToken();
    
    }, []);


    return (
        <div>
            <WebPlayback token={token} track={track}/>
        </div>
    )
}
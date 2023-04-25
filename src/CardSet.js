import { useLocation } from "react-router-dom";
import { useImmer } from 'use-immer';
import { useState, useEffect, useRef, React } from 'react';
import { Card } from './Card';
import { Popup } from './Popup';
import styles from "./CardSet.module.css";
import classNames from 'classnames/bind';

export function CardSet() {
    const cx = classNames.bind(styles);
    const location = useLocation();
    const mood = location.state.mood
    const seed = location.state.seed

    const dataId = useRef(0);

    const [isRemoved, setIsRemoved] = useState(false);
    const [tracks, updateTracks] = useImmer([]);
    const EMOTION_IMGS = ['./img/like.png', './img/dislike.png']
    const [like, setLike] = useState('');

    useEffect(() => {
        async function getRecommend() {
            const response = await fetch('/recommend', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    mood: mood,
                    seed: seed,
                })
            });
            const json = await response.json();
            console.log(json)
            updateTracks(json['result']);
        } 
        getRecommend();
        console.log(tracks)
        // refreshCards()
    }, []);

    function handleIsRemoved() {
        if (isRemoved) {
            setIsRemoved(true)
        }
    }

    function onClickMoreBtn(){
        window.location.replace("/recommend")
    }
    
    return (
        <div className={styles.frame}>
            <button className={styles.moreBtn} onClick={onClickMoreBtn}>Get More Recommendation!</button>
            {like == 'like' && <Popup className={like} src={EMOTION_IMGS[0]} onClose={() => setLike('')} />}
            {like == 'dislike' && <Popup className={like} src={EMOTION_IMGS[1]} onClose={() => setLike('')} />}
            {tracks.map((track) => (
                <Card
                    updateTracks={updateTracks}
                    key={track.id}
                    track = {track}
                    setLike = {setLike}
                    like = {like}
                />
            ))}
            
        </div>
    )
}



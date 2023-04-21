import { useLocation } from "react-router-dom";
import { useImmer } from 'use-immer';
import { useState, useEffect, useRef, React } from 'react';
import { Card } from './Card';
import styles from "./CardSet.module.css";
import { selectUnstyledClasses } from "@mui/base";

export function CardSet() {
    const location = useLocation();
    const mood = location.state.mood
    const seed = location.state.seed

    const dataId = useRef(0);
    const [isRemoved, setIsRemoved] = useState(false);
    const [tracks, updateTracks] = useImmer([]);
    
    // const frameRef = useRef();
    // let cur = frameRef.querySelector('.card:last-child') //최상단 카드

    // function onCreate(title, artist, albumArt) {
    //     const created_date = new Date().getTime();
    //     const newItem = {
    //         title,
    //         artist,
    //         albumArt,
    //         created_date,
    //         id: dataId.current
    //     };
    //     dataId.current += 1;
    //     setData([newItem, ...data])
    //   };

    useEffect(() => {
        async function getRecommend() {
            const response = await fetch('/recommend', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
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

    // function refreshCards(){
    //     var newCards= document.querySelectorAll('.card:not(.removed)')
    
    //     if (newCards) {
    //         const topCard = frame.children[newCards.length-1]
            
    //         for (let i = 0; i < imgs.length; i++){
    //             // newCards[imgs.length -1 - i].style.transform = ''
    //             newCards[imgs.length -1 - i].style.transform = 'scale(' + (20 - i)/20 + ') translateY(-' + i * 20 + 'px)'
    //             newCards[imgs.length -1 - i].style.opacitiy = (10-i) / 10
    //             newCards[imgs.length -1 - i].style.transition = `transform 100ms`
    //         }
    //     }
    // }

    // function swipeComplete() {
    //     // // Fly away 500ms
    //     const flyX = (Math.abs(moveX) / moveX) * innerWidth * 1.3
    //     const flyY = (moveY / moveX) * flyX
    //     setTransform(flyX, flyY, flyX / innerWidth * 50, innerWidth)
    
    //     // // Replace Top Card 
    //     const prev = cur
    //     const next = cur.previousElementSibling
    //     cur = next
    //     addEventListener(next)
    //     prev.classList.add('removed')
    //     appendCard()
    //     setTimeout(() => frame.removeChild(prev), innerWidth)
        
    //     // replace 하면서 위치 바꿔치기?
    //     refreshCards()
    // }

    
    return (
        <div className={styles.frame}>
            {tracks.map((track) => (
                <Card
                    updateTracks={updateTracks}
                    key={track.id}
                    track = {track}
                />
            ))}
        </div>
    )
}



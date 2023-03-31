import { useState, useEffect, useRef, React } from 'react';
import { Card } from './Card';
import styles from "./CardSet.module.css";

export function CardSet() {
    const IMGS = ['./img/nongdamgom1.jpeg','./img/nongdamgom2.jpeg', './img/nongdamgom3.jpeg', './img/nongdamgom4.png','./img/nongdamgom5.jpeg']


    // const frameRef = useRef();
    // let cur = frameRef.querySelector('.card:last-child') //최상단 카드

    useEffect(() => {
        // console.log(imgCount)

        // refreshCards()
     });

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


    // function swipeCancel() {
    //     setTransform(0, 0, 0, 100)
    //     setTimeout(() => cur.style.transition = '', 100) // transition initialize
    // }
    
    return (
        <div className={styles.frame}>
            {IMGS.map((img) => (
                <Card img={img} />
            ))}
        </div>
    )
}



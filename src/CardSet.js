import { useState, useEffect, useRef, React } from 'react';
import { Card } from './Card';
import styles from "./CardSet.module.css";

export function CardSet() {
    const Temp = [
        {
            id: 1,
            title: '밤편지',
            artist: 'IU',
            albumImg: './img/nongdamgom1.jpeg',
        },
        {
            id: 2,
            title: 'DNA',
            artist: 'BTS',
            albumImg: './img/nongdamgom2.jpeg',
        },
        {
            id: 3,
            title: '귤',
            artist: '제주소년',
            albumImg: './img/nongdamgom3.jpeg',
        },
        {
            id: 4,
            title: 'Post Malobne(Feat.RANI)',
            artist: 'Sam Feldt',
            albumImg: './img/nongdamgom4.png',
        },
        {
            id: 5,
            title: 'Green Light',
            artist: '소녀시대',
            albumImg: './img/nongdamgom5.jpeg',
        }
    ]

    const dataId = useRef(0);
    const [isRemoved, setIsRemoved] = useState(false);
    const [data, setData] = useState([]);
    
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
        setData(Temp); // 나중에 데이터 교체
        
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
            {data.map((data) => (
                <Card
                    key={data.id}
                    data = {data}
                    img={data.albumImg}
                />
            ))}
        </div>
    )
}



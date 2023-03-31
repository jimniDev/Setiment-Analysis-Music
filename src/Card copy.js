// import { useState, useRef, useEffect } from 'react';
// import styles from "./Card.module.css";

// export function Card ({img}) {
//     const innerWidth = window.innerWidth;
//     const cardRef = useRef();
//     useEffect(() => {
//     })

//     const [isDown, setIsDown] = useState(false);
//     const [start, setStart] = useState({ x: 0, y: 0 });
//     const [move, setMove] = useState({ x: 0, y: 0 });
//     const [fly, setFly] = useState({ x: 0, y: 0 });

//     function setTransform(x, y, deg, duration){
//         cardRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${deg}deg)`
//         if (duration) cardRef.current.style.transition = `transform ${duration}ms`
//     }        
    
//     function onPointerDown(e) {
//         setIsDown(true)
//         setStart({
//             x: e.clientX,
//             y: e.clientY
//         })
//         // pointerdown 있을때만 나머지 이벤트 실행
//         cardRef.current.addEventListener('pointermove', onPointerMove) 
//         // cardRef.current.addEventListener('pointerup', onPointerUp)
//         // cardRef.current.addEventListener('pointerleave', onPointerUp) // 화면밖으로 벗어나도 PointerUp과 같은처리
//     }
    
//     function onPointerMove(e){
//         if (isDown){
//             setMove({
//                 x: e.clientX - start.x,
//                 y: e.clientY - start.y,
//             })
//             setTransform(move.x, move.y, move.x / innerWidth * 50)
//         }
//     }
    
//     function onPointerUp() {
//         setIsDown(false)

//         console.log(move.x, cardRef.current.clientWidth / 2)
//         cardRef.current.removeEventListener('pointerdown', onPointerDown)
        
//         if (Math.abs(move.x) > cardRef.current.clientWidth / 2) {
            
//             swipeComplete()
//         } else { 
//             swipeCancel()
//         }


//     }

//     function swipeComplete() {
//         // // Fly away 500ms
//         setFly({
//             x: (Math.abs(move.x) / move.x) * innerWidth * 1.3,
//             y: (move.y / move.x) * ((Math.abs(move.x) / move.x) * innerWidth * 1.3)
//         })
//         setTransform(fly.x, fly.y, fly.x / innerWidth * 50, 1000)
    
//         // // Replace Top Card 
//         // const prev = cur
//         // const next = cur.previousElementSibling
//         // cur = next
//         // addEventListener(next)
//         // prev.classList.add('removed')
//         // appendCard()
//         // setTimeout(() => frame.removeChild(prev), innerWidth)
        
//         // replace 하면서 위치 바꿔치기?
//         // refreshCards()
//     }

//     function swipeCancel() {
//         setTransform(0, 0, 0, 100)
//         setTimeout(() => cardRef.current.style.transition = '', 100) // transition initialize
//     }

//     return (
//         // <div style={{backgroundImage: `url(${imgs[imgCount++]})`}}>
//         <div ref={cardRef}
//             className={styles.card}
//             style={{backgroundImage: `url(${img})`}}
//             onPointerDown={(e) => onPointerDown(e)}
//             onPointerMove={(e) => onPointerMove(e)}
//             onPointerUp={(e) => onPointerUp(e)}
//             onPointerLeave={(e) => onPointerUp(e)}
//             >

//             <h1>{move.x}, {move.y}</h1>
//         </div>
//     )
// }
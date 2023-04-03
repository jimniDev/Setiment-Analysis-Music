import { useState, useRef, useEffect } from 'react';
import styles from "./Card.module.css";

export function Card ({
    children,
    img,
    data
}) {
    const innerWidth = window.innerWidth;
    const cardRef = useRef();

    const [lastCoordinates, setLastCoordinates] = useState(null);
    const [shape, setShape] = useState({
        position: {
            x: 0,
            y: 0,
        },
        deg: 0,
        duration: 0,
    });
    
    function handleMove(dx, dy, dg, dt) {
        setShape({
            position: {
                x: shape.position.x + dx,
                y: shape.position.y + dy,
            },
            deg: shape.deg + dg,
            durtation: shape.duration + dt,
        });
    }

    function handlePointerDown(e) {
        e.target.setPointerCapture(e.pointerId);
        setLastCoordinates({
          x: e.clientX,
          y: e.clientY,
        });
    }

    function handlePointerMove(e) {
        if (lastCoordinates) {
            setLastCoordinates({
                x: e.clientX,
                y: e.clientY,
        });
        const dx = e.clientX - lastCoordinates.x;
        const dy = e.clientY - lastCoordinates.y;
        const dg = dx / innerWidth * 50
        handleMove(dx, dy, dg, 0);
        }
    }

    function handlePointerUp(e) {
        console.log(shape.position.x, cardRef.current.clientWidth / 2)
        if (Math.abs(shape.position.x) > cardRef.current.clientWidth / 2) {
            swipeComplete()
        } else { 
            swipeCancel()
        }
        setLastCoordinates(null);
    }

    function swipeCancel() {
        setShape({
            position: {
                x: 0,
                y: 0,
            },
            deg: 0,
            durtation: 100,
        });
    }
    
    function swipeComplete() {
        // // Fly away 500ms
        const moveX = shape.position.x
        const moveY = shape.position.y;
        const flyX = (Math.abs(moveX) / moveX) * innerWidth * 1.3;
        const flyY = (moveY / moveX) * flyX;

        setShape({
            position: {
                x: flyX,
                y: flyY,
            },
            deg: flyX / innerWidth * 50,
            duration: innerWidth * 1.5,
        });
        setTimeout(() => cardRef.current.style.transition = '', 1000) // transition initialize
    }

    return (
        <div ref={cardRef}
            className={styles.card}
            style={{
                // backgroundImage: `url(${img})`,
                transform : `translate3d(${shape.position.x}px, ${shape.position.y}px, 0) rotate(${shape.deg}deg)`,
                transition : `transform ${shape.duration}ms`
            }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            >
            <img src={img}></img>
            <h1>{data.title}</h1>
            <h2>{data.artist}</h2>
            
            <h1>{shape.position.x}, {shape.position.y}</h1>
            { lastCoordinates && <h1> /// {lastCoordinates.x}, {lastCoordinates.y}</h1>}
        </div>
    )
}
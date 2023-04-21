import { useState, useRef, useEffect } from 'react';
import styles from "./Card.module.css";
import classNames from 'classnames/bind';
import { Video } from "./Video";


export function Card ({
    children,
    track,
    updateTracks,
}) {
    const cx = classNames.bind(styles);
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
    const [removed, setRemoved] = useState(false);
    const [moving, setMoving] = useState(false);

    const [isPlaying, setIsPlaying] = useState(false);
    const PLAYBTN_IMGS = ['./img/play.png', './img/pause.png']
    const [playValue, setPlayValue] = useState(PLAYBTN_IMGS[0])

    useEffect(() => {
        setIsPlaying(false)
        setPlayValue(PLAYBTN_IMGS[0])
    }, []);
  
    
    function handleMove(dx, dy, dg, dt) {
        setMoving(true)
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
        setMoving(true)
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
        setMoving(false)
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
        setRemoved(true);
        setIsPlaying(false)
        setPlayValue(PLAYBTN_IMGS[0])
    }

    function handlePlayClick(e) {
        if (isPlaying) {
          setIsPlaying(false)
          setPlayValue(PLAYBTN_IMGS[0])
        } else {
          setIsPlaying(true)
          setPlayValue(PLAYBTN_IMGS[1])
        } 
        console.log(isPlaying)
    }

    return (
        <div ref={cardRef}
            className={cx('card', {removed: removed ? true : false}, {moving: moving ? true : false})}
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
            <img className={cx('albumimg')} src={track.album.images[1].url}></img>
            <h2>{track.name}</h2>
            <h3>{track.artists[0].name}</h3>
            <img className={styles.playBtn} src={playValue} onClick={handlePlayClick}/>
            <Video className="today" src={track.preview_url} isPlaying={isPlaying}></Video>
            {/* <p>{shape.position.x}, {shape.position.y}</p>
            { lastCoordinates && <p> /// {lastCoordinates.x}, {lastCoordinates.y}</p>} */}
        </div>
    )
}
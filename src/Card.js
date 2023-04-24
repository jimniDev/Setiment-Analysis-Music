import { useState, useRef, useEffect } from 'react';
import styles from "./Card.module.css";
import classNames from 'classnames/bind';
import { Video } from "./Video";


export function Card ({
    children,
    track,
    updateTracks,
    setLike,
    like,
}) {
    const cx = classNames.bind(styles);
    const innerWidth = window.innerWidth;
    const cardRef = useRef();
    const canvasRef = useRef();
    const imgRef = useRef();

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
    const [color, setcolor] = useState('white');
    const [textColor, setTextColor] = useState('#2a2a2a');
    
    

    useEffect(() => {
        setIsPlaying(false)
        setPlayValue(PLAYBTN_IMGS[0])
        getColorFromImg()
        // setTimeout(()=>{ getColorFromImg() }, 100);
    }, [color]);
  
    function getColorFromImg(){
        if (!canvasRef) return;
        var canvas = canvasRef
        var ctx = canvas.current.getContext("2d")
        canvas.current.style.display='none'
        
        const IMG = new Image();
        IMG.src = track.album.images[1].url;
        IMG.crossOrigin="Anonymous"
        
        IMG.onload = function() {
            console.log('img!', IMG.height)
            canvas.height = IMG.height
            canvas.width = IMG.width
            ctx.drawImage(IMG, 0, 0);
            var id = ctx.getImageData(0, 0, canvas.width, canvas.height)
            var i = 4;
            console.log(id.data[i],id.data[i+1],id.data[i+2],id.data[i+3])
            setcolor(`rgba(${id.data[i]}, ${id.data[i+1]}, ${id.data[i+2]}, ${id.data[i+3]})`);
            if ((id.data[i]<=128) || (id.data[i]<=128) || (id.data[i]<=128)) {
                setTextColor('white')
            }
        }
    }

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
        // console.log(shape.position.x, cardRef.current.clientWidth / 2)
        if (shape.position.x > cardRef.current.clientWidth / 2) {
            setLike('like')
            swipeComplete()
            console.log('like')
        } else if ((shape.position.x) < cardRef.current.clientWidth / -2) {
            setLike('dislike')
            swipeComplete()
            console.log('dislike')
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
                backgroundColor: `${color}`,
                transform : `translate3d(${shape.position.x}px, ${shape.position.y}px, 0) rotate(${shape.deg}deg)`,
                transition : `transform ${shape.duration}ms`,
                color: `${textColor}`
            }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            >
            <div className={cx('playerArea')}>
                <img className={cx('lpImg', {play: isPlaying ? true : false})} src='./img/lp.png'/>
                <div className={cx('resultLpImg', {play: isPlaying ? true : false})}>
                    <img ref={imgRef} className={cx('albumimg')} src={track.album.images[1].url}></img>
                </div>
                <canvas ref={canvasRef}></canvas>
            </div>
            <div className={cx('title')}> 
                <div className={cx('forblurLeft')}  style={{backgroundColor: `${color}`}}></div>
                <div className={cx('forblurRight')} style={{backgroundColor: `${color}`}}></div>
                <div className={cx('track')}>
                    <div className={cx('content')}>{track.name}</div>
                </div>
            </div>
            <div className={cx('album')}>
                <div className={cx('content')}>{track.album.name}</div>
            </div>
            <div className={cx('artist')}>
                <div className={cx('content')}>{track.artists[0].name}</div>
            </div>
            {track.preview_url && <img className={styles.playBtn} src={playValue} onClick={handlePlayClick}/>}
            <Video className="today" src={track.preview_url} isPlaying={isPlaying}></Video>
        </div>
    )
}
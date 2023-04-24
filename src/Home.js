import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { InputForm } from "./InputForm";
import { MusicSearch } from "./MusicSearch";
import { Video } from "./Video";
import { Logo } from "./Logo";
import classNames from 'classnames/bind';
import styles from "./Home.module.css";

export function Home() {
    const cx = classNames.bind(styles);
    const navigate = useNavigate();

    const [mood, setMood] = useState();
    const [seed, setSeed] = useState('');

    const [isPlaying, setIsPlaying] = useState(false);
    const PLAYBTN_IMGS = ['./img/play.png', './img/pause.png']
    const [playValue, setPlayValue] = useState(PLAYBTN_IMGS[0])

    useEffect(() => {
        console.log('seed', seed)
        setIsPlaying(false)
        setPlayValue(PLAYBTN_IMGS[0])
    }, [seed]);


    function onClickRecommendBtn(){
        console.log(mood)
        console.log(seed)
        navigate("/recommend", { state: {'mood': mood, 'seed': seed }});
    }

    function handlePlayClick(e) {
        if (isPlaying) {
          setIsPlaying(false)
          setPlayValue(PLAYBTN_IMGS[0])
        } else {
          setIsPlaying(true)
          setPlayValue(PLAYBTN_IMGS[1])
        } 
    }


    return (
    <div className={styles.frame}>
        <div className={styles.container}>
            <Logo className={styles.logo} title="TODAY"/>
    
            <div className={styles.turntable}>
                <img src='./img/turntable.png'/>
                { Object.keys(seed).length !== 0 && 
                 <div className={styles.playerArea}>
                    <div className={cx('resultLp')}>
                        <img className={cx({play: isPlaying ? true : false})} src='./img/lp.png'/>
                        <div className={cx('resultLpImg', {play: isPlaying ? true : false})}>
                            <img src={seed.album.imgs[1].url} />
                        </div>
                        <img className={styles.playBtn} src={playValue} onClick={handlePlayClick}/>
                    </div>
                    <Video className="today" src={seed.preview} isPlaying={isPlaying}></Video>
                 </div>
                 
                }
            </div>  
        </div>

        <div className={styles.container}>
            <InputForm setMood={setMood}/>
            <MusicSearch setSeed={setSeed}/>
            <button className={styles.recommendBtn} type="sumbit" onClick={onClickRecommendBtn}>Get Recommendation</button>
        </div>

    </div>
    );
}

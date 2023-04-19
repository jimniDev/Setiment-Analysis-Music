import { useEffect, useState } from "react";
import { InputForm } from "./InputForm";
import { MusicSearch } from "./MusicSearch";
import { Logo } from "./Logo";

import styles from "./Home.module.css";
import { Player } from "./Player";

export function Home() {
    const [mood, setMood] = useState();
    const [seed, setSeed] = useState();

    function onClickRecommendBtn(){
        console.log(mood)
        console.log(seed)
    }

    return (
    <div className={styles.frame}>
        <div className={styles.container}>
            <Logo title="TODAY"/>
            <Player></Player>

        </div>
        <div className={styles.container}>
            <InputForm setMood={setMood}/>
            <MusicSearch setSeed={setSeed}/>
            <button className={styles.recommendBtn} type="sumbit" onClick={onClickRecommendBtn}>Get Recommendation</button>
        </div>

    </div>
    );
}

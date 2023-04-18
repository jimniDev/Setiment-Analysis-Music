import { useEffect } from "react";
import { InputForm } from "./InputForm";
import { MusicSearch } from "./MusicSearch";
import { Logo } from "./Logo";

import styles from "./Home.module.css";

export function Home() {

  return (
  <div className={styles.frame}>
    <div className={styles.container}>
        <Logo />

    </div>
    <div className={styles.container}>
        <InputForm />
        <MusicSearch/>
        <button className={styles.recommendBtn} type="sumbit">Get Recommendation</button>
    </div>

  </div>
  );
}

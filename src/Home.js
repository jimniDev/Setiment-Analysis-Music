import { useEffect } from "react";
import { InputForm } from "./InputForm";
import { MusicSearch } from "./MusicSearch";

import styles from "./Home.module.css";

export function Home() {

  return (
  <div className={styles.frame}>
    <div className={`${styles.container}`}>Hi??</div>
    <div className={styles.container}>
        <InputForm />
        <MusicSearch/>
    </div>

  </div>
  );
}

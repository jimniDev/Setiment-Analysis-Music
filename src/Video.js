import classNames from "classnames";
import React, { memo, useEffect, useRef, useState } from "react";

import styles from "./Video.module.css";


export function Video({ className, src, isPlaying }) {
  // const [nowPlaying, setNowPlaying] = useState(false);
  const [source, setSource] = useState();
  const videoElement = useRef(null);
  const classProps = classNames(styles.video, className);

  useEffect(() => {
    if (src) {
      setSource(src);
      if (videoElement) {
        if (isPlaying) {
          console.log('play')
          videoElement.current.play();
        } else {
          console.log('pause')
          videoElement.current.pause();
        }
    }
    }
  }, [isPlaying]);


  return (
    <div className={styles.default}>
      <video
        // controls
        className={styles.classProps}
        loop={true}
        muted={false}
        ref={videoElement}
        playsInline={true}
        source src={source}
        type="audio/mpeg" 
      >
      </video>
    </div>
  );
};
import { useState } from "react";
import { useImmer } from 'use-immer';
import classNames from 'classnames/bind';
import styles from "./MusicSearch.module.css";
import { MusicSearchResult } from "./MusicSearchResult";
import TextField from '@mui/material/TextField';

export function MusicSearch(props) {
    const cx = classNames.bind(styles);
    const [inputMusic, updateInputMusic] = useImmer({
      userInput: {
        track: '',
        artist: ''
      },
      result: {}
    });

    const [status, setStatus] = useState('default');
    const [isPlaying, setIsPlaying] = useState(false);
    const PLAYBTN_IMGS = ['./img/play.png', './img/pause.png']
    const [playValue, setPlayValue] = useState(PLAYBTN_IMGS[0])

    function handleTrackChange(e) {
      updateInputMusic(m => {
          m.userInput.track = e.target.value
        });
    }

    function handleArtistChange(e) {
      updateInputMusic(m => {
        m.userInput.artist = e.target.value
      });
    }

    function handleSubmit(e) {
      // alert('A music was submitted: '+ inputMusic);
      e.preventDefault();

      const params = {
        track: inputMusic.userInput.track,
        artist: inputMusic.userInput.artist,
      }
      const queryString = new URLSearchParams(params).toString();
      console.log(queryString)

      fetch(`/search?${queryString}`
      ).then(
        res => res.json(),
        setStatus("Waiting")
      ).then(
        data => {
          console.log(data)
          if (data.message === "SUCCESS") {
            updateInputMusic(m => {
              m.result= data.result // 다시 오브젝트로 변경
            })
            setStatus("Complete")
          } else {
            setStatus("Error")
          }
          // localStorage.setItem('music', JSON.stringify(inputMusic)) //오브젝트-> Json 으로 저장
          // const getValue = localStorage.getItem('music');
          // console.log('result~~~~', JSON.parse(getValue))
          // console.log(inputMusic);
          
        }
      ).catch(err => {
        setStatus("Error")
        alert(err)
      });
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
      <div className={styles.musicArea}>
        <label className={styles.musicAreaLabel}>Today's Music</label>
        <form className={styles.formArea} onSubmit={handleSubmit}>
          <div className={styles.trackField}>
            <TextField  id="standard-basic" label="Track" variant="standard" color="warning" focused 
                        value={inputMusic.userInput.track} onChange={handleTrackChange} />
          </div>
          <div className={styles.artistField}>
            <TextField  id="standard-basic" label="Artist" variant="standard" color="warning" 
                        value={inputMusic.userInput.artist} onChange={handleArtistChange} />
          </div>

          <input className={styles.searchBtn} type="submit" value="🎵"/>
          {status == "Complete" &&
            <div className={styles.playerArea}>
              <div className={cx('resultLp')}>
                <img className={cx({play: isPlaying ? true : false})} src='./img/lp.png'/>
                <div className={cx('resultLpImg', {play: isPlaying ? true : false})}>
                  <img src={inputMusic.result.imgs[1].url} />
                </div>
                <img className={styles.playBtn} src={playValue} onClick={handlePlayClick}/>
              </div>
            </div>
          }
        </form>

        <div>
          {/* {status == "Complete" &&
          <div>
            <p>{inputMusic.result.album}</p>
            <p>{inputMusic.result.artist}</p>
            <p>{inputMusic.result.name}</p>
            <img src={inputMusic.result.imgs[1].url}></img>
            <MusicSearchResult result={inputMusic.result}/>
          </div>
          } */}
          {status == "Error" &&
            <p>스포티파이가 알아듣게 영어로 써야돼요.,,</p>
          }
          
        </div>
      </div>
    )
}


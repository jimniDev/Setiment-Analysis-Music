import { useState, useRef } from "react";
import { useEffect } from "react";
import { useImmer } from 'use-immer';
import classNames from 'classnames/bind';
import styles from "./MusicSearch.module.css";
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
    const canvasRef = useRef();

    useEffect(() => {
      canvasRef.current.style.display='none'
      props.setSeed(inputMusic.result) // result to Home Component
    }, [inputMusic.result]);

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
              m.userInput.track = data.result.name
              m.userInput.artist = data.result.artist.name
            })
            setStatus("Complete")
            getColorFromImg(data.result.album.imgs[1].url)
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

    function getColorFromImg(img){
      if (!canvasRef) return;
      var canvas = canvasRef
      var ctx = canvas.current.getContext("2d")
      canvas.current.style.display='none'
      
      const IMG = new Image();
      IMG.src = img;
      IMG.crossOrigin="Anonymous"
      
      IMG.onload = function() {
          console.log('img!', IMG.height)
          canvas.height = IMG.height
          canvas.width = IMG.width
          ctx.drawImage(IMG, 0, 0);
          var id = ctx.getImageData(0, 0, canvas.width, canvas.height)
          var i = 4;
          props.setColor(`rgba(${id.data[i]}, ${id.data[i+1]}, ${id.data[i+2]}, ${id.data[i+3]})`);
          }
    }

    return (
      <div className={styles.musicArea}>
        <label className={styles.musicAreaLabel}>Today's Music</label>
        <form className={styles.formArea} onSubmit={handleSubmit}>
          <div className={styles.trackField}>
            <TextField  id="outlined-basic" label="Track" variant="standard"  color="success" size="small" focused
                        value={inputMusic.userInput.track} onChange={handleTrackChange} />
          </div>
          <div className={styles.artistField}>
            <TextField  id="outlined-basic" label="Artist" variant="standard"  color="success" size="small" focused
                        value={inputMusic.userInput.artist} onChange={handleArtistChange} />
          </div>
          <input className={styles.searchBtn} type="submit" value="🎵"/>
        </form>

        <div className={styles.errorField}>
          {status == "Error" &&
            <p>No Result on Spotify</p>
          }
        </div>
        <canvas ref={canvasRef}></canvas>
      </div>
    )
}

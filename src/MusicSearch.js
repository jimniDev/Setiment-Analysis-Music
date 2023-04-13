import { useState } from "react";
import { useImmer } from 'use-immer';

export function MusicSearch(props) {
    const [inputMusic, updateInputMusic] = useImmer({
      userInput: {
        track: '',
        artist: ''
      },
      result: {}
    });

    const [status, setStatus] = useState('default');

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
      alert('A music was submitted: '+ inputMusic);
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
        alert(err);
      });
    }

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <label>
          <h1>Music search</h1>
          <label>Track</label>
          <input value={inputMusic.userInput.track} onChange={handleTrackChange} />
          <label>Artist</label>
          <input value={inputMusic.userInput.artist} onChange={handleArtistChange} />
          </label>
          <input type="submit" value="Submit"/>
        </form>
        <div>
          {status == "Complete" &&
          <div>
            <p>{inputMusic.result.album}</p>
            <p>{inputMusic.result.artist}</p>
            <p>{inputMusic.result.name}</p>
            <img src={inputMusic.result.imgs[1].url}></img>
          </div>
          }
          {status == "Error" &&
            <p>스포티파이가 알아듣게 영어로 써야돼요.,,</p>
          }
        </div>
      </div>
    )
}


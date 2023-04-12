import { useState, useEffect } from "react";
import { SetimentChart } from "./SetimentChart";
import styles from "./InputForm.module.css";
import { CurrentDate } from "./CurrentDate";

export function InputForm(props) {
    const [analysis, setAnalysis] = useState({
      userInput: '',
      result: [],
    });
    const [status, setStatus] = useState('default');

    useEffect(() => {
      setStatus()
    }, [])

    function handleChange(e) {
        setAnalysis({
          ...analysis,
          userInput: e.target.value
        });
    }
  
    function handleSubmit(e) {
        alert('A Sentence was submitted: ' + analysis.userInput);
        e.preventDefault();

        fetch("/analysis", {
            method: "POST",
            headers: {
              'Content-type': 'application/json'
          },
            body: JSON.stringify({
              text: analysis.userInput,
            })
          }
          ).then(
            res => res.json(),
            setStatus("Waiting")
          ).then(
            data => {
              console.log(data)
              setStatus("Complete")
              setAnalysis({
                ...analysis,
                result: data // 다시 오브젝트로 변경
              })
              // localStorage.setItem('res', JSON.stringify(analysis)) //오브젝트-> Json 으로 저장
              // const getValue = localStorage.getItem('res');
              // console.log('result~~~~', JSON.parse(getValue))
              console.log(analysis);
              
            }
          )
    }

    return (
      <div className={styles.sentimentArea}>
        <div className={styles.sentimentAreaUp}>
          <CurrentDate />
          <form className={styles.wrapper} onSubmit={handleSubmit}>
            <label className={styles.label} htmlfor="diary" >Today's Diary</label>
            <textarea className={styles.textarea} id="diary" value={analysis.userInput} onChange={handleChange} />
            <input className={styles.writeBtn} type="submit" value="✍"/>
          </form>
        </div>
        <div className={styles.sentimentAreaDown}>
          <div className={styles.result} status={status}>
            <h3>{status}</h3>
            {analysis.result.top && <h3>{analysis.result.top.val}</h3>}

            <SetimentChart analysis={analysis}/>
          </div>
        </div>

      </div>
    )
}


import { useState, useEffect } from "react";
import { SetimentChart } from "./SetimentChart";
import styles from "./InputForm.module.css";
import { CurrentDate } from "./CurrentDate";
import { Dna } from  'react-loader-spinner'


export function InputForm(props) {
    const [analysis, setAnalysis] = useState({
      userInput: '',
      result: {},
    });
    const [status, setStatus] = useState("unwrite");

    useEffect(() => {
      props.setMood(analysis) // result to Home Component
    }, [analysis.result]);

    function handleChange(e) {
        setAnalysis({
          ...analysis,
          userInput: e.target.value
        });
    }
  
    function handleSubmit(e) {
        // alert('A Sentence was submitted: ' + analysis.userInput);
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
              console.log(data) // 이미 Object
              setStatus("Complete")
              setAnalysis({
                ...analysis,
                result: data 
              })
              // localStorage.setItem('res', JSON.stringify(analysis)) //오브젝트-> Json 으로 저장
              // const getValue = localStorage.getItem('res');
              // console.log('result~~~~', JSON.parse(getValue))
            }
          )
          props.setMood(analysis) // result to Home Component
    }

    return (
      <div className={styles.sentimentArea}>
        <div className={styles.sentimentAreaUp}>
          <CurrentDate />
          <form className={styles.wrapper} onSubmit={handleSubmit}>
            <label className={styles.label} htmlFor="diary" >Today's Diary</label>
            <textarea className={styles.textarea} id="diary" value={analysis.userInput} onChange={handleChange} />
            <input className={styles.writeBtn} type="submit" value="✍"/>
          </form>
        </div>
        <div className={styles.sentimentAreaDown}>
          <div className={styles.result} status={status}>
            {status === "unwrite" && <p> Write a diary📓 to check today's mood🧘‍♂️</p>}
            {status === "Waiting" && 
              <Dna
                visible={true}
                height="80"
                width="80"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
              />
            }
            {status === "Complete" && 
              <SetimentChart analysis={analysis}/>
            }
          </div>
        </div>

      </div>
    )
}


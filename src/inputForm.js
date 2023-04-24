import { useState, useEffect, useRef } from "react";
import { SetimentChart } from "./SetimentChart";
import styles from "./InputForm.module.css";
import { CurrentDate } from "./CurrentDate";
import { Oval } from  'react-loader-spinner'
import classNames from 'classnames/bind';

export function InputForm(props) {
    const cx = classNames.bind(styles);
    const [analysis, setAnalysis] = useState({
      userInput: '',
      result: {},
    });
    const [status, setStatus] = useState("unwrite");
    const [message, setMessage] = useState("일기를 분석중입니다");

    useEffect(() => {
      props.setMood(analysis) // result to Home ComponentE
    }, [analysis.result]);

    function handleChange(e) {
        setAnalysis({
          ...analysis,
          userInput: e.target.value
        });
    }

    // function messageChange() {
    //   setInterval(() => {
    //     if (message == "음악과 함께 기다려주세요!") {
    //       setMessage(s => s="일기를 분석 중입니다")
    //     } else {
    //       setMessage(s => s="음악과 함께 기다려주세요!")
    //     }
    //   }, 1000);
    // }
  
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
            setStatus("Waiting"),
            // messageChange()
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
            {/* { status === "Waiting" &&  <div className={cx('message')}>{message}</div>} */}
            {status === "unwrite"  && <input className={styles.writeBtn} type="submit" value="✍"/>}
            {status === "Waiting" && 
            <div className={styles.waiting}>
                <Oval
                  height={30}
                  width={30}
                  color="#ffffff"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                  ariaLabel='oval-loading'
                  secondaryColor="#ffffff"
                  strokeWidth={8}
                  strokeWidthSecondary={8}
                />
              </div>
            }
            {status === "Complete"  && <input className={styles.complete} type="submit" value="✔"/>}
          </form>
        </div>
        {status === "Complete" && <div className={styles.sentimentAreaDown}>
          <div className={styles.result} status={status}>
            {status === "unwrite" && <p> Write a diary📓 to check today's mood🧘‍♂️</p>}
            {status === "Waiting" && 
              <Oval
                height={30}
                width={40}
                color="#ffffff"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel='oval-loading'
                secondaryColor="#4fa94d"
                strokeWidth={8}
                strokeWidthSecondary={8}
              />
            }
            {status === "Complete" && 
              <SetimentChart analysis={analysis}/>
            }
          </div>
        </div>}

      </div>
    )
}


import DonutChart from 'react-donut-chart';
import styles from "./SetimentChart.module.css";

export function SetimentChart(analysis) {
  console.log(analysis)
  console.log(analysis.analysis.result)

  let chartData = []
  let resObj = analysis.analysis.result

  for (const [k,v] of Object.entries(resObj)) {
    let kor = ''
    if (k === "anger") {
      kor = "분노"
    } else if (k === "anxiety") {
      kor = "불안"
    } else if (k === "embarrassment") {
      kor = "당황"
    } else if (k === "hurt") {
      kor = "상처"
    } else if (k === "joy") {
      kor = "기쁨"
    } else if (k === "sadness") {
      kor = "슬픔"
    }  
    chartData.push({
      label: kor,
      value: v
    })
  }
  chartData = chartData.sort(function(a, b){
    return b.value - a.value
  });
  console.log(chartData)
//   {
//     "analysis": {
//         "userInput": "우리의 밤은 셀 수 없는 별들과 모래알 그사이",
//         "result": {
//             "anger": 4.474,
//             "anxiety": 3.889,
//             "embarrassment": 2.429,
//             "hurt": 4.111,
//             "joy": 30.648,
//             "sadness": 54.449,
//             "top": {
//                 "num": 3,
//                 "val": "슬픔"
//             }
//         }
//     }
// }

  return(
    <div style={styles} className={styles.box}>
      <h1>{analysis.userInput}</h1>
      <DonutChart
        data={chartData}
        // className={true}
        width={450}
        height={300}
        clickToggle={false}
        interactive={true}
    />
    </div>
    
  )
} 
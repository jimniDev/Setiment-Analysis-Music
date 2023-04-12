import DonutChart from 'react-donut-chart';
import styles from "./SetimentChart.module.css";

export function SetimentChart(analysis) {
  console.log(analysis)

  return(

    <div>
      <h1>{analysis.userInput}</h1>
      <DonutChart
        data={[
          {
            label: "joy",
            value: 5.2,
          },
          {
            label: "anxiety",
            value: 3,
            isEmpty: false,
          },
          {
            label: "hurt",
            value: 2,
            isEmpty: false,
          },
          {
            label: "embarrassment",
            value: 1,
            isEmpty: false,
          },
          {
            label: "sadness",
            value: 1,
            isEmpty: false,
          },
          {
            label: "anger",
            value: 1,
            isEmpty: false,
          },  
        ]}
        // className={true}
        
        interactive={true}
        // data = {[
        //   Object.entries(ordered.orderDetails).map(([k, v]) =>
        //   {
        //     label: {k},
        //     value: {v},
        //   },
        //   )
        // ]}
    />
    </div>
    
  )
} 
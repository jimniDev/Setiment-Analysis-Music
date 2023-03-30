import { useEffect } from "react";
import { fireStore } from "./Firebase";

function App() {

  useEffect(() => {
    console.log(fireStore);

    fetch("/analysis", {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
    },
      body: JSON.stringify({
        text: "날씨좋음",
      })
    }
    ).then(
      // response 객체의 json() 이용하여 json 데이터를 객체로 변화
      res => res.json()
    ).then(
      // 데이터를 콘솔에 출력
      data => console.log(data)
    )
  });

  return <div className="App">{fireStore._databaseId.projectId}h8u</div>;
}

export default App;
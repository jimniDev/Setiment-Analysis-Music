import { useEffect } from "react";
import { fireStore } from "./Firebase";
import { InputForm } from "./inputForm";

function App() {

  useEffect(() => {
    console.log(fireStore);
  });

  return <div className="App">
    <InputForm />
  </div>;
}

export default App;
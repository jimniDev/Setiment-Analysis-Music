import { useEffect } from "react";
import { fireStore } from "./Firebase";
import { InputForm } from "./InputForm";
import { CardSet } from "./CardSet";

function App() {

  useEffect(() => {
    console.log(fireStore);
  });

  return <div className="App">
    <InputForm />
    <CardSet />
  </div>;
}

export default App;
import { useEffect } from "react";
import { fireStore } from "./Firebase";
import { InputForm } from "./InputForm";
import { CardSet } from "./CardSet";
import { MusicSearch } from "./MusicSearch";
import { CurrentDate } from "./Date";


function App() {

  useEffect(() => {
    console.log(fireStore);
  });

  return <div className="App">
    <CurrentDate></CurrentDate>
    <InputForm />
    <MusicSearch/>
  </div>;
}

export default App;
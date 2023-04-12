import { useEffect } from "react";
import { fireStore } from "./Firebase";
import { CardSet } from "./CardSet";
import { Home } from "./Home";
import './App.css';


function App() {

  useEffect(() => {
    console.log(fireStore);
  });

  return <div className="App">
    <Home></Home>
  </div>;
}

export default App;
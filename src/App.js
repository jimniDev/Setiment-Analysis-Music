import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from "react";
import { fireStore } from "./Firebase";
import { CardSet } from "./CardSet";
import { Home } from "./Home";
import { Archive } from "./Archive";
import { Header } from "./Header";
import './App.css';


function App() {

  useEffect(() => {
    console.log(fireStore);
  });

  return(
  <BrowserRouter>
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/archive" element={<Archive />} />
        <Route path="/recommend" element={<CardSet />} />
      </Routes>
    </div>
  </BrowserRouter>

  );
}

export default App;
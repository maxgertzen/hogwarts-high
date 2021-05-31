import logo from "./logo.svg"
import "./App.css"
import Phase1 from "./components/Phase1"
import React, { useState } from "react";
import Phase2 from "./components/Phase2";

function App() {
  const [inputData, setInputData] = useState({})
  const [presentedPhase, setPresentedPhase] = useState(0);

  const handleNext = (dataObj) => {
    setInputData((prevObj) => ({
      ...prevObj,
      ...dataObj
    }))
    if (presentedPhase > -1) {
      setPresentedPhase(presentedPhase => presentedPhase + 1)
    }
  }

  const handlePrev = (dataObj) => {
    setInputData((prevObj) => ({
      ...prevObj,
      ...dataObj
    }))
    if (presentedPhase > -1) {
      setPresentedPhase(presentedPhase => presentedPhase - 1)
    }
  }
  return (
    <div className="App">
      {
        presentedPhase === 0 ? <Phase1 onNextPhase={handleNext} />
          : presentedPhase === 1 ? <Phase2 onNextPhase={handleNext} prevPhase={handlePrev} />
            : presentedPhase === 2 ? <Phase3 onNextPhase={handleNext} prevPhase={handlePrev} />
              : presentedPhase === 3 ? <Summery data={inputData} /> : null
      }
    </div>
  )
}

export default App

import "./App.css"
import React, { useState } from "react";
import Phase1 from "./components/Phase1"
import Phase2 from "./components/Phase2";
import Phase3 from "./components/Phase3"
import Summary from "./components/Summary";

function App() {
  const [inputData, setInputData] = useState({})
  const [presentedPhase, setPresentedPhase] = useState(0);

  const handleNext = (dataObj) => {
    console.error('HandleNext')
    console.table(dataObj)
    setInputData((prevObj) => ({
      ...prevObj,
      ...dataObj
    }))
    if (presentedPhase > -1) {
      setPresentedPhase(presentedPhase => presentedPhase + 1)
    }
  }

  const handlePrev = (dataObj) => {
    console.error('HandlePrev')
    console.table(dataObj)
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
              : presentedPhase === 3 ? <Summary data={inputData} /> : null
      }
    </div>
  )
}

export default App

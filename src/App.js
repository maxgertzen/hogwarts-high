import "./App.css"
import React, { useState } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Phase1 from "./components/Phase1"
import Phase2 from "./components/Phase2"
import Phase3 from "./components/Phase3"
import Summary from "./components/Summary"

function App() {
  const [inputData, setInputData] = useState({})
  const [presentedPhase, setPresentedPhase] = useState(0)

  const handleNext = (dataObj) => {
    setInputData((prevObj) => ({
      ...prevObj,
      ...dataObj,
    }))
    if (presentedPhase > -1) {
      setPresentedPhase((presentedPhase) => presentedPhase + 1)
    }
  }

  const handlePrev = (dataObj) => {
    setInputData((prevObj) => ({
      ...prevObj,
      ...dataObj,
    }))
    if (presentedPhase > -1) {
      setPresentedPhase((presentedPhase) => presentedPhase - 1)
    }
  }
  return (
    <div className="App mt-5">
      <Router>
        <Switch>
          <Route exact path="/">
            <Phase1 onNextPhase={handleNext} />
          </Route>
          <Route exact path="/phase-2">
            <Phase2 onNextPhase={handleNext} prevPhase={handlePrev} />
          </Route>
          <Route exact path="/phase-3">
            <Phase3 onNextPhase={handleNext} prevPhase={handlePrev} />
          </Route>
          <Route exact path="/summary">
            <Summary data={inputData} />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App

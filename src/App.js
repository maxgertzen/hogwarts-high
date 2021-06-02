import React, { useState } from "react"
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
import "./App.css"
import Phase1 from "./components/Phase1"
import Phase2 from "./components/Phase2"
import Phase3 from "./components/Phase3"
import Summary from "./components/Summary";
import FormPagination from "./components/FormPagination/FormPagination"
import PrivateRoute from "./components/PrivateRoute/PrivateRoute"


function App() {
  const [inputData, setInputData] = useState({})
  const [presentedPhase, setPresentedPhase] = useState(1)
  const [isFormActive, setIsFormActive] = useState(false);

  const handleNext = (dataObj) => {
    setInputData((prevObj) => ({
      ...prevObj,
      ...dataObj,
    }))
    if (presentedPhase < 4) {
      setPresentedPhase((presentedPhase) => presentedPhase + 1)
    }
    if (!isFormActive) setIsFormActive(true)
  }

  const handlePrev = (dataObj) => {
    setInputData((prevObj) => ({
      ...prevObj,
      ...dataObj,
    }))
    if (presentedPhase > 0) {
      setPresentedPhase((presentedPhase) => presentedPhase - 1)
    }
  }
  return (
    <div className="App mt-5">
      <Router>
        <FormPagination url={presentedPhase} />
        <Switch>
          <Route exact path="/">
            <Phase1 onNextPhase={handleNext} />
          </Route>
          <PrivateRoute path="/phase-2" isActive={isFormActive}>
            <Phase2 onNextPhase={handleNext} prevPhase={handlePrev} />
          </PrivateRoute>
          <PrivateRoute exact path="/phase-3" isActive={isFormActive}>
            <Phase3 onNextPhase={handleNext} prevPhase={handlePrev} />
          </PrivateRoute>
          <PrivateRoute exact path="/summary" isActive={isFormActive}>
            <Summary data={inputData} />
          </PrivateRoute>
        </Switch>
      </Router>
    </div>
  )
}

export default App

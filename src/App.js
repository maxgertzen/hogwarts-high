import logo from "./logo.svg"
import "./App.css"
import Phase1 from "./components/Phase1"

function App() {
  const onNextPhase = () => {
    console.log("Hello")
  }

  return (
    <div className="App">
      <Phase1 onNextPhase={onNextPhase} />
    </div>
  )
}

export default App

import { Route, Routes } from "react-router"
import Home from "./components/Home/Home"


function App() {

  return (
    <>
      <Routes>
          <Route index element={<Home />}></Route>
      </Routes>
    </>
  )
}

export default App

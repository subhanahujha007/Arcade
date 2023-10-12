import {BrowserRouter,Routes,Route} from "react-router-dom"
import  Navbar from "./Components/Navbar";
import About from "./Components/About.jsx";
import Project from "./Components/Project";
import "./styles/Navbar.scss"
import Contact from "./Components/Contact.jsx"
import Main from "./Components/Main"
function App() {
  return (<BrowserRouter>
  <Navbar>
  <Routes>
    <Route element={<Main/>} path="/"/>
    <Route element={<Contact/>} path="/contact"/>
    <Route element={<About/>} path="/about" />
    <Route element={<Project/>} path="/project" />
  </Routes>
  </Navbar>
  </BrowserRouter>)
}

export default App;

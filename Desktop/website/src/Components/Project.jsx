import {React} from 'react'
import {motion} from "framer-motion"
import { Link } from 'react-router-dom'
import "../styles/project.scss"
const Project = () => {
  return (
    <div>
      <motion.h1 animate={{y:20,transition:{duration:0.3}}} initial={{y:-100,x:450}} >PROJECT</motion.h1>
    <div className="container"> 
    <motion.div className="pro youtube" animate={{scale:1,transition:{duration:0.5}}} initial={{scale:0}}><a href="https://reactproject-self.vercel.app/"></a> </motion.div>
    <motion.div className="pro cart" animate={{scale:1,transition:{duration:0.5,delay:0.3}}} initial={{scale:0}}><Link to="https://reactcart-phi.vercel.app/"></Link></motion.div>
      <motion.div className="pro netflix" animate={{scale:1,transition:{duration:0.5,delay:0.6}}} initial={{scale:0}}><Link to="https://netflix-clone-wine-psi.vercel.app/"></Link></motion.div>
      <motion.div className="pro chat" animate={{scale:1,transition:{duration:0.5,delay:0.9}}} initial={{scale:0}}><Link to="https://subhanshuchatapp.netlify.app/"></Link></motion.div> </div>
  
    </div>
  )
}

export default Project
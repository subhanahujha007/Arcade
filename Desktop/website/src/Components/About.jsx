import {React,useState} from 'react'
import {BiLogoReact,BiLogoJavascript,BiLogoCss3,BiLogoHtml5} from "react-icons/bi"
import "../styles/about.scss"
import { motion } from 'framer-motion'
const About = () => {
  const [show,settshow]=useState(false);
  const[education,setteducation]=useState(false);
  const[hobbie,setthobbie]=useState(false);
  return (
    <div className="about">
        <motion.div animate={{opacity:1,x:300,transition:{
          duration:1,
          delay:0.5,
        }}} initial={{opacity:0,x:-101}} className="heading"><h1>ABOUT</h1></motion.div>
       
        <motion.div
        className="skills"
  whileHover={{scale:1.1}}
  animate={{opacity:1,x:-200,y:110,transition:{
    duration:1,
    delay:0.5
  }}} initial={{opacity:0,x:-101}}
  transition={{layout:{
    duration:1,
    type:"spring"
  }}}
  layout
  onClick={()=>settshow(!show)}
        >
            <h1 style={{backgroundColor:"purple"}}>Skills</h1>
            {show && (
              <motion.p
              style={{width:"200px",color:"white",zIndex:"1234",backgroundColor:"purple"}}
              animate={{opacity:1,scale:1}}
               initial={{opacity:0,scale:0}}>
               <BiLogoReact size={"3rem"} />
               <BiLogoJavascript size={"3rem"}/>
               <BiLogoCss3 size={"3rem"}/>
               <BiLogoHtml5 size={"3rem"}/>
                 </motion.p>
            )}
        </motion.div>
        <motion.div
        className="education"
  whileHover={{scale:1.1}}
  animate={{opacity:1,scale:1,x:100,y:110,transition:{
    duration:1,
    delay:0.5
  }}} initial={{opacity:0,x:-101,scale:0}}
  transition={{layout:{
    duration:1,
    type:"spring"
  }}}
  layout
  onClick={()=>setteducation(!education)}
        >
            <h1 style={{backgroundColor:"purple"}}>EDUCATION</h1>
            {education && (
              <motion.p
              style={{width:"400px",color:"white",zIndex:"1234",backgroundColor:"purple"}}
              animate={{opacity:1}}
               initial={{opacity:0}}>
               <h1 className="text">Guru Tegh Bahadur Institute of Tech : 7.8gpa</h1>
               <h1 className="text">Class 12th: 89%</h1>
               <h1 className="text">Class 10th: 80%</h1>
                 </motion.p>
            )}
        </motion.div>
       
        <motion.div
        className="hobbies"
        
  whileHover={{scale:1.1}}
  animate={{opacity:1,scale:1,x:-200,y:300,transition:{
    duration:1,
    delay:0.5
  }}} initial={{opacity:0,scale:0,x:-101}}
  transition={{layout:{
    duration:1,
    type:"spring"
  }}}
  layout
  onClick={()=>setthobbie(!hobbie)}
        >
            <h1 style={{backgroundColor:"purple"}}>HOBBIES</h1>
            {hobbie && (
              <motion.p
              style={{width:"400px",color:"white",zIndex:"1234",backgroundColor:"purple"}}
              animate={{opacity:1}}
               initial={{opacity:0}}>
               <h1 className="text">Weight Training</h1>
               <h1 className="text">Watching Sports:MMA</h1>
               <h1 className="text" >Learning New Skills</h1>
                 </motion.p>
            )}
        </motion.div>

        
        </div>
  )
}

export default About
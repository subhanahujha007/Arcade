import React from 'react'
import {motion} from "framer-motion"
import "../styles/Main.scss"
const Main= () => {
  return (
    <>
    <div>
       <section className="jagah">
        <motion.div  initial={{y:-1000}} className="content" animate={{y:10,transition:{type:"spring",damping:9,duration:2,delay:0.5}}}><h1>Hello everyone </h1><h1  >
          <br />I am </h1><motion.h1 initial={{opacity:0}} animate={{opacity:1,transition:{
            duration:1,
            delay:2
          }}}
          drag
          dragConstraints={{left:40,right:40,top:40,bottom:40}}
          >Subhanshu Jha</motion.h1><br /><h1> passionate React developer</h1>
           </motion.div>
           <button>Download Resume</button>
       </section>
    </div>
    </>
  )
}

export default Main
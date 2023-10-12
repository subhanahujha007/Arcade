import {React,useState} from 'react'
import {AnimatePresence, motion} from "framer-motion"
import { NavLink } from 'react-router-dom'
import {FcAbout} from "react-icons/fc"
import {AiOutlineBars,AiFillProject} from "react-icons/ai"
import {BiSolidHome} from "react-icons/bi"
import {GrContact} from "react-icons/gr"
import {BsLinkedin,BsInstagram} from "react-icons/bs"
import {AiFillGithub} from "react-icons/ai"

const routes=[{
path : "/",
name : "Home",
icon : <BiSolidHome/>
},
{
  path : "/about",
  name : "About",
  icon : <FcAbout/>
},{
  path : "/contact",
  name : "contact",
  icon : <GrContact/>
},{
  path:"/project",
  name:"project",
  icon:<AiFillProject/>
}]


const Navbar = ({children}) => {
  const[isopen,setopen]=useState(false);
  const toggle=()=>setopen(!isopen);
  
  return (<div className="main">
    <motion.div className="navbar" animate={{width:isopen?"10%":"0%",transition:{
      type:"spring",
      damping:7,
      duration:"10s"
    }}} initial={{width:"0%"}} >
      <div className="logo">
        <h1>Sj</h1>
        <AiOutlineBars size={"3rem"} color="white"  onClick={toggle} />
      </div><div className='links'>
       <AnimatePresence>{ isopen &&
          (routes.map((route)=>(
              <NavLink activeclassname="active"  className="a"   to={route.path} key={route.name} >
                <motion.div className="i" >{route.icon}</motion.div>
               
              </NavLink>
          ))
        )}</AnimatePresence>
        </div><div   className="socals">
        <BsLinkedin size={"1.5rem"} href=''  />
        <BsInstagram size={"1.5rem"} href=''/>
        <AiFillGithub size={"1.5rem"} href=''/>
       </div>
       </motion.div>
       <main>
        {children}
       </main>
       </div>
  );
};

export default Navbar
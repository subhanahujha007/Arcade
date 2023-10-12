import {useRef,React} from 'react'
import {motion} from"framer-motion"
import "../styles/contact.scss"
import emailjs from "@emailjs/browser"
const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_iy9g8hh', 'template_tfk61vl', form.current, 'UaBuiAgbPrSgKJ59i')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };

  return (
    <form ref={form} onSubmit={sendEmail}>
      <motion.h1  className="heading" animate={{opacity:1,y:20}} initial={{opacity:0,y:-25,x:300,transition:{delay:0.5,duration:1.5}}}>CONTACT ME..</motion.h1>
      <label>Name</label>
      <motion.input placeholder="enter your name" className="name" animate={{opacity:1,transition:{delay:0,duration:0.3}}} initial={{opacity:0}} type="text" name="user_name" />
      <label>Email</label>
      <motion.input placeholder="enter your email" className="email" animate={{opacity:1,transition:{delay:0.3,duration:0.3}}} initial={{opacity:0}} type="email" name="user_email" />
      <label>Message</label>
      <motion.textarea placeholder="enter here..."  className="textarea" animate={{opacity:1,transition:{delay:0.6,duration:0.3}}} initial={{opacity:0}} name="message" />
      <motion.input className="button" animate={{opacity:1,transition:{delay:0.9,duration:0.3}}} initial={{opacity:0}} type="submit" value="Send" />
    </form>)
}

export default Contact
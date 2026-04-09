import { signInWithPopup } from "firebase/auth";
import { motion } from "motion/react";
import { FcGoogle } from "react-icons/fc";
import { auth,provider } from "../utils/firebase";
import axios from "axios"
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import Feature from "../components/Feature";

const Auth = () => {
  const dispatch=useDispatch()

  const handleGoogleAuth=async()=>{
    try {
      const response=await signInWithPopup(auth,provider)
     
      const User=response.user
      const name=User.displayName
      const email=User.email

      const result=await axios.post(serverUrl+"/api/auth/google",{name,email},{withCredentials:true})
      dispatch(setUserData(result.data))
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="min-h-screen overflow-hidden bg-white text-black px-8">
      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
        className="max-w-7xl mx-auto mt-8 rounded-2xl bg-black/80 backdrop:-blur-xl border border-white/10 px-8 py-6 shadow-[0_20px_45px_rgba(0,0,0,0,0.6)"
      >
        <h1 className="text-2xl font-bold bg-linear-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">
          Exam Notes AI
        </h1>
        <p className="text-sm text-gray-300 mt-1">
          AI powered exam-oriented notes & revision
        </p>
      </motion.header>
      <main className="max-w-7xl mx-auto py-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5 }}
        >
          <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight bg-linear-to-br from-black/90 via-black/60 to-black/90 bg-clip-text text-transparent">
            UNlock Smart <br />
            AI Notes
          </h1>
          <motion.button
          onClick={handleGoogleAuth}
            className="mt-10 px-10 py-3 rounded-xl flex item-center gap-3 bg-linear-to-br from-black/90 via-black/80 to-black/90 border border-white/10 text-white font-semibold text-lg shadow-[0_25px_60px_rgba(0,0,0,0,0.7)]"
            whileHover={{
              y: -10,
              rotateX: 8,
              rotateY: -8,
              scale: 1.07,
            }}
            whileTap={{ scale: 0.57 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
          >
            <FcGoogle size={22} />
            Continue With Google
          </motion.button>
          <p className="mt-6 max-w-xl text-lg bg-linear-to-br from-gray-700 via-gray-500/80 to-gray-700 bg-clip-text text-transparent">
            You get <span className="font-semibold">50 Free credits</span> to
            create download clean PDFs - instantly using AI
          </p>
          <p className="mt-4 text-sm  text-gray-500">
            Start with 50 free credits . Upgrade anytime for more credits .
            Instant access
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <Feature icon={"🎁"} title="50 Free Credits" des="Start with 50 credits to generate notes without paying"/>
            <Feature icon={"📘"} title="Exam Notes" des="High-yield , revision-ready exam-oriented notes."/>
            <Feature icon={"📂"} title="Projects Notes" des="Well-structured documentation for assignments & projects."/>
            <Feature icon={"📊"} title="Charts & Graphs" des="Auto-generated diagrams, charts and flow graphs"/>
            <Feature icon={"⬇️"} title="Free PDF Dowlnload" des="Download clean, printable PDFs"/>

        </div>
      </main>
    </div>
  );
};



export default Auth;

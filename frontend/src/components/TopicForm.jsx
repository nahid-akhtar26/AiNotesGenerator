import { motion } from "motion/react";
import { useState } from "react";
import ToggleBtn from "./ToggleBtn";
import { generateNotes } from "../services/api";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateCredits } from "../redux/userSlice";

const TopicForm = ({ setResult, setLoading, loading, setError }) => {
  const [topic, setTopic] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [examType, setExamType] = useState("");
  const [revisionMode, setRevisionMode] = useState(false);
  const [includeDiagram, setIncludeDiagram] = useState(false);
  const [includeChart, setIncludeChart] = useState(false);

  const [progress, setProgress] = useState(0);
  const [progressText, setProgressText] = useState("");

  const dispatch=useDispatch()

  const handleSubmit = async () => {
    if (!topic.trim()) {
      setError("Please enter the topic");
      return;
    }
    setError("");
    setLoading(true);
    setResult(null);
    try {
      const result = await generateNotes({
        topic,
        classLevel,
        examType,
        revisionMode,
        includeDiagram,
        includeChart,
      });
      setResult(result.data);
      setLoading(false);
      setClassLevel("")
      setTopic("")
      setExamType("")
      setIncludeChart(false)
      setRevisionMode(false)
      setIncludeDiagram(false)

      if(typeof result.creditsLeft ==="number"){
        dispatch(updateCredits(result.creditsLeft))
      }

    } catch (error) {
      console.log(error);
      setError("Failed to fetch notes from server");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!loading) {
      setProgress(0);
      setProgressText("");
      return;
    }
    let value = 0;
    const interval = setInterval(() => {
      value += Math.random() * 8;
      if (value >= 95) {
        value = 95;
        setProgressText("Almost done...");
        clearInterval(interval);
      } else if (value > 70) {
        setProgressText("Finalizing notes...");
      } else if (value > 40) {
        setProgressText("Processing content");
      } else {
        setProgressText("Generatin notes...");
      }
      setProgress(Math.floor(value));
    }, 700);

    return ()=>clearInterval(interval)
  }, [loading]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl bg-linear-to-br from-black/90 via-black/80 to-black/90 backdrop-blur-2xl border border-white/10 shadow-[0_25px_rgba(0,0,0,0.75)] p-8 space-y-6 text-white"
    >
      <input
        type="text"
        className="w-full p-3 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 placeholder:-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
        placeholder="Enter topic (e.g.Web Development )"
        onChange={(e) => setTopic(e.target.value)}
        value={topic}
      />
      <input
        type="text"
        className="w-full p-3 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 placeholder:-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
        placeholder="Class / Level (e.g. class 10 )"
        onChange={(e) => setClassLevel(e.target.value)}
        value={classLevel}
      />
      <input
        type="text"
        className="w-full p-3 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 placeholder:-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
        placeholder="Exam Type (e.g. CBSE , JEE , NEET)"
        onChange={(e) => setExamType(e.target.value)}
        value={examType}
      />
      <div className="flex flex-col md:flex-row gap-6">
        <ToggleBtn
          label="Exam Revision Mode"
          checked={revisionMode}
          onChange={() => setRevisionMode(!revisionMode)}
        />
        <ToggleBtn
          label="Include Diagram"
          checked={includeDiagram}
          onChange={() => setIncludeDiagram(!revisionMode)}
        />
        <ToggleBtn
          label="Include Chart"
          checked={includeChart}
          onChange={() => setIncludeChart(!revisionMode)}
        />
      </div>

      <motion.button
        onClick={handleSubmit}
        whileHover={!loading ? { scale: 1.02 } : {}}
        whileTap={!loading ? { scale: 0.95 } : {}}
        disabled={loading}
        className={` 
        w-full mt-4 py-3 rounded-xl font-semibold flex items-center justify-center gap-3 transition

        ${
          loading
            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
            : "bg-linear-to-br from-white to-gray-200 text-black shadow-[0_15px_35px_rgba(0,0,0,0.4)]"
        }
        `}
      >
        {loading ? "Generatin Notes...." : "Generate Notes"}
      </motion.button>

        {
          loading &&
          <div className="mt-4 space-y-2">
            <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
            <motion.div
            initial={{width:0}}
            animate={{width:`${progress}%`}}
            transition={{ease:"easeOut",duration:0.6}}
            className="h-full bg-linear-to-r from-green-400 via-emerald-400 to-green-500"
            >
              
            </motion.div>

          </div>
          <div className="flex justify-between text-x5 text-gray-300">
            <span>{progressText}</span>
            <span>{progress}%</span>

          </div>
          <p className="text-x-5 text-gray-400 text-center">
            This may take up to 2-5 minutes. Please don't close or refresh the page.
          </p>

          </div>
         
        }

    </motion.div>
  );
};

export default TopicForm;

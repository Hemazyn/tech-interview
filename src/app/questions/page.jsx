"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { generateQuestions } from '@/app/api/generateQuestions/route';
import { fetchQuestions } from '@/utils/fetchQuestions';
import { FiClock, FiBookmark, FiCheckSquare, FiEdit3, FiThumbsUp, FiThumbsDown, } from "react-icons/fi";

const QuestionsPage = () => {
     const searchParams = useSearchParams();
     const role = searchParams.get("role");
     const field = searchParams.get("field");
     const experience = searchParams.get("experience");
     const category = searchParams.get("category");
     const difficulty = searchParams.get("difficulty");
     const numQuestions = parseInt(searchParams.get("numQuestions"));

     const [questions, setQuestions] = useState([]);
     const [revealedAnswers, setRevealedAnswers] = useState([]);
     const [markedForReview, setMarkedForReview] = useState([]);
     const [gotCorrect, setGotCorrect] = useState([]);
     const [notes, setNotes] = useState([]);
     const [isLoading, setIsLoading] = useState(true);
     const [error, setError] = useState(null);
     const [timer, setTimer] = useState(0);
     const [isTimerRunning, setIsTimerRunning] = useState(false);
     const [score, setScore] = useState(0);
     const [scoreSubmitted, setScoreSubmitted] = useState(false);
     const timerRef = useRef(null);

     const storageKey = `${role}_${field}_${experience}_${category}_${category}_${numQuestions}`;

     useEffect(() => {
          if (!role || !field || !experience || !category || !difficulty || !numQuestions) return;

          const fetchAndSetQuestions = async () => {
               setIsLoading(true);
               setError(null);
               setQuestions([]);
               setRevealedAnswers(Array(numQuestions).fill(false));
               setNotes(Array(numQuestions).fill(""));
               setMarkedForReview(Array(numQuestions).fill(false));

               try {
                    const generated = await fetchQuestions({ role, field, experience, category, difficulty, numQuestions });
                    const parsed = typeof generated === "string" ? JSON.parse(generated) : generated;

                    console.log(parsed.questions);

                    if (parsed?.questions && Array.isArray(parsed.questions)) {
                         console.log("Fetched questions:", parsed.questions);
                         setQuestions(parsed.questions);

                    } else {
                         console.warn("No valid questions array in the response.");
                         setQuestions([]);
                         setError("No questions found. Please try a different configuration.");
                    }
               } catch (err) {
                    console.error("Fetch error:", err);
                    setError('Could not load questions. Please try again.');
               } finally {
                    setIsLoading(false);
               }
          };

          fetchAndSetQuestions();
     }, [role, field, experience, category, difficulty, numQuestions]);

     // Persist all states
     useEffect(() => {
          localStorage.setItem(`${storageKey}_answers`, JSON.stringify(revealedAnswers));
     }, [revealedAnswers]);

     useEffect(() => {
          localStorage.setItem(`${storageKey}_notes`, JSON.stringify(notes));
     }, [notes]);

     useEffect(() => {
          localStorage.setItem(`${storageKey}_marked`, JSON.stringify(markedForReview));
     }, [markedForReview]);

     useEffect(() => {
          localStorage.setItem(`${storageKey}_correct`, JSON.stringify(gotCorrect));
     }, [gotCorrect]);

     useEffect(() => {
          localStorage.setItem(`${storageKey}_timer`, timer.toString());
     }, [timer]);

     useEffect(() => {
          return () => {
               if (timerRef.current) clearInterval(timerRef.current);
          };
     }, []);

     const toggleAnswer = (index) => {
          setRevealedAnswers((prev) => {
               const updated = [...prev];
               updated[index] = !updated[index];
               return updated;
          });
     };

     const toggleMarkForReview = (index) => {
          setMarkedForReview((prev) => {
               const updated = [...prev];
               updated[index] = !updated[index];
               return updated;
          });
     };

     const updateNote = (index, content) => {
          setNotes((prev) => {
               const updated = [...prev];
               updated[index] = content;
               return updated;
          });
     };

     const markCorrectness = (index, value) => {
          setGotCorrect((prev) => {
               const updated = [...prev];
               updated[index] = value;
               return updated;
          });
     };

     const startTimer = () => {
          setIsTimerRunning(true);
          if (!timerRef.current) {
               timerRef.current = setInterval(() => {
                    setTimer((prev) => prev + 1);
               }, 1000);
          }
     };

     const pauseTimer = () => {
          setIsTimerRunning(false);
          clearInterval(timerRef.current);
          timerRef.current = null;
     };

     const resetTimer = () => {
          pauseTimer();
          setTimer(0);
     };

     const formatTime = (seconds) => {
          const mins = Math.floor(seconds / 60);
          const secs = seconds % 60;
          return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
     };

     const totalScore = gotCorrect.filter((v) => v === true).length;

     const handleSubmit = () => {
          let total = 0;
          revealedAnswers.forEach((revealed, index) => { if (revealed) { total += 1; } });
          setScore(total);
          setScoreSubmitted(true);
          pauseTimer();
     };

     const orderedQuestions = questions
          ?.map((q, index) => ({ ...q, originalIndex: index }))
          .sort((a, b) => {
               const aSeen = revealedAnswers[a.originalIndex];
               const bSeen = revealedAnswers[b.originalIndex];
               return aSeen === bSeen ? 0 : aSeen ? 1 : -1;
          });

     return (
          <div className="w-full px-5 pb-5 mx-auto">
               <div className="max-w-4xl p-4 mx-auto mt-6 bg-white rounded-lg shadow-md sm:p-6">
                    <div className="flex flex-col p-3 mb-4 border rounded-md sm:flex-row sm:items-center sm:justify-between bg-gray-50">
                         <h1 className="mb-2 text-lg font-bold text-gray-800 sm:text-xl sm:mb-0">Generated Questions</h1>
                         <div className="flex flex-wrap items-center gap-2 text-sm">
                              {role && (
                                   <span className="px-2 py-1 font-medium text-blue-800 bg-blue-100 rounded">{role}</span>
                              )}
                              {field && (
                                   <span className="px-2 py-1 font-medium text-blue-800 bg-blue-100 rounded">{field}</span>
                              )}
                              {experience && (
                                   <span className="px-2 py-1 font-medium text-blue-800 bg-blue-100 rounded">{experience}</span>
                              )}
                              {category && (
                                   <span className="px-2 py-1 font-medium text-blue-800 bg-blue-100 rounded">{category}</span>
                              )}
                              {difficulty && (
                                   <span className="px-2 py-1 font-medium text-blue-800 bg-blue-100 rounded">{difficulty}</span>
                              )}
                              <span className="px-2 py-1 font-medium text-gray-600 bg-gray-100 rounded">Score: {totalScore}/{questions.length}</span>
                         </div>
                    </div>

                    {/* Timer  */}
                    <div className="flex flex-col items-start justify-between gap-2 mb-6 text-sm text-gray-600 sm:flex-row sm:items-center sm:gap-0">
                         <div className="flex items-center gap-2">
                              <FiClock /> <span>Time: {formatTime(timer)}</span>
                         </div>
                         <div className="flex gap-2">
                              {!isTimerRunning ? (
                                   <button onClick={startTimer} className="px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-600">Start</button>
                              ) : (
                                   <button onClick={pauseTimer} className="px-3 py-1 text-white bg-yellow-500 rounded hover:bg-yellow-600">Pause</button>
                              )}
                              <button onClick={resetTimer} className="px-3 py-1 text-white bg-gray-500 rounded hover:bg-gray-600">Reset</button>
                         </div>
                    </div>

                    {/* Questions */}
                    {isLoading ? (
                         <div className="py-10 text-center text-blue-500 animate-pulse">Loading questions...</div>
                    ) : error ? (
                         <div className="p-4 text-red-700 border border-red-200 rounded bg-red-50">
                              <p className="font-medium">Error:</p>
                              <p>{error}</p>
                         </div>
                    ) : (
                         <div className="space-y-6">
                              {Array.isArray(questions) && questions.length > 0 ? (
                                   questions.map((q, index) => (
                                        <div key={q.id || index} className={`border rounded-md ${markedForReview[index] ? "border-yellow-300 ring-2 ring-yellow-100" : "border-gray-200"}`}>
                                             <div className="p-4 bg-gray-50">
                                                  <div className="flex items-start justify-between">
                                                       <div className="flex flex-wrap gap-2 text-xs font-medium">
                                                            {q.category && (
                                                                 <span className="px-2 py-1 text-blue-800 bg-blue-100 rounded">{q.category}</span>
                                                            )}
                                                            {q.difficulty && (
                                                                 <span className={`px-2 py-1 rounded ${q.difficulty === "Easy" ? "bg-green-100 text-green-800" : q.difficulty === "Medium" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}`}>{q.difficulty}</span>
                                                            )}
                                                       </div>
                                                       <button onClick={() => toggleMarkForReview(index)} className={`p-2 rounded-full ${markedForReview[index] ? "text-yellow-500 bg-yellow-100" : "text-gray-400 hover:text-yellow-500"}`}><FiBookmark /></button>
                                                  </div>
                                                  <p className="mt-3 text-sm font-medium text-gray-800 sm:text-base">
                                                       <span className="mr-2 font-bold text-blue-600">{index + 1}. </span>{q.question}
                                                  </p>
                                                  <div className="flex gap-2 mt-4">
                                                       <button onClick={() => toggleAnswer(index)} className={`px-4 py-1 rounded text-sm font-medium ${revealedAnswers[index] ? "bg-gray-200 text-gray-700 hover:bg-gray-300" : "bg-blue-500 text-white hover:bg-blue-600"}`}>
                                                            {revealedAnswers[index] ? "Hide Answer" : "Reveal Answer"}
                                                       </button>
                                                  </div>
                                             </div>

                                             {revealedAnswers[index] && (
                                                  <div className="p-4 border-t border-blue-100 bg-blue-50">
                                                       <h3 className="mb-2 text-sm font-semibold text-blue-700 uppercase">
                                                            Answer:
                                                       </h3>
                                                       <p className="text-sm text-gray-700">{q.answer}</p>

                                                       <div className="flex items-center gap-4 mt-4 text-sm">
                                                            <span className="text-gray-600">Did you get it right?</span>
                                                            <button onClick={() => markCorrectness(index, true)} className={`flex items-center gap-1 px-2 py-1 rounded ${gotCorrect[index] === true ? "bg-green-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-green-100"}`} >
                                                                 <FiThumbsUp /> Yes
                                                            </button>
                                                            <button onClick={() => markCorrectness(index, false)} className={`flex items-center gap-1 px-2 py-1 rounded ${gotCorrect[index] === false ? "bg-red-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-red-100"}`}>
                                                                 <FiThumbsDown />  No
                                                            </button>
                                                       </div>
                                                  </div>
                                             )}

                                             <div className="p-4 border-t border-gray-200 bg-gray-50">
                                                  <div className="flex items-center mb-2 text-sm text-gray-500">
                                                       <FiEdit3 className="mr-1" /> Your Notes:
                                                  </div>
                                                  <textarea value={notes[index] || ""} onChange={(e) => updateNote(index, e.target.value)} placeholder="Add your notes here..." className="w-full p-2 border border-gray-300 rounded-md text-sm text-gray-700 min-h-[80px] focus:ring-blue-500 focus:border-blue-500"></textarea>
                                             </div>
                                        </div>
                                   ))
                              ) : (
                                   <p>No question available</p>
                              )}
                              {/* Submit Button and Score */}
                              <div className="mt-8 text-center">
                                   {!scoreSubmitted ? (
                                        <button onClick={handleSubmit} className="px-6 py-2 text-white bg-green-600 rounded hover:bg-green-700">Submit Answers</button>
                                   ) : (
                                        <p className="text-lg font-semibold text-green-700">Your Score: {score} / {questions.length}</p>
                                   )}
                              </div>
                         </div>
                    )}
               </div>
          </div>

     );
};

export default QuestionsPage;
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Notiflix from 'notiflix';

const Form = () => {
     const router = useRouter();
     const [formData, setFormData] = useState({ role: "", field: "", experience: "", numQuestions: 5, category: "", difficulty: "" });

     const handleChange = (e) => {
          setFormData({ ...formData, [e.target.name]: e.target.value });
     };

     const handleSubmit = (e) => {
          e.preventDefault();
          if (!formData.role || !formData.field || !formData.experience || !formData.category || !formData.difficulty || !formData.numQuestions) {
               Notiflix.Notify.failure("Please fill in all fields");
               return;
          }
          router.push(`/questions?role=${formData.role}&field=${formData.field}&experience=${formData.experience}&category=${formData.category}&difficulty=${formData.difficulty}&numQuestions=${formData.numQuestions}`);
          Notiflix.Notify.success("Successfully generated questions");
     };

     return (
          <div className="w-full p-2 mx-auto mt-10 border rounded-lg shadow-md md:p-6 md:w-3/5 lg:w-2/5">
               <h1 className="mb-2 text-2xl font-semibold text-center md:mb-5 lg:text-4xl">Generate Interview Questions</h1>
               <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" name="role" placeholder="Job Role (e.g., Frontend Developer)"
                         value={formData.role} onChange={handleChange} className="w-full p-2 border rounded-md outline-0" />
                    <div className="block gap-2 px-1 py-2 border rounded-md md:px-3">
                         <select name="field" value={formData.field} onChange={handleChange} className="w-full text-sm border-0 outline-0 md:text-base">
                              <option value="">Select Technical Field</option>
                              <option value="frontend">Software Engineering & Development</option>
                              <option value="backend">Data & Artificial Intelligence (AI)</option>
                              <option value="fullstack">Cloud Computing & Infrastructure</option>
                              <option value="devops">Cybersecurity</option>
                              <option value="datascience">Quality Assurance & Testing</option>
                              <option value="devops">IT & Technical Support</option>
                              <option value="devops">Specialized & Emerging Technologies</option>
                         </select>
                    </div>
                    <div className="block gap-2 px-1 py-2 border rounded-md md:px-3">
                         <select name="experience" value={formData.experience} onChange={handleChange} className="w-full text-sm border-0 outline-0 md:text-base">
                              <option value="">Select Experience Level</option>
                              <option value="junior">Intern</option>
                              <option value="junior">Junior</option>
                              <option value="mid">Mid-Level</option>
                              <option value="senior">Senior</option>
                         </select>
                    </div>
                    <div className="block gap-2 px-1 py-2 border rounded-md md:px-3">
                         <select name="category" value={formData.category} onChange={handleChange} className="w-full text-sm border-0 outline-0 md:text-base">
                              <option value="">All Categories</option>
                              <option value="technical">Technical</option>
                              <option value="behavioral">Behavioral</option>
                              <option value="systemdesign">System Design</option>
                              <option value="problemsolving">Problem Solving</option>
                         </select>
                    </div>
                    <div className="block gap-2 px-1 py-2 border rounded-md md:px-3">
                         <select name="difficulty" value={formData.difficulty} onChange={handleChange} className="w-full text-sm border-0 outline-0 md:text-base">
                              <option value="">All Difficulty Levels</option>
                              <option value="easy">Easy</option>
                              <option value="medium">Medium</option>
                              <option value="hard">Hard</option>
                         </select>
                    </div>
                    <input type="number" name="numQuestions" placeholder="Number of Questions"
                         value={formData.numQuestions} onChange={handleChange} className="w-full px-3 py-2 border rounded-md outline-0" min="1" max="50" />
                    <button type="submit" className="w-full p-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
                         Generate Questions
                    </button>
               </form>
          </div>
     );
};

export default Form;
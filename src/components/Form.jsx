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
          <div className="max-w-lg p-6 mx-auto mt-10 bg-gray-200 rounded-lg shadow-md dark:bg-gray-800">
               <h2 className="mb-4 text-xl font-semibold">Generate Interview Questions</h2>
               <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" name="role" placeholder="Job Role (e.g., Frontend Developer)"
                         value={formData.role} onChange={handleChange} className="w-full p-2 border rounded-md" />
                    <select name="field" value={formData.field} onChange={handleChange} className="w-full p-2 border rounded-md">
                         <option value="">Select Technical Field</option>
                         <option value="frontend">Frontend</option>
                         <option value="backend">Backend</option>
                         <option value="fullstack">Full Stack</option>
                         <option value="devops">DevOps</option>
                         <option value="datascience">Data Science</option>
                    </select>
                    <select name="experience" value={formData.experience} onChange={handleChange} className="w-full p-2 border rounded-md">
                         <option value="">Select Experience Level</option>
                         <option value="junior">Junior</option>
                         <option value="mid">Mid-Level</option>
                         <option value="senior">Senior</option>
                    </select>
                    <select name="category" value={formData.category} onChange={handleChange} className="w-full p-2 border rounded-md">
                         <option value="">All Categories</option>
                         <option value="technical">Technical</option>
                         <option value="behavioral">Behavioral</option>
                         <option value="systemdesign">System Design</option>
                         <option value="problemsolving">Problem Solving</option>
                    </select>
                    <select name="difficulty" value={formData.difficulty} onChange={handleChange} className="w-full p-2 border rounded-md">
                         <option value="">All Difficulty Levels</option>
                         <option value="easy">Easy</option>
                         <option value="medium">Medium</option>
                         <option value="hard">Hard</option>
                    </select>
                    <input type="number" name="numQuestions" placeholder="Number of Questions"
                         value={formData.numQuestions} onChange={handleChange} className="w-full p-2 border rounded-md" min="1" max="50" />
                    <button type="submit" className="w-full p-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
                         Generate Questions
                    </button>
               </form>
          </div>
     );
};

export default Form;
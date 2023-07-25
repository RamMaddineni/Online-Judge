import React, { useState, useEffect, useRef } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { set } from "lodash";
import { useSelector } from "react-redux";
function CodeEditor() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("cpp");
  const [output, setOutput] = useState("");
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { domain } = useSelector((state) => state.domain);
  const navigate = useNavigate();
  const textareaRef = useRef(null);
  const inputRef = useRef(null);

  function handleCodeChange(event) {
    setCode(event.target.value);
  }

  function handleLanguageChange(event) {
    setLanguage(event.target.value);
  }

  const handleRunClick = async () => {
    // Add code here to run the user's code
    setIsLoading(true);
    setOutput("");
    try {
      const response = await axios.post(
        `${domain}/api/v1/compiler`,
        {
          code: code,
          language: language,
          input: input,
        },
        { withCredentials: true }
      );
      console.log(response.data);
      setOutput(response.data.output);
    } catch (err) {
      console.log(err.message);
      setOutput(err.message);
    }
    setIsLoading(false);
  };

  function handleClearClick() {
    // Add code here to clear the console
    setCode("");
    setOutput("");
    setInput("");
  }

  useEffect(() => {
    if (textareaRef.current) {
      Prism.highlightElement(textareaRef.current);
    }
    if (inputRef.current) {
      Prism.highlightElement(textareaRef.current);
    }
  }, [code, language]);

  useEffect(() => {
    localStorage.setItem("lastLocation", window.location.pathname);
  }, []);

  return (
    <div className="bg-gray-700 min-h-screen py-8">
      <div className="flex justify-center mb-4">
        <button
          onClick={(e) => {
            e.preventDefault();
            navigate("/profile");
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2"
        >
          Profile page
        </button>
        <select
          value={language}
          onChange={handleLanguageChange}
          className="px-4 py-2 border rounded-md mr-2"
        >
          <option value="cpp">cpp</option>
          <option value="c">c</option>
          <option value="java">Java</option>
          <option value="js">JavaScript</option>
          <option value="py">Python</option>
          {/* Add more options as needed */}
        </select>
        <button
          onClick={handleRunClick}
          className="px-4 py-2 bg-green-500 text-white rounded-md mr-2"
        >
          Run
        </button>
        <button
          onClick={handleClearClick}
          className="px-4 py-2 bg-red-500 text-white rounded-md"
        >
          Clear
        </button>
      </div>
      <div className="flex justify-between">
        <textarea
          ref={textareaRef}
          value={code}
          onChange={handleCodeChange}
          className={`language-${language} flex-grow border rounded-md p-2 mr-2 bg-[cadetblue] placeholder-white text-white `}
          rows={20}
          cols={40}
          placeholder="Enter code here"
        />
        <div className="flex flex-col">
          <label htmlFor="" className="mb-2 text-white ">
            Input
          </label>
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className={`input-${language} flex-grow border rounded-md p-2 mb-2 bg-[cadetblue] placeholder-white text-white`}
            rows={5}
            cols={40}
            placeholder="Enter input here"
          />
        </div>
      </div>
      <div
        className="border rounded-md p-2 mt-4 placeholder-white text-white bg-[cadetblue]"
        placeholder="Your output goes here"
      >
        {output ? output : !isLoading ? "your Output Goes Here" : "Loading ..."}
      </div>
    </div>
  );
}

export default CodeEditor;

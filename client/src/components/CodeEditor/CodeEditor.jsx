import React, { useState, useEffect, useRef } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import "./CodeEditor.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function CodeEditor() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [output, setOutput] = useState("");
  const [input, setInput] = useState("");

  const navigate = useNavigate();
  const textareaRef = useRef(null);
  const inputRef = useRef(null);
  function handleCodeChange(event) {
    setCode(event.target.value);
  }

  function handleLanguageChange(event) {
    setLanguage(event.target.value);
    console.log(event.target.value);
  }

  const handleRunClick = async () => {
    // Add code here to run the user's code
    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/compiler",
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
    <div className="code-editor">
      <div
        onClick={(e) => {
          e.preventDefault();
          navigate("/profile");
        }}
      >
        Profile page
      </div>
      <div className="code-editor-header">
        <select value={language} onChange={handleLanguageChange}>
          <option value="cpp">cpp</option>
          <option value="c">c</option>
          <option value="java">Java</option>
          <option value="js">JavaScript</option>
          <option value="py">Python</option>
          {/* Add more options as needed */}
        </select>
        <button onClick={handleRunClick}>Run</button>
        <button onClick={handleClearClick}>Clear</button>
      </div>
      <div className="code-editor-textarea">
        <textarea
          ref={textareaRef}
          value={code}
          onChange={handleCodeChange}
          className={`language-${language}`}
          rows={20}
          cols={40}
        />
        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className={`input-${language}`}
          rows={20}
          cols={40}
        />
        <label htmlFor="">Input</label>
      </div>
      <div className="code-editor-output">{!output?.code && output}</div>
    </div>
  );
}

export default CodeEditor;

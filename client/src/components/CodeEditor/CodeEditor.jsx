import React, { useState, useEffect, useRef } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import "./CodeEditor.css";
import axios from "axios";
function CodeEditor() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const textareaRef = useRef(null);
  const [output, setOutput] = useState("");
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
  }

  useEffect(() => {
    if (textareaRef.current) {
      Prism.highlightElement(textareaRef.current);
    }
  }, [code, language]);

  return (
    <div className="code-editor">
      <div className="code-editor-header">
        <select value={language} onChange={handleLanguageChange}>
          <option value="cpp">C</option>
          <option value="c">Cpp</option>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="ruby">Ruby</option>
          {/* Add more options as needed */}
        </select>
        <button onClick={handleRunClick}>Run</button>
        <button onClick={handleClearClick}>Clear</button>
      </div>
      <div className="code-editor-textarea">
        {/* Add line numbers using CSS */}
        <textarea
          ref={textareaRef}
          value={code}
          onChange={handleCodeChange}
          className={`language-${language}`}
          rows={20}
          cols={40}
        />
      </div>
      <div className="code-editor-output">{output}</div>
    </div>
  );
}

export default CodeEditor;

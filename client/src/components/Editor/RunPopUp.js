import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import expandImage from "../../images/expand.png";
import Controls from "../utils/Controls";
const RunPopup = ({ onClose, language, code }) => {
  const [inputValue, setInputValue] = useState("");
  const [outputValue, setOutputValue] = useState("");
  const [showOutput, setShowOutput] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Add isLoading state

  const { domain } = useSelector((state) => state.domain);
  const editorRef = React.useRef(null);
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleRunClick = async () => {
    // Add code here to run the user's code
    setOutputValue("");
    setShowOutput(true);
    setIsLoading(true); // Set isLoading to true when running the code
    try {
      const response = await axios.post(
        `${domain}/api/v1/compiler`,
        {
          code: code,
          language: language,
          input: inputValue,
        },
        { withCredentials: true }
      );
      setOutputValue(response.data.output);
    } catch (err) {
      setOutputValue(err.message);
    } finally {
      setIsLoading(false); // Set isLoading to false after getting the response
    }
  };

  const handleCancelClick = () => {
    setShowOutput(false);
    onClose();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-opacity-50 bg-black flex justify-center items-center z-50 lg:flex-row flex-col">
      <div className="bg-white p-4 rounded-lg lg:w-1/3 w-4/5 h-52 max-h-60">
        <h2 className="text-xl font-semibold mb-2">Enter Input</h2>
        <textarea
          className="w-full p-2 mb-2 border border-gray-300 rounded text-black"
          rows="5"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter input here..."
        ></textarea>
        <div className="flex justify-end">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded mr-2"
            onClick={handleRunClick}
          >
            Run
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded"
            onClick={handleCancelClick}
          >
            Cancel
          </button>
        </div>
      </div>
      {showOutput && (
        <div
          ref={editorRef}
          className="bg-white p-4 rounded-lg lg:w-1/3 w-4/5 mt-2 lg:mt-0 lg:ml-2 overflow-y-auto h-52 max-h-60"
        >
          <div className="flex justify-between border-b-2 border-b-black">
            <h2 className="text-xl font-semibold mb-2">Output</h2>
            <Controls editorRef={editorRef}></Controls>
          </div>
          {isLoading ? ( // Show loading message while isLoading is true
            <p>Compiling... Please wait.</p>
          ) : (
            <div className="">
              <pre>{outputValue}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RunPopup;

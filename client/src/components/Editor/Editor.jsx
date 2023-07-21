import React, { useRef, useState } from "react";
import "./Editor.css";
import expandImage from "../../images/expand.png";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCodeInfo } from "../../redux/codeInfo";
import { setCodeError } from "../../redux/codeError";
import { setIsCompiling } from "../../redux/isCompiling";
function Editor() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("cpp");
  const dispatcher = useDispatch();

  const textAreaRef = useRef(null);

  const lineNumbersRef = useRef(null);
  const editorRef = useRef(null);
  const problem = JSON.parse(localStorage.getItem("currentProblem"));
  const handleFullScreen = () => {
    editorRef.current.requestFullscreen();
  };

  const handleExitFullScreen = () => {
    document.exitFullscreen();
  };
  const handleKeyUp = (event) => {
    const numberOfLines = event.target.value.split("\n").length;

    lineNumbersRef.current.innerHTML = Array(numberOfLines)
      .fill("<span></span>")
      .join("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Tab") {
      const start = textAreaRef.current.selectionStart;
      const end = textAreaRef.current.selectionEnd;

      textAreaRef.current.value =
        textAreaRef.current.value.substring(0, start) +
        "\t" +
        textAreaRef.current.value.substring(end);

      event.preventDefault();
    }
  };
  // api call for submit button.
  const handleSubmit = async () => {
    try {
      dispatcher(setIsCompiling(true));
      dispatcher(setCodeError(null));
      dispatcher(setCodeInfo(null));

      const res = await axios.post(
        `/api/v1/problem/submit/${problem._id}`,
        {
          code,
          lang: language,
        },
        {
          withCredentials: true,
        }
      );
      dispatcher(setCodeInfo(res.data?.info));
      dispatcher(setIsCompiling(false));
    } catch (err) {
      dispatcher(setCodeError(err?.response?.data?.error));
      dispatcher(setIsCompiling(false));
      console.log(err?.response);
    }
  };

  return (
    <div ref={editorRef} className="flex-1 basis-1/2 h-screen flex flex-col">
      <div className="flex flex-row ">
        <select
          name=""
          id=""
          className=" bg-teal-700 text-slate-50 rounded-sm basis-1/2 "
          onChange={(e) => {
            setLanguage(e.target.value);
          }}
        >
          <option value="cpp">cpp</option>
          <option value="js">javascript</option>
          <option value="py">python</option>
          <option value="java">java</option>
          <option value="c">c</option>
        </select>
        <button
          className=" basis-1/2 bg-lime-500 hover:bg-lime-700 text-slate-50 rounded shadow-lg"
          onClick={() => {
            handleSubmit();
          }}
        >
          Submit
        </button>
        <img
          src={expandImage}
          className="w-7 h-7 p-1  bg-emerald-200 rounded hover:cursor-pointer hover:bg-emerald-300"
          alt=""
          onClick={() => {
            if (document.fullscreenElement === editorRef.current) {
              handleExitFullScreen();
            } else {
              handleFullScreen();
            }
          }}
        />
      </div>
      <div className="editor bg-teal-500  font-mono text-ellipsis h-screen w-full">
        <div className="line-numbers" ref={lineNumbersRef}>
          <span></span>
        </div>

        <textarea
          className="bg-teal-500 placeholder-gray-600"
          ref={textAreaRef}
          onKeyUp={handleKeyUp}
          onKeyDown={handleKeyDown}
          onChange={(e) => {
            setCode(e.target.value);
          }}
          placeholder="Code goes here..."
        ></textarea>
      </div>
    </div>
  );
}

export default Editor;

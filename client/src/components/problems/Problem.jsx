import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Editor from "../Editor/Editor";
import expandImage from "../../images/expand.png";
import { useSelector } from "react-redux";

export default function Problem() {
  const problem = JSON.parse(localStorage.getItem("currentProblem"));
  console.log(problem);
  const descRef = useRef(null);
  const verdictRef = useRef(null);
  const { codeInfo } = useSelector((state) => state.codeInfo);
  const { codeError } = useSelector((state) => state.codeError);
  const { isCompiling } = useSelector((state) => state.isCompiling);
  const handleFullScreen = (element) => {
    console.log(element);
    if (element === "desc") descRef.current.requestFullscreen();
    else if (element === "verdict") verdictRef.current.requestFullscreen();
  };

  const handleExitFullScreen = () => {
    document.exitFullscreen();
  };

  const verdict = (info = "") => {
    let str;
    if (info.verdict) str = "Accepted";
    else if (!info.verdict && info.compilation) str = "Wrong_Answer";
    else if (!info.verdict && !info.compilation) str = "compilation_error";

    if (str === "Accepted") {
      return <div className="text-green-500">Accepted</div>;
    } else if (str === "Wrong_Answer")
      return (
        <div className="text-red-500">
          Wrong Answer on testcase : {info.testcase}
          <br />
          input : {info.input}
          <br />
          output: {info.output}
          <br />
          expectedOutput= {info.expectedOutput}
        </div>
      );
    else if (str === "compilation_error") {
      return <div className="text-red-800 w-44">{info.message}</div>;
    }
  };
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.setItem("lastLocation", window.location.pathname);
  }, []);
  const difficulty = {
    easy: (
      <div className="bg-lime-700 rounded-sm text-white px-2 flex items-center text-2xl">
        Easy
      </div>
    ),
    medium: (
      <div className="bg-yellow-300 rounded-sm text-white px-2 flex items-center text-2xl">
        Medium
      </div>
    ),
    hard: (
      <div className="bg-red-600 rounded-sm text-white px-2 flex items-center text-2xl">
        Hard
      </div>
    ),
  };

  return (
    <div className="flex flex-col h-screen ">
      <div className="flex justify-between bg-lime-300 p-4 sticky top-0 bg-opacity-90 w-full">
        <div className="flex items-center">
          {difficulty[problem.difficulty]}
        </div>
        <div>
          <button
            className="mx-2 text-slate-50 text-lg bg-lime-500 rounded-lg p-2 px-4 hover:bg-lime-700 shadow-lg"
            onClick={(e) => {
              e.preventDefault();
              localStorage.removeItem("currentProblem");
              navigate("/problems");
            }}
          >
            problems
          </button>
          <button
            className="mx-2 text-slate-50 text-lg bg-lime-500 rounded-lg p-2 px-4 hover:bg-lime-700 shadow-lg"
            onClick={(e) => {
              e.preventDefault();
              localStorage.removeItem("currentProblem");
              navigate("/profile");
            }}
          >
            profile
          </button>
        </div>
      </div>

      <div className="flex  w-full h-screen">
        <div className="flex flex-col flex-1 basis-1/2  ">
          <div
            ref={descRef}
            className="basis-4/5 bg-emerald-400 text-slate-100  overflow-scroll"
          >
            <div className="flex flex-row justify-between">
              <h1 className="font-semibold text-slate-600">
                {problem.title} : {problem._id}
              </h1>
              <img
                src={expandImage}
                className="w-7 h-7 p-1 m-2 bg-emerald-200 rounded hover:cursor-pointer hover:bg-emerald-500"
                alt=""
                onClick={() => {
                  if (descRef.current === document.fullscreenElement) {
                    handleExitFullScreen();
                  } else {
                    handleFullScreen("desc");
                  }
                }}
              />
            </div>
            <h2>{problem.description}</h2>
          </div>
          <div
            ref={verdictRef}
            className=" flex flex-row justify-between basis-1/5 bg-slate-800 text-slate-50 rounded-md shadow-xl overflow-scroll"
          >
            <div>
              {isCompiling && <span className="text-yellow-500">Judging</span>}
              {!isCompiling && codeInfo && verdict(codeInfo)}
              {!codeInfo && !isCompiling && (
                <div className="text-slate-50">
                  <h1 className="font-semibold text-slate-50">
                    {problem.title} : {problem._id}
                  </h1>
                  <h2>Submit your code to see the verdict</h2>
                </div>
              )}
            </div>
            <img
              src={expandImage}
              className="w-7 h-7 p-1 m-2 bg-emerald-200 rounded hover:cursor-pointer hover:bg-emerald-500"
              alt=""
              onClick={() => {
                if (verdictRef.current === document.fullscreenElement) {
                  handleExitFullScreen();
                } else {
                  handleFullScreen("verdict");
                }
              }}
            />
          </div>
        </div>

        <Editor></Editor>
      </div>
    </div>
  );
}

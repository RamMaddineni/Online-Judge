import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Editor from "../Editor/Editor";
import expandImage from "../../images/expand.png";
import { useSelector } from "react-redux";

export default function Problem() {
  const problem = JSON.parse(localStorage.getItem("currentProblem"));

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

  const verdict = {
    Accepted: <span className="text-green-500">Accepted</span>,
    Judging: <span className="text-yellow-500">Judging</span>,
    Wrong_Answer: <span className="text-red-500">Wrong Answer</span>,
  };
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.setItem("lastLocation", window.location.pathname);
  }, []);

  return (
    <div className="flex flex-col h-screen ">
      <div className="flex justify-end  bg-lime-300 p-4 sticky top-0 bg-opacity-90 w-full">
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
                className="w-7 h-7 p-1 m-2 bg-emerald-200 rounded"
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
              {!codeError &&
                codeInfo &&
                codeInfo.verdict &&
                verdict["Accepted"]}
              {!codeError &&
                codeInfo &&
                !codeInfo.verdict &&
                verdict["Wrong_Answer"]}
              {isCompiling && verdict["Judging"]}

              {codeError && <div> {codeError}</div>}
              {!codeInfo && !codeError && !isCompiling && (
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
              className="w-7 h-7 p-1 m-2 bg-emerald-200 rounded"
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

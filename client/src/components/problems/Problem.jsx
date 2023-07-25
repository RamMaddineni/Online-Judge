import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Editor from "../Editor/Editor";
import EditorUp from "../Editor/EditorUp";
import expandImage from "../../images/expand.png";
import { useSelector } from "react-redux";
import Controls from "../utils/Controls";
export default function Problem() {
  const problem = JSON.parse(localStorage.getItem("currentProblem"));
  console.log(problem);
  const descRef = useRef(null);
  const verdictRef = useRef(null);
  const { codeInfo } = useSelector((state) => state.codeInfo);
  const { codeError } = useSelector((state) => state.codeError);
  const { isCompiling } = useSelector((state) => state.isCompiling);

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
  const components = {
    navbar: [
      <button
        className="mx-2 text-slate-50 text-lg bg-teal-400 rounded-lg p-2 px-4 hover:bg-teal-600 shadow-lg"
        onClick={(e) => {
          e.preventDefault();
          localStorage.removeItem("currentProblem");
          navigate("/problems");
        }}
      >
        problems
      </button>,
      <button
        className="mx-2 text-slate-50 text-lg bg-teal-400 rounded-lg p-2 px-4 hover:bg-teal-600 shadow-lg"
        onClick={(e) => {
          e.preventDefault();
          localStorage.removeItem("currentProblem");
          navigate("/profile");
        }}
      >
        profile
      </button>,
    ],
    description: (
      <div className="flex flex-col  basis-1/2 w-full h-screen">
        <div
          ref={descRef}
          className="basis-4/5 bg-teal-100 p-3 m-0 overflow-scroll no-scrollbar  shadow-xl"
        >
          <div className="flex justify-between">
            <div className="flex items-center">
              {difficulty[problem.difficulty]}
            </div>
            <Controls editorRef={descRef}></Controls>
          </div>
          <div className="flex flex-row justify-between">
            <h1 className="font-semibold text-slate-600">{problem.title}</h1>
          </div>
          <h2 className="font-black">{problem.description}</h2>
          {/* { iterate over problem.sampleInput and problem.sampleOutput and display them} */}
          <div className="flex flex-row justify-between">
            <div className="flex flex-col">
              {problem.sampleInput.map((input, index) => {
                return (
                  <div
                    key={index}
                    className="text-slate-50 flex md:flex-row flex-col justify-between"
                  >
                    <div className=" bg-white bg-opacity-90 rounded-md shadow-xl p-2 m-2">
                      <h3 className="font-semibold text-slate-600">
                        Sample Input {index + 1}
                      </h3>
                      <div className=" text-gray-800">{input}</div>
                    </div>
                    <div className=" bg-white bg-opacity-50 rounded-md shadow-xl p-2 m-2">
                      <h3 className="font-semibold text-slate-600">
                        Sample Output {index + 1}
                      </h3>
                      <div className="text-gray-800">
                        {problem.sampleOutput[index]}
                      </div>
                    </div>
                  </div>
                );
              })}

              <h3 className="font-semibold text-slate-600">Constraints</h3>
              <div className="text-gray-950">{problem.constraints}</div>
            </div>
          </div>
        </div>
        <div
          ref={verdictRef}
          className=" flex flex-row justify-between basis-1/5 bg-teal-600  shadow-xl overflow-scroll no-scrollbar p-3"
        >
          <div>
            {isCompiling && <span className="text-yellow-200">Judging</span>}
            {!isCompiling && codeInfo && verdict(codeInfo)}
            {!codeInfo && !isCompiling && (
              <div className=" text-slate-50">
                <h2>Submit your code to see the verdict</h2>
              </div>
            )}
          </div>
          <Controls editorRef={verdictRef}></Controls>
        </div>
      </div>
    ),
  };

  return (
    <div className="flex lg:flex-row flex-col h-screen overflow-scroll no-scrollbar">
      {components.description}

      <div className="flex-1 ">
        <EditorUp navbar={components.navbar}></EditorUp>
      </div>
    </div>
  );
}

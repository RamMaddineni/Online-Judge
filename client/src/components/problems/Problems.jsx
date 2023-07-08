import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setProblems } from "../../redux/problems";
import { useSelector, useDispatch } from "react-redux";
const Problems = () => {
  const { problems } = useSelector((state) => state.problems);
  const dispatcher = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const getProblems = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/v1/problems", {
          withCredentials: true,
        });
        dispatcher(setProblems(res.data));
      } catch (err) {
        if (err.response.USER === false) {
          navigate("/");
        }
      }
    };
    getProblems();

    localStorage.setItem("lastLocation", window.location.pathname);
  }, []);

  return (
    <div>
      <div className="flex sticky top-0 justify-around bg-lime-300 p-5 rounded-s w-full bg-opacity-90">
        <h1 className="text-3xl text-slate-50">Problems</h1>
        <button
          className="text-slate-50 text-lg bg-lime-500 rounded-lg p-2 px-4 hover:bg-lime-700 shadow-lg"
          onClick={(e) => {
            e.preventDefault();
            localStorage.removeItem("lastLocation");
            navigate("/profile");
          }}
        >
          profile
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-[aqua]">
        {problems &&
          problems.map((problem) => {
            return (
              <div
                key={problem.id}
                className="flex flex-col bg-blue-400  border-2 border-blue-400 shadow-2xl rounded-md p-4 m-4 min-h-fit self-start justify-around "
              >
                <h2 className="text-lg">problem-ID : {problem.id}</h2>
                <h2 className="self-center">{problem.title}</h2>
                <button
                  className="self-end rounded-lg hover:bg-lime-500 p-1 bg-[#1e3a8a] text-slate-50"
                  onClick={(e) => {
                    e.preventDefault();
                    console.log("clicked", problem._id);
                    localStorage.setItem(
                      "currentProblem",
                      JSON.stringify(problem)
                    );
                    navigate(`/problem`);
                  }}
                >
                  Open
                </button>
              </div>
            );
          })}
        {!problems && <div>No problems </div>}
      </div>
    </div>
  );
};

export default Problems;

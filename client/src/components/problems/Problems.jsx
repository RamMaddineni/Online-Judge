//came back fine.
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setProblems } from "../../redux/problems";
import { useSelector, useDispatch } from "react-redux";
import "../utils/custom-scrollbar.css";
const Problems = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { problems } = useSelector((state) => state.problems);
  const dispatcher = useDispatch();
  const navigate = useNavigate();
  const { domain } = useSelector((state) => state.domain);
  useEffect(() => {
    const getProblems = async () => {
      try {
        const res = await axios.get(`${domain}/api/v1/problems`, {
          withCredentials: true,
        });
        console.log(res.data);
        dispatcher(setProblems(res.data));
        setIsLoading(false);
      } catch (err) {
        console.log(err.message);
        if (err?.response?.USER === false) {
          navigate("/");
        }
      }
    };
    getProblems();
    console.log("problems", problems);
    localStorage.setItem("lastLocation", window.location.pathname);
  }, []);
  const difficulty = {
    easy: (
      <div className="bg-lime-700 rounded-sm text-white text-center flex items-center px-2">
        Easy
      </div>
    ),
    medium: (
      <div className="bg-yellow-300 rounded-sm text-white flex items-center px-2">
        Medium
      </div>
    ),
    hard: (
      <div className="bg-red-600 rounded-sm text-white flex items-center px-2">
        Hard
      </div>
    ),
  };
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");

  // Custom filtering logic for advanced search
  const filteredProblems = problems // Check if isLoading is true and problems is defined
    ? problems.filter((problem) => {
        const searchWords = searchTerm.toLowerCase().split(" ");
        const difficultyMatch =
          selectedDifficulty === "all" ||
          problem.difficulty === selectedDifficulty;
        return (
          searchWords.every((word) =>
            problem.title.toLowerCase().includes(word)
          ) && difficultyMatch
        );
      })
    : [];

  return (
    <div className="">
      <div className="flex md:flex-row flex-col sticky top-0 justify-around bg-teal-300 p-5 rounded-s w-full bg-opacity-90 custom-scrollbar">
        <h1 className="self-center text-3xl text-white">Problems</h1>
        <div className=" self-center p-3 basis-1/2">
          <input
            type="text"
            placeholder="Search by problem title"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded p-2 w-full bg-white"
          />
        </div>
        <div className=" self-center p-3">
          <div className="flex flex-col">
            <label htmlFor="difficulty" className="text-white text-sm mb-1">
              Select difficulty
            </label>
            <select
              id="difficulty"
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="border rounded p-2 bg-white"
            >
              <option value="all">Default</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </div>

        <button
          className=" self-center text-white text-lg  bg-teal-500 rounded-lg px-3 hover:bg-teal-700 shadow-lg"
          onClick={(e) => {
            e.preventDefault();
            localStorage.removeItem("lastLocation");
            navigate("/profile");
          }}
        >
          Profile
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-teal-100 overflow-visible min-h-screen ">
        {/* Display problems based on the search results */}
        {filteredProblems.length === 0 && searchTerm === "" && problems
          ? problems.map((problem) => (
              <div
                key={problem.id}
                className="flex flex-col bg-white  shadow-2xl rounded-md p-4 m-4 min-h-fit self-start justify-around "
              >
                <div className="flex justify-between">
                  <h2 className="text-lg ">problem-ID : {problem.id}</h2>
                  {difficulty[problem.difficulty]}
                </div>
                <h2 className="self-center ">{problem.title}</h2>
                <button
                  className="self-end rounded-lg hover:bg-teal-900 p-1 bg-teal-400 text-slate-50"
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
            ))
          : filteredProblems &&
            filteredProblems.map((problem) => (
              <div
                key={problem.id}
                className="flex flex-col bg-white  shadow-2xl rounded-md p-4 m-4 min-h-fit self-start justify-around "
              >
                <div className="flex justify-between">
                  <h2 className="text-lg">Problem-ID : {problem.id}</h2>
                  {difficulty[problem.difficulty]}
                </div>
                <h2 className="self-center">{problem.title}</h2>
                <button
                  className="self-end rounded-sm hover:bg-teal-900 p-1 bg-teal-400 text-slate-50"
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
            ))}

        {(!filteredProblems || filteredProblems.length === 0) && (
          <div>No matching problems </div>
        )}
      </div>
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-teal-100 overflow-visible min-h-screen">
        {problems &&
          problems.map((problem) => {
            return (
              <div
                key={problem.id}
                className="flex flex-col bg-white  shadow-2xl rounded-md p-4 m-4 min-h-fit self-start justify-around "
              >
                <div className="flex justify-between">
                  <h2 className="text-lg">problem-ID : {problem.id}</h2>
                  {difficulty[problem.difficulty]}
                </div>
                <h2 className="self-center">{problem.title}</h2>
                <button
                  className="self-end rounded-lg hover:bg-teal-900 p-1 bg-teal-400 text-slate-50"
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
      </div> */}
    </div>
  );
};

export default Problems;

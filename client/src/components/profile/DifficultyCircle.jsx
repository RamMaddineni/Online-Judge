import React from "react";

const DifficultyCircle = ({ count, difficulty }) => {
  let color;
  if (difficulty === "easy") {
    color = "green";
  } else if (difficulty === "medium") {
    color = "yellow";
  } else if (difficulty === "hard") {
    color = "red";
  }

  return (
    <div className="flex items-center justify-center">
      <div
        className={`h-16 w-16 rounded-full flex items-center justify-center text-white font-bold text-lg bg-${color}-500`}
      >
        {count}
      </div>
      <div className="ml-4 text-gray-700 text-base">{difficulty}</div>
    </div>
  );
};

export default DifficultyCircle;

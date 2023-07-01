import React from "react";
import { useSelector } from "react-redux";
export default function Problem() {
  const { problem } = useSelector((state) => state.problem);
  return (
    <div>
      <h1>
        {problem.title} id: ${problem.id}
      </h1>
      <p>{problem.description}</p>
    </div>
  );
}

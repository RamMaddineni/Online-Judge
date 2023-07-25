import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpand, faCompress } from "@fortawesome/free-solid-svg-icons";

const Controls = ({ editorRef }) => {
  const [isFullScreen, setIsFullScreen] = React.useState(false);
  useEffect(() => {
    handleExitFullScreen();
    setIsFullScreen(false);
  }, []);
  const handleExitFullScreen = () => {
    if (document.fullscreenElement === editorRef.current)
      document.exitFullscreen();
    setIsFullScreen(false);
  };
  const handleFullScreen = () => {
    editorRef.current.requestFullscreen();
    setIsFullScreen(true);
  };
  return (
    <div className="flex justify-around ">
      {!isFullScreen && (
        <div className="grow m-2">
          <button className="w-7 h-7 p-1 bg-teal-400 rounded hover:cursor-pointer hover:bg-teal-500">
            <FontAwesomeIcon icon={faExpand} onClick={handleFullScreen} />
          </button>
        </div>
      )}
      {isFullScreen && (
        <div className="grow m-2">
          <button className="w-7 h-7 p-1 bg-emerald-200 rounded hover:cursor-pointer hover:bg-emerald-300">
            <FontAwesomeIcon icon={faCompress} onClick={handleExitFullScreen} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Controls;

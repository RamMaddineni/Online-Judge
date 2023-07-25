import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import AceEditor from "react-ace";
import {
  InputLabel,
  FormControl,
  Select,
  Button,
  CircularProgress,
} from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import "./CodeEditorUp.css";
import RunPopup from "../Editor/RunPopUp";
import * as ace from "ace-builds/src-noconflict/ace";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/theme-eclipse";
import "ace-builds/src-noconflict/ext-language_tools";
import { useDispatch, useSelector } from "react-redux";
import { setCodeInfo } from "../../redux/codeInfo";
import { setCodeError } from "../../redux/codeError";
import { setIsCompiling } from "../../redux/isCompiling";
import { useNavigate } from "react-router-dom";
import Controls from "../utils/Controls";
ace.config.set(
  "basePath",
  "https://cdn.jsdelivr.net/npm/ace-builds@1.23.1/src-noconflict/"
);
ace.config.setModuleUrl(
  "ace/mode/python",
  "https://cdn.jsdelivr.net/npm/ace-builds@1.23.1/src-noconflict/mode-python.js"
);
ace.config.setModuleUrl(
  "ace/mode/c_cpp",
  "https://cdn.jsdelivr.net/npm/ace-builds@1.23.1/src-noconflict/mode-c_cpp.js"
);
ace.config.setModuleUrl(
  "ace/mode/java",
  "https://cdn.jsdelivr.net/npm/ace-builds@1.23.1/src-noconflict/mode-java.js"
);

const CodeEditorUp = () => {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("cpp");
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const editorRef = React.useRef(null);
  const dispatcher = useDispatch();
  const { domain } = useSelector((state) => state.domain);
  const problem = JSON.parse(localStorage.getItem("currentProblem"));
  const navigate = useNavigate();
  useEffect(() => {
    dispatcher(setCodeInfo(null));
    dispatcher(setCodeError(null));
    dispatcher(setIsCompiling(false));
  }, []);

  const getLanguage = () => {
    if (language === "cpp") return "c_cpp";
    else if (language === "java") return "java";
    else if (language === "py") return "python";
    else if (language === "js") return "javascript";
    else if (language === "c") return "c_cpp";
  };
  // Handler for opening the pop-up
  const handleCustomInputButton = () => {
    setIsPopupVisible(true);
  };

  // Handler for closing the pop-up
  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };

  return (
    <div ref={editorRef} className="w-full h-screen flex flex-col  basis-1/2 ">
      <div className="flex sm:flex-col bg-teal-200 ">
        <div className="flex justify-around m-4 ">
          <div className="grow">
            <FormControl
              variant="outlined"
              sx={{ margin: "5px", maxWidth: 200 }}
            >
              <InputLabel htmlFor="outlined-age-native-simple">
                Language
              </InputLabel>
              <Select
                native
                label="Language"
                inputProps={{
                  name: "age",
                  id: "outlined-age-native-simple",
                }}
                onChange={(e) => {
                  setLanguage(e.target.value);
                }}
              >
                <option value="cpp">C++</option>
                <option value="java">Java</option>
                <option value="py">Python</option>
                <option value="js">JavaScript</option>
                <option value="c">C</option>
              </Select>
            </FormControl>
          </div>
          <button
            className="mx-2 text-slate-50 text-lg bg-teal-400 rounded-lg p-2 px-4 hover:bg-teal-600 shadow-lg"
            onClick={(e) => {
              e.preventDefault();
              navigate("/profile");
            }}
          >
            profile
          </button>
          <Controls editorRef={editorRef}></Controls>
        </div>
        <div className="flex justify-around">
          <div className="grow m-0">
            <Button
              variant="contained"
              color="primary"
              value="runcode"
              style={{ width: "100%" }}
              onClick={handleCustomInputButton} // Open the pop-up when the button is clicked
            >
              {false ? (
                <CircularProgress size={"25px"} style={{ color: "white" }} />
              ) : (
                <span className="spanClass">
                  <PlayCircleOutlineIcon
                    style={{ marginRight: "5px", marginBottom: "-7px" }}
                  />
                  Custom Input
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>
      {/* Render the RunPopup component when isPopupVisible is true */}
      {isPopupVisible && (
        <RunPopup
          language={language}
          code={code}
          onClose={handleClosePopup} // Pass the close handler to the pop-up
        />
      )}
      <div className="h-screen">
        <AceEditor
          mode={getLanguage()}
          theme={true ? "dracula" : "eclipse"}
          name="UNIQUE_ID_OF_DIV"
          onChange={(val) => {
            setCode(val);
          }}
          className="ace_editor"
          width="100%"
          height="100%"
          highlightActiveLine={true}
          showGutter={true}
          wrapEnabled={true}
          editorProps={{ $blockScrolling: true }}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            showLineNumbers: true,
            tabSize: 2,

            cursorStyle: "smooth",

            fontSize: "17px",
          }}
        />
      </div>
    </div>
  );
};

export default CodeEditorUp;

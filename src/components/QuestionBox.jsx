import { useEffect, useState } from "react";
import useData from "../CustomHook/useData";
import Palette from "./Palette";
import Button from "./Button";
import LoadingSpinner from "./Loading";

function QuestionBox() {
  const { questions, questionNo, back, front, Submit } = useData();
  const [options, setOptions] = useState([]);
  const [correct, setCorrect] = useState("");

  useEffect(() => {
    if (questions.length) {
      setCorrect(questions[questionNo]["correct_answer"]);
      const incorrect = questions[questionNo]["incorrect_answers"];
      setOptions([...incorrect, correct].sort());
    }
  }, [questionNo, questions, correct]);
  if (questions.length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <div className="bg-gray-100 flex flex-col justify-center w-9/12 min-w-64 h-screen text-center dark:text-white absolute top-0 left-0">
      <div className="items-center my-20 content-center justify-self-center w-auto">
        <Palette
          isQuestion={true}
          text={((htmlString) => {
            var tempElement = document.createElement("div");
            tempElement.innerHTML = htmlString;
            return tempElement.textContent || tempElement.innerText;
          })(questions[questionNo]["question"])}
          question={questions[questionNo]}
        />
        <span
          className={`${
            questions[questionNo]["difficulty"] === "hard"
              ? "bg-red-700"
              : questions[questionNo]["difficulty"] === "medium"
              ? "bg-yellow-700"
              : "bg-green-700"
          }
        text-white w-auto px-3 py-1 rounded-md absolute top-6 right-5 `}
        >
          {" "}
          {questions[questionNo]["difficulty"]}{" "}
        </span>
        <div className="grid grid-cols-2 w-9/12 m-auto ">
          {options.map((op, index) => {
            return (
              <Palette
                question={questions[questionNo]}
                isQuestion={false}
                key={op}
                text={((htmlString) => {
                  var tempElement = document.createElement("div");
                  tempElement.innerHTML = htmlString;
                  return tempElement.textContent || tempElement.innerText;
                })(op)}
                index={index}
              />
            );
          })}
        </div>
        <div className="flex justify-around">
          <Button fn={back} text={"previous"} color={"red"} />
          <Button fn={front} text={"next"} color={"red"} />
          <Button
            fn={Submit}
            correct={correct}
            color={"yellow"}
            text={"Submit"}
          />
        </div>
      </div>
    </div>
  );
}

export default QuestionBox;

/**
 * ((htmlString) => {
            var tempElement = document.createElement("div");
            tempElement.innerHTML = htmlString;
            return tempElement.textContent || tempElement.innerText;
          })(op)
 */
// import { Button } from 'react-bootstrap';

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useEffect, useState } from "react";
import LoadingBar from "react-top-loading-bar";

function App() {
  let [index, setindex] = useState(0);
  let [Questions, setQuestion] = useState();
  let [isLoading, setloader] = useState(true);
  let [score, setscore] = useState(0);
  let [isFinished, setfinished] = useState(false);
  let [isclicked, setclicked] = useState(false);
  let [progress, setProgress] = useState(0);
  let [options, setOptions] = useState([]);

  //to fetch

  useEffect(() => {
    shuffledOptopns();
  }, [index, Questions]);

  useEffect(() => {
    setloader(true);
    fetch("https://the-trivia-api.com/v2/questions/")
      .then((result) => result.json())
      .then((data) => {
     
        setQuestion(data);
        setloader(false);
      });
  }, []);

  //to Check

  const checkAns = (e) => {
    const ans = Questions[index].correctAnswer;
    if (!isclicked) {
      if (e.target.innerText == Questions[index].correctAnswer) {
        e.target.classList.add("correct");
        setscore(score + 1);
      } else {
        e.target.classList.add("galat");
      }

      setclicked(true);
    }
  };

  const shuffledOptopns = () => {
    // console.log(Questions, "-> questions");
    if (Questions) {
      setOptions(
        [
          ...Questions[index]?.incorrectAnswers,
          Questions[index]?.correctAnswer,
        ].sort(() => Math.random() - 0.5)
        );
        console.log(Questions[index].correctAnswer)
    }
  };

  const next = () => {

    if (isclicked) {
          if (index < Questions.length - 1) {
            setindex(index + 1);
            const allElements = document.querySelectorAll("li");
            allElements.forEach((element) => {
              element.classList.remove("correct");
              element.classList.remove("galat");
            });
            setclicked(false);
          } else {
            setfinished(true);
          }
          setProgress(progress + 10);
        }
        
        };



  const restart = () => {
    setindex(0);
    setscore(0);
    setfinished(false);
    setclicked(false);
  };

  return (
    <>
      <LoadingBar
        color="#f11946"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      {isLoading ? (
        <div class="spinner-border text-danger" id="spinner" role="status">
          <span class="sr-only"></span>
        </div>
      ) : (
        <div className="container">
          <span>
            <h1>Quiz App</h1>
            <h2>
              {" "}
              {!isFinished ? `Category   :   ${Questions[index].category}` : ""}
            </h2>
          </span>
          <hr />

          {isFinished ? (
            <>
              <h1>finished</h1>
              <h2>
                you score {score} out of {Questions.length}
              </h2>
              <button className="mt-3" onClick={restart}>
                Restart
              </button>
            </>
          ) : (
            <>
              <h2>{index + 1 + ". " + Questions[index].question.text}</h2>
              <ul>
                {options.map((option, idx) => (
                  <li onClick={checkAns} key={idx}>
                    {option}
                  </li>
                ))}
              </ul>
              <button onClick={next}>NEXT</button>
              <div className="index">
                {index + 1} of {Questions.length} Question
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default App;

import { createContext } from "react";
import { useState, useEffect } from "react";
import { decode } from "html-entities";
import Axios from "axios";

const ApiDataContext = createContext();

export function ApiDataProvider({ children }) {

    //states
  const [apiData, setApiData] = useState([]);

  //sports
  const apiUrl2 =
    "https://opentdb.com/api.php?amount=10&category=21&difficulty=medium&type=multiple";

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    // const cancelToken = Axios.CancelToken.source();

    async function getApiData() {
      try {
        const response = await Axios.get(apiUrl2, { signal: signal });

        setApiData(response.data.results);

        setApiData((prevState) => {
          const prevStateCopy = [...prevState];

          prevStateCopy.map((elt) => {
            const newIncorrectAnswers = addCorrectAnswerAtRandomIndex(
              elt.incorrect_answers,
              elt.correct_answer
            );

            elt.incorrect_answers = newIncorrectAnswers;
            return [elt];
          });

          return prevStateCopy;
        });
      } catch (error) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    }
    getApiData();

    return () => {
      controller.abort();
    };
  }, []);

  // console.log(apiData)

  function addCorrectAnswerAtRandomIndex(array, answer) {
    const newArray = [...array];
    const randomNumber = Math.floor(Math.random() * newArray.length + 1);
    newArray.splice(randomNumber, 0, answer);
    return newArray;
  }

  function decodeHtml(text) {
    return decode(text);
  }
  
  return (
    <ApiDataContext.Provider value={{apiData, decodeHtml}}>
      {children}
    </ApiDataContext.Provider>
  );
}

export default ApiDataContext;

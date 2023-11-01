import QuestionsContext from "../components/QuestionsContext.jsx";
import ApiDataContext from "../components/ApiDataContext.jsx";
import {useContext, useState, useEffect} from "react";
import TotalScore from "../components/TotalScore.jsx";

/**styles*/
import "../styles/answers.css"
export default function Answers(){

    const [answersData, setAnswersData] = useState([]);
    const [organizedAns, setOrganizedAns] = useState([])

    const {formData} = useContext(QuestionsContext)
    // console.log(formData);

    const {apiData, decodeHtml} = useContext(ApiDataContext);
    console.log(apiData)

    useEffect(() => {
        const storedFormData = localStorage.getItem('formData');
        // console.log(storedFormData)
        if (storedFormData) {
            //JSON.parse(storedFormData)
            setAnswersData(() =>{
                const conversion = JSON.parse(storedFormData);

                //create an array in which each index is a question
                const questionArrays = Object.keys(conversion);
                console.log(questionArrays)

                //create an array in which each index is an answer
                const answersArrays = Object.values(conversion);
                console.log(answersArrays)

                //create array of correct answer form apiData;
                const correctAnswerArray = [...apiData.map((item)=>{
                    return item.correct_answer;
                })]

                console.log(correctAnswerArray)

                /**
                 * create a final array
                 * in which each index is object of the questions with corresponding answer */
                const finalArrays= [];

                for(let i=0; i< questionArrays.length; i++ ){
                    const innerArray = [];
                    innerArray.push(questionArrays[i], answersArrays[i], correctAnswerArray[i]);
                    finalArrays.push(innerArray);
                }

                return finalArrays
            });
        }
    }, [formData]);

    console.log(answersData);




    return(
        <div className="answers-container">
            <h1>Answers</h1>
            <TotalScore answersData ={answersData}/>
        </div>
    )
}

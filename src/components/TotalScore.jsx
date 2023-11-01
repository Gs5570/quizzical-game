import "../styles/totalScore.css"
import {useContext, useState} from "react";
import {useNavigate} from 'react-router-dom';
import ApiDataContext from "./ApiDataContext.jsx";


export default function TotalScore({answersData}) {

    const[score, setScore] = useState({
        rightAnswers: null,
        totalQuestion: null,
    });
    console.log(score)
    console.log(answersData);


    const navigateTo = useNavigate();
    const {decodeHtml} = useContext(ApiDataContext)
    function handleClick(){
        localStorage.clear();
        navigateTo("/");
        navigateTo(0);

    }

    let correctAnsValue = 0;
    let totalValue = 0;


    const finalresult = answersData.map((data)=>{
        if(data[1]===data[2]){
            correctAnsValue++
        }
        if(data[0]){
            totalValue++;
        }
        return{value: correctAnsValue, questions: totalValue}
    })
    console.log(correctAnsValue);
    console.log(totalValue)
    console.log(finalresult)
    // setScore((prevState)=>{
    //     return({...prevState, rightAnswers: correctAnsValue, totalQuestion: totalValue})
    // })

    return (
        <div>
            <div
                style={{

                    padding: 20,
                    boxShadow: "#FF7700 0px 3px 8px",
                    borderRadius: 20,
                }}>
                {answersData.map((answer) => {
                    return <div>
                        <p>{decodeHtml(answer[0])}</p>
                        <div className='formAnswers-container'>
                            <p style={{
                                backgroundColor: answer[1] === answer[2] ? 'lightgreen' : 'red',
                                padding: 5,
                                borderRadius: 20,
                                margin: 0,
                            }}>{decodeHtml(answer[1])}</p>
                            <p style={{
                                display: answer[2] == answer[1] && 'none'
                            }}>correct - Answers: {answer[2]}</p>
                        </div>
                    </div>

                })
                }
                <button
                    type = "button"
                    onClick={()=>{handleClick()}}
                >Play again</button>
            </div>

            <div className =" score-container">
                <p>Total Score</p>
                <div
                style={{
                    display: "flex",
                    flexDirection: "column"
                }}
                >
                    <span>{correctAnsValue}</span>
                    <span>out of</span>
                    <span>{totalValue}</span>

                </div>
            </div>
        </div>

    )
}
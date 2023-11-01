import ApiDataContext from "../components/ApiDataContext";
import {useContext, useEffect} from "react";
import {useForm} from "react-hook-form";
import {DevTool} from "@hookform/devtools";
import QuestionsContext from "../components/QuestionsContext.jsx";
import {useNavigate} from 'react-router-dom';

import "../styles/questions.css"

export default function Questions() {

    const {apiData, decodeHtml} = useContext(ApiDataContext);
    const {formData, setFormData} = useContext(QuestionsContext);
    const navigateTo = useNavigate();

    // const [formData, setFormData] = useState({});

    const form = useForm();
    const {
        register,
        handleSubmit,
        control,

    } = form;

    // const{errors} = formState;

    useEffect(() => {
        console.log(formData); // You can perform any additional actions with the updated formData state here
    }, [formData]);

    const onSubmit = async (data) => {

        // console.log(data);
        await setFormData(data);

        // Store the form data in local storage
        localStorage.setItem('formData', JSON.stringify(data));
        navigateTo('/answers');

    }


    return (

        <div className="questions-container">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <h1>Questions</h1>
                    {apiData.map(data => {
                        return <div className="questions-inputs-container">
                            <p> {decodeHtml(data.question)} </p>
                            {data.incorrect_answers.map((incorrectAns, index) => {
                                return <label
                                    className="radio-label"
                                    key={index}>
                                    <input
                                        className="radio-input"
                                        {...register(data.question, {
                                            message:"please select a answer",
                                            required:true,
                                            })
                                        } //causes an error if you decode the answers
                                        type="radio"
                                        value={incorrectAns}
                                        defaultChecked={false}

                                    /><span>{incorrectAns}</span>

                                </label>

                            })}

                        </div>
                    })}

                </div>
                <button
                    type="button"
                    onClick={handleSubmit(onSubmit)}>Check Answers
                    {/*<Link to="answers">check Answers</Link>*/}
                    {/*<Outlet />*/}
                </button>

            </form>
            <DevTool control={control}/>
        </div>
    )
}

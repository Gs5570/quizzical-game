import {createContext, useContext} from "react";
import {useState} from "react";
import ApiDataContext from "./ApiDataContext.jsx";



const QuestionsContext = createContext();

export function QuestionsProvider({children}){


    const[formData, setFormData] = useState([]) // state for submitted form data

    return(
        <QuestionsContext.Provider value={{formData, setFormData}}>
            {children}
        </QuestionsContext.Provider>
    )
}

export default QuestionsContext;
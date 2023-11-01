import {Routes, Route} from 'react-router-dom';
import {ApiDataProvider} from './components/ApiDataContext';
import {QuestionsProvider} from "./components/QuestionsContext.jsx"


//navigation Layout
import NavLayout from './components/NavLayout'

//pages
import Home from './pages/Home';
import Answers from './pages/Answers';
import Questions from './pages/Questions';


//styles
import './app.css'

function App() {

    return (
        <ApiDataProvider>

            <div className="app-container">

                <QuestionsProvider>
                    <Routes>
                        <Route path="/" element={<Home/>}/>;
                        <Route element={<NavLayout/>}>;
                            <Route path="answers" element={<Answers/>}/>;
                            <Route path="questions" element={<Questions/>}/>;
                            <Route path="questions/answers" element={<Answers/>}/>;

                        </Route>;
                    </Routes>;
                </QuestionsProvider>


            </div>
        </ApiDataProvider>
    )
}

export default App

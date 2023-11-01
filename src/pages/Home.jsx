//css
import '../styles/home.css'
import {Link} from 'react-router-dom'

//style
import '../styles/home.css'

export default function Home() {
    return (
        <div className="home-container">
            <div className="start-text">
                <h1>Quizzical</h1>
                <p>Test your knowledge</p>
                <button><Link style={{textDecoration: "unset", color: "aliceblue"}} to="questions">Start quiz</Link>
                </button>
            </div>
        </div>
    )
}
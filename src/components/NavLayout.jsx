import { Link, Outlet } from "react-router-dom"
export default function NavLayout (){
    return(
        <>
            <Link to="questions">Questions</Link>
            <Link to="answers">Answers</Link>
            <Outlet />
        </>
    )
}
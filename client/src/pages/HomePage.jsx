import { Link } from "react-router-dom";
import "../styles/HomePage.css"

function HomePage() {

    return(
        <>
            <h2>SBD Tracker</h2>
            <p>View your PowerLift numbers here!</p>
            <div className="homediv" id="red">
                <Link to="/workout/squat">Squat</Link>
            </div>
            <div className="homediv" id="green">
                <Link to="/workout/deadlift">Deadlift</Link>
            </div>
            <div className="homediv" id="blue">
                <Link to="/workout/bench">Bench</Link>
            </div>
            <div className="homediv" id="grey">
                <Link to="/stats">Stats</Link>
            </div>
        </>
    );
}

export default HomePage;
import { Link } from "react-router-dom";

//Navigation Bar Component that will have Links to every other page
function NavBar(){
    return(
        <nav className="nav">
            <div className="navLinks">
                <Link to="/">Home</Link>
                <Link to="/logworkout">Log Workout</Link>
                <Link to="/stats">Stats</Link>
                <Link to="/workouts/squat">Squat</Link>
                <Link to="/workouts/deadlift">Deadlift</Link>
                <Link to="/workouts/bench">Bench</Link>
                <Link to="/delete">Delete</Link>
                <Link to="/workouts/">All</Link>
            </div>
        </nav>
    );
}

export default NavBar;
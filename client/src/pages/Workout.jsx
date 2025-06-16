import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import WorkoutRow from "../components/WorkOutRow";
import '../styles/Table.css'

const WORKOUTS_PER_PAGE = 10;

function Workout() {
    const { name } = useParams();
    const [page, setPage] = useState(0);
    const [workouts, setWorkouts] = useState([]);

    const loadWorkouts = async() => {
        const endpoint = name ? `/exercises/name/${ name }` : '/exercises'
        const response = await fetch(endpoint);
        const workoutArray = await response.json();
        setWorkouts(workoutArray);
    }

    const handleDeleteID = async (id) => {
        const response = await fetch(`/exercises/${ id }`, {
            method: 'DELETE',
            headers: {
                    'Content-Type': 'application/json'
            },
        });
    
        if (response.status === 204) {
            loadWorkouts();
            alert(`Successfully Deleted ${ id }`);
        } else {
            alert(`Could not find ${ id }`);
        }
    };

    useEffect(() => {
        setPage(0);
        loadWorkouts();
    }, [name]);

    if (!workouts.length) {
        return <p>{name ? `Please log workouts for "${name}".` : 'No workouts found.'}.</p>;
    }

    const start = page * WORKOUTS_PER_PAGE;
    const end = start + WORKOUTS_PER_PAGE;
    const currentWorkouts = workouts.slice(start, end);

    const hasPrev = page > 0;
    const hasNext = end < workouts.length;

    return(
        <div>
            <h2>{name ? `${name.toUpperCase()} Workouts` : 'All Workouts'} Workouts</h2>
            <table>
                <thead>
                    <tr>
                        {!name && <th>Lift</th>}
                        <th>Date</th>
                        <th>Reps</th>
                        <th>Weight</th>
                        <th>Unit</th>
                    </tr>
                </thead>
                <tbody>
                    {currentWorkouts.map((workout, index) => (
                    <WorkoutRow key={index} workout={workout} onDelete={ handleDeleteID } showLiftName={!name}/>
                    ))}
                </tbody>
            </table>

            <div>
                <button onClick={() => setPage(page - 1)} disabled={!hasPrev}>
                    <FaArrowLeft />
                </button>
                <button onClick={() => setPage(page + 1)} disabled={!hasNext}>
                    <FaArrowRight />
                </button>
            </div>
        </div> 
    );
}

export default Workout;
import { useEffect, useState } from "react";
import '../styles/Selection.css'

function StatsPage() {
    const [lift, setLift] = useState("squat");
    const [workouts, setWorkouts] = useState([]);
    const [max, setMax] = useState(null);
    const [min, setMin] = useState(null);
    const [avgIncrease, setAvgIncrease] = useState(null);

    const loadWorkouts = async() => {
        const response = await fetch(`/exercises/name/${ lift }`);
        const workoutArray = await response.json();
        setWorkouts(workoutArray);
    }

    useEffect(() => {
        loadWorkouts();
    }, [lift]);

    useEffect(() => {
        // Calculate one-rep maxes only if there are workouts
        if (workouts.length > 0) {
            // I took this one rep max formula off the internet
            const oneRepMaxes = workouts.map(w => w.weight * (1 + w.reps / 30));

            const calculatedMax = Math.max(...oneRepMaxes).toFixed(1);
            const calculatedMin = Math.min(...oneRepMaxes).toFixed(1);
            setMax(calculatedMax);
            setMin(calculatedMin);

            let increases = 0;
            // Only calculate avg if there's more than one workout
            if (oneRepMaxes.length > 1) {
                // This for loop that will loop through the oneRepMaxes to calculate the avg
                // You take one then the previos and subtract to get the increases
                for (let i = 1; i < oneRepMaxes.length; i++) {
                    increases += oneRepMaxes[i] - oneRepMaxes[i - 1];
                }
                // then you divide by the length to get the avg
                const calculatedAvg = (increases / (oneRepMaxes.length - 1)).toFixed(1);
                setAvgIncrease(calculatedAvg);
            } else {
                setAvgIncrease(null); // Not enough data for average increase
            }
        } else {
            // if there are no workout's everything would be null but we just need to check for max or min
            setMax(null);
        }
        
    }, [workouts]);

    return (
        <>
            <div className="form">
                <label>
                    Lift:
                    <select value={lift} onChange={(e) => setLift(e.target.value)}>
                        <option value="squat">Squat</option>
                        <option value="bench">Bench</option>
                        <option value="deadlift">Deadlift</option>
                    </select>
                </label>
            </div>
            {/*If max is null it doesn't render the stats*/}
            {max !== null ? (
                <>
                    <p>Max: {max}</p>
                    <p>Min: {min}</p>
                    {/*This checks if avgIncrease is null there cannot be an increase with only one workout*/}
                    <p>Avg Increase: {avgIncrease !== null ? avgIncrease : 'Only one workout'}</p>
                </>
            ) : (
                <p>No workouts for this lift, please log a lift.</p>
            )}
        </>
    );
}

export default StatsPage;
import { useState } from "react";
import '../styles/Selection.css'

function DeletePage(){
    const [lift, setLift] = useState("squat");

    const handleDelete = async (e) => {
        e.preventDefault();

        const response = await fetch('/exercises', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ lift })
        });

        if (response.status === 200) {
            const result = await response.json();
            if(result.deletedCount === 0) {
                alert(`No workouts found for ${lift}.`);
            } else {
                alert(`Deleted ${result.deletedCount} workout(s) for ${lift}`);
            }
        } 
    };


    return(
        <>
        <div className="form">
             <label>
                Delete All From:
                <select value={lift} onChange={(e) => setLift(e.target.value)}>
                <option value="Squat">Squat</option>
                <option value="Bench">Bench</option>
                <option value="Deadlift">Deadlift</option>
                </select>
            </label>
        </div>
        <button id="red" onClick={handleDelete}>
            Delete
        </button>
        </>
    )
}

export default DeletePage;
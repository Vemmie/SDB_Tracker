import { useState } from "react";
import '../styles/Form.css';

// this is the form component for registration info
function Form() {

    // useState to handle form inputs 
    // one for name and one for email
    const [name, setName] = useState("squat");
    const [reps, setReps] = useState("");
    const [weight, setWeight] = useState("");
    const [unit, setUnit] = useState("lb");
    const [date, setDate] = useState("");

    // returns a form where the inputs on change will update the value of there state respectively
    // then the click button handles the submit and the default function is prevented

    const handleSubmit = async (e) => {
        e.preventDefault();

        const workoutData = {
            name,
            reps,
            weight,
            unit,
            date
        };

        const response = await fetch('/exercises/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(workoutData)
        });

        if(response.status === 201) {
            alert('Successfully submitted workout')
            const result = await response.json();
            console.log('Workout logged:', result)
        } else {
            const error = await response.json();
            alert(`Failed to submit workout, ${error.error}`);
        }

        // This resets the form
        setReps("");
        setWeight("");
        setDate("");
    }


    return(
        <form onSubmit={handleSubmit}>
            <fieldset>
                <legend>Log</legend>


                    <div className="form">
                        <label>
                            Lift:
                            <select value={name} onChange={(e) => setName(e.target.value)}>
                            <option value="Squat">Squat</option>
                            <option value="Bench">Bench</option>
                            <option value="Deadlift">Deadlift</option>
                            </select>
                        </label>
                    </div>

                    <div className="form">
                        <label> Reps: 
                            <input 
                            type="number" value={ reps } 
                            onChange={ (e) => setReps(e.target.valueAsNumber)} 
                            min="1"
                            required
                            />
                        </label>
                    </div>

                    <div className="form">
                        <label> Weight: 
                            <input 
                            type="number" value={ weight } 
                            onChange={ (e) => setWeight(e.target.valueAsNumber)} 
                            min="1"
                            required
                            />
                        </label>
                    </div>

                    <div className="form">
                        <label>
                            Unit:
                            <select value={unit} onChange={(e) => setUnit(e.target.value)}>
                            <option value="lb">lb</option>
                            <option value="kg">kg</option>
                            </select>
                        </label>
                    </div>

                    <div className="form">
                        <label> Date: 
                            <input 
                            type="text" value={ date } 
                            onChange={ (e) => setDate(e.target.value)} 
                            pattern="\d{2}-\d{2}-\d{2}"
                            placeholder="MM-DD-YY"
                            required
                            />
                        </label>
                    </div>

            </fieldset>
            <button type="submit">
                Submit
            </button>
        </form>
    )
}

export default Form;
// Get the mongoose object
import mongoose from 'mongoose';
import 'dotenv/config';

// Author: Francis Truong

const WORK_OUTCLASS = 'Workout';

let connection = undefined;

/**
 * This function connects to the MongoDB server.
 */
async function connect(){
    try{
        await mongoose.connect(process.env.MONGODB_CONNECT_STRING);
        connection = mongoose.connection;
        console.log("Successfully connected to MongoDB using Mongoose!");
    } catch(err){
        console.log(err);
        throw Error(`Could not connect to MongoDB ${err.message}`)
    }
}

// Define the workout Schema for mongoDB
const workoutSchema = mongoose.Schema({
    name: { type: String, required: true },
    reps: { type: Number, required: true },
    weight: { type: Number, required: true },
    unit: { type: String, required: true },
    date: { type: String, required: true },
}, { timestamps: true });

// Compile the model from the schema. 
 
const Workout = mongoose.model(WORK_OUTCLASS, workoutSchema);

/**
 * Create a workout
 * @param {String} name
 * @param {Number} reps
 * @param {Number} weight
 * @param {String} unit
 * @param {String} date
 * @returns A promise. Resolves to the JSON object for the document created by calling save
 */

const createWorkout = async (name, weight, reps, unit, date) => {
    const workout = new Workout({ name: name, weight: weight, reps: reps, unit: unit, date: date });
    return workout.save();
}

/**
 * Reads Workout(s)
 * @param {Object} filter
 * @returns A promise. Resolves to the an Array of JSON object based on the filter provided
 */
const readWorkout = async(filter = {}) => {
    const query = Workout.find(filter);
    return query.exec();
}

/**
 * Reads a single Workout by ID
 * @param {String} id - The unique ID of the workout (e.g., MongoDB ObjectId)
 * @returns A promise. Resolves to a JSON object or null if not found
 */
const readWorkoutById = async (id) => {
    return Workout.findById(id).exec();
};

/**
 * Updates Workout
 * @param {String} id
 * @param {Object} newWorkout - the workout data
 * @returns A promise. Resolves with the number that is modified
 */
const updateWorkout = async(id, newWorkout) => {
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return null;
    }

    const result = await Workout.updateOne(
        { _id: id },
        { $set: newWorkout} 
        );
    return result.modifiedCount;
}

/**
 * deletes a Workout
 * @param {Object} query - has the filters
 * @returns A promise that will be resolved with the number of deleted
 */
const deleteWorkouts = async (filter) => {
    const deletedWorkout = await Workout.deleteMany(filter);
    return deletedWorkout.deletedCount;
};

/**
 * deletes a Workout
 * @param {String} id 
 * @returns A promise that will be resolved with the number of deleted
 */
const deleteOneWorkout = async (id) => {
    const deletedWorkout = await Workout.deleteOne({ _id: id });
    return deletedWorkout.deletedCount;
}

export { connect, createWorkout, readWorkout, updateWorkout, deleteOneWorkout, deleteWorkouts, readWorkoutById};
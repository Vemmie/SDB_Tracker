import 'dotenv/config';
import express from 'express';
import asyncHandler from 'express-async-handler';
import * as workouts from './exercises_model.mjs';
import path from 'path';
import { fileURLToPath } from 'url';

// Author: Francis Truong

const app = express();
app.use(express.json())

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
    await workouts.connect()
    console.log(`Server listening on port ${PORT}...`);
});

// Support __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ======== Serve React build (production) ========
const distPath = path.join(__dirname, '..', 'client', 'dist');
app.use(express.static(distPath));



/**
 * Helper functions / for validation
 * /

/**
 *
 * @param {number} weight
 * Return true if weight is a number between 1 and 1500 
 */
function isValidWeight(weight) {
    return typeof weight === 'number' && weight >= 1 && weight <= 1500;
}

/**
 *
 * @param {number} rep
 * Return true if rep is a number between 1 and 100 
 */
function isValidReps(reps) {
    return typeof reps === 'number' && reps >= 1 && reps <= 100;
}

/** 
 * 
 * @param {string} date 
 * Return true if the date format is MM-DD-YY where MM, DD and YY are 2 digit integers 
 */
function isValidDate(date) {
    const dateRegex = /^\d{2}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) return false;

    const [mm, dd, yy] = date.split('-').map(Number);
    return mm >= 1 && mm <= 12 && dd >= 1 && dd <= 31;
}

// Serve React index.html for any unknown routes
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

/**
 * Create a new user with the query parameters provided in the body
 */
app.post('/exercises', asyncHandler(async (req, res) => {
    const { name, weight, reps, unit, date } = req.body;

    // Validate fields
    if (!isValidWeight(weight)) {
        return res.status(400).json({ error: 'Invalid weight: must be between 1 and 1500.' });
    }

    if (!isValidReps(reps)) {
        return res.status(400).json({ error: 'Invalid reps: must be between 1 and 100.' });
    }

    if (!isValidDate(date)) {
        return res.status(400).json({ error: 'Invalid date: must be in MM-DD-YY format with valid numbers.' });
    }

    // Create workout
    const workout = await workouts.createWorkout(
        name.toLowerCase(),
        weight,
        reps,
        unit,
        date
    );

    res.status(201).json(workout);
}));

/**
 * Gets work out based on the params provided in the URL
 */
app.get('/exercises/name/:name', asyncHandler(async (req, res) => {
    const workoutName = req.params.name;
    const workout = await workouts.readWorkout({  name: workoutName });

    if (!workout || workout.length === 0) {
      return res.status(404).json({ error: 'Workout not found' });
    }

    res.status(200).json(workout); 
}));
/**
 * Gets by ID only used for testing
 */
app.get('/exercises/:id', asyncHandler(async (req, res) => {
    const workoutId = req.params.id;
    const workout = await workouts.readWorkoutById(workoutId);

    if (!workout) {
        return res.status(404).json({ error: 'Workout not found' });
    }

    res.status(200).json(workout);
}));
/**
 * Gets all workouts based 
 */
app.get('/exercises', asyncHandler(async (req, res) => {
    const workout = await workouts.readWorkout();

    if (!workout || workout.length === 0) {
      return res.status(404).json({ error: 'Workout not found' });
    }

    res.status(200).json(workout); 
}));

/**
 * Updates the workout based on the ID
 */
app.put('/exercises/:id', asyncHandler(async (req, res) => {
    const id = req.params.id;

    const updatedWorkout = {};
    // Only validate and update if the field is provided
    if (req.body.name) {
        updatedWorkout.name = req.body.name;
    }
    if (req.body.reps) {
        if (!isValidReps(req.body.reps)) {
            return res.status(400).json({ error: 'Invalid reps: must be a number between 1 and 100.' });
        }
        updatedWorkout.reps = req.body.reps;
    }

    if (req.body.weight) {
        if (!isValidWeight(req.body.weight)) {
            return res.status(400).json({ error: 'Invalid weight: must be a number between 1 and 1500.' });
        }
        updatedWorkout.weight = req.body.weight;
    }

    if (req.body.unit) {
        const validUnits = ['lbs', 'kgs'];
        if (!validUnits.includes(req.body.unit)) {
            return res.status(400).json({ error: 'Invalid unit: must be "lb" or "kg".' });
        }
        updatedWorkout.unit = req.body.unit;
    }

    if (req.body.date) {
        if (!isValidDate(req.body.date)) {
            return res.status(400).json({ error: 'Invalid date: must be in MM-DD-YY format.' });
        }
        updatedWorkout.date = req.body.date;
    }

    const modifiedCount = await workouts.updateWorkout(id, updatedWorkout);
    if(modifiedCount === 1) {
        return res.status(200).json(updatedWorkout);
    }
    return res.status(404).json({"Error": "Not found"});
}))

/**
 * Deletes workout based on ID
 * If it's not found for some reason (shouldn't be the case) return a 404 error
 */
app.delete('/exercises/:id', asyncHandler(async (req, res) => {
    const id = req.params.id;
    const deletedCount = await workouts.deleteOneWorkout(id);
    if(deletedCount === 0) {
        return res.status(404).json({"Error": "Not found"});
    } 
    return res.status(204).json({});
}))

/**
 * Deletes workouts based on the query params provided in the URL
 * If there are no query params it returns count of 0
 */
app.delete('/exercises', asyncHandler(async (req, res) => {
    const filter = req.body.name.toLowerCase();
    const deletedCount = await workouts.deleteWorkouts({ name: filter });
    return res.status(200).json({"deletedCount" : deletedCount});
}))
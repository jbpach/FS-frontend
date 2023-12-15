import { useEffect, useState } from "react";
import workoutService from "../services/workout";
import WorkoutForm from "../components/WorkoutForm";
import ExerciseView from "../ExerciseView"
import { useNavigate } from "react-router-dom";

const NewWorkout = () => {
    // make a note that we don't have to pass back the parent id since its the only one in state
    // Make a note that an exercise should not created if there already exists an exercise with that name

    const navigate = useNavigate();
    const [newWorkout, setNewWorkout] = useState(null)
    const [viewExercises, setViewExercises] = useState(false)

    const setExerciseString = (exercise) => {
        setViewExercises(!viewExercises)
        addExercise(exercise)
    }

    const setView = (id) => {
        setViewExercises(!viewExercises)
    }

    useEffect(() => {
        const createWorkout = async () => {
            const workoutObject = {
                "title": "New workout"
            }
            const response = await workoutService.createWorkout(workoutObject)
            console.log("Hello")
            setNewWorkout(response)
        }
        createWorkout()
    }, [])

    const addExercise = async (exercise) => {
        const exerciseObject = {
            title: exercise
        }
        const response = await workoutService.addExercise(newWorkout._id, exerciseObject)
        let currWorkout = { ...newWorkout }
        console.log(currWorkout)

        currWorkout.exercises = currWorkout.exercises.concat(response)
        setNewWorkout(currWorkout)
    }

    const removeExercise = async (exerciseid) => {
        const requestObject = {
            "_id": exerciseid
        }
        await workoutService.removeExercise(newWorkout._id, requestObject)
        let currWorkout = { ...newWorkout }
        currWorkout.exercises = currWorkout.exercises.filter(ex => ex._id != exerciseid)
        setNewWorkout(currWorkout)
    }

    const addSet = async (exerciseid) => {
        const requestObject = {
            "_id": exerciseid
        }
        const response = await workoutService.addSet(newWorkout._id, requestObject)
        let currWorkout = { ...newWorkout }
        let currExercise = currWorkout.exercises.find(ex => ex._id == exerciseid)
        currExercise.sets = currExercise.sets.concat(response)
        setNewWorkout(currWorkout)
    }

    const removeSet = async (exerciseid, setid) => {
        const requestObject = {
            "_exerciseid": exerciseid,
            "_setid": setid
        }
        await workoutService.removeSet(newWorkout._id, requestObject)
        let currWorkout = { ...newWorkout }
        let currExercise = currWorkout.exercises.find(ex => ex._id == exerciseid)
        currExercise.sets = currExercise.sets.filter(s => s._id != setid)
        setNewWorkout(currWorkout)
    }

    const handleWeightChange = (e, parentId, childId) => {
        let currWorkout = { ...newWorkout }
        let currExercise = currWorkout.exercises.find(ex => ex._id == parentId)
        currExercise.sets = currExercise.sets.map(s => s._id == childId ? { ...s, weight: e.target.value } : s)
        setNewWorkout(currWorkout)
    }

    const handleRepChange = (e, parentId, childId) => {
        let currWorkout = { ...newWorkout }
        let currExercise = currWorkout.exercises.find(ex => ex._id == parentId)
        currExercise.sets = currExercise.sets.map(s => s._id == childId ? { ...s, reps: e.target.value } : s)
        setNewWorkout(currWorkout)
    }

    const cancelWorkout = async () => {
        await workoutService.cancelWorkout(newWorkout._id)
        setNewWorkout(null)
        navigate('/')
    }

    const save = async (e) => {
        e.preventDefault()
        let promtRes = window.prompt("Workout Name?")
        if (!promtRes) {
            return;
        }
        let currWorkout = { ...newWorkout, title: promtRes }
        console.log(currWorkout)
        const response = await workoutService.Save(newWorkout._id, currWorkout)
        console.log(response)
        setNewWorkout(null)
        navigate('/')
    }

    return (
        (
            viewExercises ? (
                <ExerciseView setExerciseString={setExerciseString} />
            ) :
            (newWorkout && (<WorkoutForm workout={newWorkout} setView={setView} addSet={addSet} removeSet={removeSet} removeExercise={removeExercise} handleWeightChange={handleWeightChange} handleRepChange={handleRepChange} cancelWorkout={cancelWorkout} save={save} />)) 
        )
    )
}

export default NewWorkout
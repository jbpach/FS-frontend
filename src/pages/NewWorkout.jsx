import { useEffect, useState } from "react";
import workoutService from "../services/workout";
import WorkoutForm from "../components/WorkoutForm";
import ExerciseView from "../components/ExerciseView"
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const NewWorkout = () => {
    const navigate = useNavigate();
    let { id } = useParams();
    const [newWorkout, setNewWorkout] = useState(null)
    const [viewExercises, setViewExercises] = useState(false)

    useEffect(() => {
        const createWorkout = async () => {
            const response = await axios.get(`/api/workout/${id}`)
            setNewWorkout(response.data)
        }
        createWorkout()
    }, [])

    const handleExerciseView = () => {
        setViewExercises(!viewExercises)
    }

    const addExercise = async (exercise) => {
        const exerciseObject = {
            title: exercise
        }
        const response = await workoutService.addExercise(newWorkout._id, exerciseObject)
        let currWorkout = { ...newWorkout }

        currWorkout.exercises = currWorkout.exercises.concat(response)
        setNewWorkout(currWorkout)
        setViewExercises(false)
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
        localStorage.clear()
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
        const response = await workoutService.Save(newWorkout._id, currWorkout)
        localStorage.clear()
        setNewWorkout(null)
        navigate('/')
    }

    return (
        (
            viewExercises ? (
                <ExerciseView handleExerciseView={handleExerciseView} addExercise={addExercise} />
            ) :
            (newWorkout && (<WorkoutForm workout={newWorkout} handleExerciseView={handleExerciseView} addSet={addSet} removeSet={removeSet} removeExercise={removeExercise} handleWeightChange={handleWeightChange} handleRepChange={handleRepChange} cancelWorkout={cancelWorkout} save={save} />)) 
        )
    )
}

export default NewWorkout
import { useState } from "react"
import WorkoutForm from "./components/WorkoutForm";
import workoutService from "./services/workout";
import WorkoutCard from "./components/WorkoutCard";
import Button from "./components/Button";
import { FaPlus } from "react-icons/fa6";

const App = () => {
    const [newWorkout, setNewWorkout] = useState(null)
    const [workouts, setWorkouts] = useState([])

    useState(() => {
        const fetchWorkouts = async () => {
            const workouts = await workoutService.getWorkouts()
            setWorkouts(workouts)
        }
        fetchWorkouts()
    }, [])

    const createWorkout = async () => {
        const workoutObject = {
            "title": "New workout"
        }
        const response = await workoutService.createWorkout(workoutObject)
        setNewWorkout(response)
    }

    const addExercise = async (id) => {
        let promtRes = window.prompt("Exercise Name?")
        if (!promtRes) {
            console.log("Need to input a value")
            return;
        }
        const exerciseObject = {
            title: promtRes
        }
        const response = await workoutService.addExercise(id, exerciseObject)
        let currWorkout = {...newWorkout}
        currWorkout.exercises = currWorkout.exercises.concat(response)
        setNewWorkout(currWorkout)
    }

    const removeExercise = async (id, exerciseid) => {
        const requestObject = {
            "_id": exerciseid
        }
        await workoutService.removeExercise(id, requestObject)
        let currWorkout = {...newWorkout}
        currWorkout.exercises = currWorkout.exercises.filter(ex => ex._id != exerciseid)
        setNewWorkout(currWorkout)
    }

    const addSet = async (id, exerciseid) => {
        const requestObject = {
            "_id": exerciseid
        }
        const response = await workoutService.addSet(id, requestObject)
        let currWorkout = {...newWorkout}
        let currExercise = currWorkout.exercises.find(ex => ex._id == exerciseid)
        currExercise.sets = currExercise.sets.concat(response)
        setNewWorkout(currWorkout)
    }

    const removeSet = async (id, exerciseid, setid) => {
        const requestObject = {
            "_exerciseid": exerciseid,
            "_setid": setid
        }
        await workoutService.removeSet(id, requestObject)
        let currWorkout = {...newWorkout}
        let currExercise = currWorkout.exercises.find(ex => ex._id == exerciseid)
        currExercise.sets = currExercise.sets.filter(s => s._id != setid )
        setNewWorkout(currWorkout)
    }

    const handleWeightChange = (e, parentId, childId) => {
        let currWorkout = {...newWorkout}
        let currExercise = currWorkout.exercises.find(ex => ex._id == parentId )
        currExercise.sets = currExercise.sets.map(s => s._id == childId ? {...s, weight: e.target.value} : s)
        setNewWorkout(currWorkout)
    }

    const handleRepChange = (e, parentId, childId) => {
        let currWorkout = {...newWorkout}
        let currExercise = currWorkout.exercises.find(ex => ex._id == parentId )
        currExercise.sets = currExercise.sets.map(s => s._id == childId ? {...s, reps: e.target.value} : s)
        setNewWorkout(currWorkout)
    }
    
    const cancelWorkout = async (id) => {
        await workoutService.cancelWorkout(id)
        setNewWorkout(null)
    }

    const save = async (e, id) => {
        e.preventDefault()
        let promtRes = window.prompt("Workout Name?")
        let currWorkout = {...newWorkout, title: promtRes}
        const response = await workoutService.Save(id, currWorkout)
        setNewWorkout(null)
        setWorkouts(workouts.concat(response))
    }

    return (
        <div className="flex flex-col gap-1 p-2">
            {!newWorkout && <Button type='button' clickHandler={createWorkout} icon={<FaPlus />} label='Start workout'/> }
            {newWorkout && (
                <WorkoutForm workout={newWorkout} addExercise={addExercise} addSet={addSet} removeSet={removeSet} removeExercise={removeExercise} handleWeightChange={handleWeightChange} handleRepChange={handleRepChange} cancelWorkout={cancelWorkout} save={save}/>   
            )}
            <h2 className="text-white">Logged Workouts</h2>
            {workouts.map(workout => (
                <WorkoutCard key={workout._id} workout={workout} />
            ))}
        </div>        
    )
}

export default App
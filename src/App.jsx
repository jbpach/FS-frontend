import { useState } from "react"
import WorkoutForm from "./components/WorkoutForm";

const App = () => {

    const [workout, setWorkout] = useState([])

    useState(() => {
        const workout = window.localStorage.getItem('WorkOut')
        if (workout) {
            setWorkout(JSON.parse(workout))
        }
    }, [])


    const addSet = (id) => {
        let currWorkout = workout.find(ex => ex.id === id)
        let currSet = currWorkout.sets
        let setId = currSet.length ? currSet[currSet.length - 1].id + 1 : 0
        let newSet = {id: setId, weight: 0, reps: 0}
        currSet = currSet.concat(newSet)
        currWorkout = {...currWorkout, sets: currSet}
        setWorkout(workout.map(ex => ex.id === id ? currWorkout : ex))
    }

    const removeSet = (parentId, childId) => {
        let currWorkout = workout.find(ex => ex.id === parentId)
        let currSet = currWorkout.sets
        if (currSet.length === 1) {
            setWorkout(workout.filter(ex => ex.id !== parentId))
            return;
        }
        currSet = currSet.filter((set) => set.id !== childId)
        currWorkout = {...currWorkout, sets: currSet}
        setWorkout(workout.map(ex => ex.id === parentId ? currWorkout : ex))
    }

    const handleWeightChange = (e, parentId, childId) => {
        let currWorkout = workout.find(ex => ex.id === parentId)
        let currSet = currWorkout.sets
        currSet = currSet.map(set => set.id === childId ? { ...set, weight: e.target.value } : set)
        currWorkout = {...currWorkout, sets: currSet}
        setWorkout(workout.map(ex => ex.id === parentId ? currWorkout : ex))
    }

    const handleRepsChange = (e, parentId, childId) => {
        let currWorkout = workout.find(ex => ex.id === parentId)
        let currSet = currWorkout.sets
        currSet = currSet.map(set => set.id === childId ? { ...set, reps: e.target.value } : set)
        currWorkout = {...currWorkout, sets: currSet}
        setWorkout(workout.map(ex => ex.id === parentId ? currWorkout : ex))
    }

    const addWorkOut = () => {
        console.log('clicked')
    }

    const addExercise = () => {
        let exerciseId = workout.length ? workout[workout.length - 1].id + 1 : 0 
        // Before adding exercise prompt the user to either select or input the exercise name
        let response = window.prompt("Exercise Name?")
        if (!response) {
            console.log("Need to input a value")
            return;
        }
        let newExercise = {
            id: exerciseId, 
            name: response, 
            sets: [
                {id: 0, weight: 0, reps: 0}
            ]
        }
        setWorkout(workout.concat(newExercise))
    }

    const deleteExercise = (id) => {
        setWorkout(workout.filter(ex => ex.id !== id))
    }

    const saveWorkOut = (e) => {
        e.preventDefault()
        // window.localStorage.setItem('WorkOut', JSON.stringify(workout)) 
        console.log(workout)
    }

    return (
        <div>
            <WorkoutForm workout={workout} addExercise={addExercise} addSet={addSet} removeSet={removeSet} handleWeightChange={handleWeightChange} handleRepsChange={handleRepsChange} />   
        </div>        
    )
}

export default App
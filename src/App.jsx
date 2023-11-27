import { useState } from "react"
import Set from "./Set"

const App = () => {

    const [workout, setWorkout] = useState([
        {
            id: 0, 
            name: 'Bench Press', 
            sets: [
                {id: 0, weight: 0, reps: 0}
            ]
        }, 
        // {
        //     id: 1, 
        //     name: 'Dead Lift', 
        //     sets: [
        //         {id: 0, weight: 0, reps: 0}
        //     ]
        // },
        // {
        //     id: 2, 
        //     name: 'Squat', 
        //     sets: [
        //         {id: 0, weight: 0, reps: 0}
        //     ]
        // },
    ])

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
        window.localStorage.setItem('WorkOut', JSON.stringify(workout)) 
    }

    return (
        <div>
            <h1>FitnessLogger</h1>
            <form onSubmit={saveWorkOut}>
                {workout.map((ex) => (
                    <div key={ex.id}>
                        <h2>{ex.name} <button type="button" onClick={() => deleteExercise(ex.id)}>Delete Exercise</button></h2> 
                        {ex.sets.map((set, index) => (
                            <Set key={set.id} index={index} removeSet={() => removeSet(ex.id, set.id)} weight={set.weight}  reps={set.reps}handleWeightChange={(e) => handleWeightChange(e, ex.id, set.id)} handleRepsChange={(e) => handleRepsChange(e, ex.id, set.id)} />
                        ))}
                        <button type="button" onClick={() => addSet(ex.id)}>+ set</button>
                    </div>
                ))}
                <br/>
                <button type="button" onClick={addExercise}>+ Exercise</button>
                <br/>
                <br/>
                <button type="submit">Save Workout</button>
                <button>Delete Workout</button>
            </form>
                
        </div>        
    )
}

export default App
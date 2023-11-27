import { useState } from "react"

const Exercise = () => {
    const [exercise, setExercise] = useState([
        {id: 0, weight: 0, reps: 0}
    ])

    const addSet = (e) => {
        e.preventDefault()
        setExercise(exercise.concat(
            {id: exercise.length ? exercise[exercise.length - 1].id + 1: 0 , weight: 0, reps: 0}
        ))
    }
    
    const removeSet = (e, id) => {
        e.preventDefault()
        setExercise(exercise.filter((ex) => ex.id !== id))
    }

    const handleWeightChange = (e, id) => {
        let obj = exercise.find(ex => ex.id === id)
        let part = {...obj, weight: e.target.value}
        setExercise(exercise.map((ex) => ex.id === id ? part: ex))
    }

    const handleRepChange = (e, id) => {
        let obj = exercise.find(ex => ex.id === id)
        let part = {...obj, reps: e.target.value}
        setExercise(exercise.map((ex) => ex.id === id ? part: ex))
    }


    return (
        <div>
            <h2>BenchPress</h2>
            {exercise.map((ex, index) => (
                <div key={ex.id}>
                    {index + 1} <input type="number" value={ex.weight} onChange={(e) => handleWeightChange(e, ex.id) }/>lbs <input type="number" value={ex.reps} onChange={(e) => handleRepChange(e, ex.id) }/>reps <button onClick={(e) => removeSet(e, ex.id)}>- set</button>
                </div>
            ))}
            <button onClick={addSet}>+ set</button>
        </div>
    )
}

export default Exercise
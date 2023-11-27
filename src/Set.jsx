
const Set = ({index, removeSet, weight, handleWeightChange, reps, handleRepsChange}) => {
    return (
        <div>
            {index + 1} <input type="number" value={weight} onChange={handleWeightChange} />lbs <input type="number" value={reps} onChange={handleRepsChange}/>reps <button onClick={removeSet}>- set</button>
        </div>
 
    )
}

export default Set
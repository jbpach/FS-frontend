import React from 'react'
import Button from './Button'
import { FaCheck, FaXmark, FaTrash, FaPlus } from "react-icons/fa6"; 

const ExerciseCard = ({exercise, addSet, removeSet, handleWeightChange, handleRepsChange}) => {
    return (
        <div className=' w-full h-auto bg-[#222739] p-2 rounded-xl'>
            <div className='flex items-center justify-between mb-2'>
                <h2 className='text-white'>{exercise.name}</h2>
                <FaTrash className='text-[#F3766F]'/>
            </div>
            <div className=' flex flex-col gap-1 text-white mb-2'>
                {exercise.sets.map((set, index) => (
                    <div key={set.id}>
                        <div className='flex items-center justify-between w-full'>
                            {index + 1}
                            <label><input type='number' className='w-[125px] bg-inherit text-right' value={set.weight} onChange={(e) => handleWeightChange(e, exercise.id, set.id)}/> lbs</label>
                            <label><input type='number' className='w-[125px] bg-inherit text-right' value={set.reps} onChange={(e) => handleRepsChange(e, exercise.id, set.id)}/> reps</label>
                            <FaTrash className='text-[#F3766F]' onClick={() => removeSet(exercise.id, set.id)}/>
                        </div>
                        <hr/>
                    </div>
                ))}
                <Button type='button' clickHandler={() => addSet(exercise.id)} icon={<FaPlus/>} label={'Set'}/>
            </div>
        
        </div>
    )
}

export default ExerciseCard
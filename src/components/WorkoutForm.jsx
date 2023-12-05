import { useState } from 'react';
import React from 'react'
import Button from './Button'
import { FaCheck, FaXmark, FaTrash, FaPlus } from "react-icons/fa6";
import ExerciseCard from './ExerciseCard';
 

const WorkoutForm = ({workout, addExercise, addSet, removeSet, handleWeightChange, handleRepsChange}) => {
    return (
        <form className='w-full h-auto bg-[#0B0A0D] p-2 rounded-xl flex flex-col gap-2'>
            {workout.map((exercise) => (
                <ExerciseCard key={exercise.id} exercise={exercise} addSet={addSet} removeSet={removeSet} handleWeightChange={handleWeightChange} handleRepsChange={handleRepsChange}/>
            ))}         
            <Button type='button' clickHandler={addExercise} icon={<FaPlus />} label='Exercise'/>  
            <br />
            <Button type='submit' icon={<FaCheck />} label='Save workout'/>
            <Button type='button' icon={<FaXmark />} label='Cancel Workout' />
        </form>

    )
}

export default WorkoutForm
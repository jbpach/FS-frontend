import { FaCheck, FaXmark, FaPlus, FaTrash } from "react-icons/fa6";

const WorkoutForm = ({workout, handleExerciseView, addSet, removeSet, removeExercise, handleWeightChange, handleRepChange, cancelWorkout, save }) => {

    const inputOnInput = (e) => {
        if (e.target.value.length > 7) {
            e.target.value = e.target.value.slice(0, 7)
        }
    }

    const inputOnClick = (e) => {
        e.target.select()
    }

    return (
        <form onSubmit={(e) => save(e)} className='w-full h-auto rounded-xl flex flex-col'>
            <header className='fixed bg-[#0B0A0D] top-0 w-full p-2'>
                <nav className='flex items-center justify-between'>
                    <button type='button' className='w-9 h-9 bg-[#232839] flex items-center justify-center rounded-lg' onClick={() => cancelWorkout()}><FaXmark className='text-[#E37C73]'/></button>
                    <button type='submit' className='w-9 h-9 bg-[#232839] flex items-center justify-center rounded-lg'><FaCheck className='text-[#A8E89A]'/></button>
                </nav>
            </header>
            <main className='mt-8 p-2'>
                {
                    workout.exercises.map(ex => (
                        <div key={ex._id} className='flex flex-col bg-[#232839] rounded-lg mt-4'>
                            <div className='p-2 flex items-center justify-between'>
                                <h3 className=' font-semibold text-xl'>{ex.title}</h3>
                                <FaTrash className='text-[#E47D74]' onClick={() => removeExercise(ex._id)}/>
                            </div>
                            {
                                ex.sets.map((set, index) => (
                                    <div key={set._id} className='flex items-center justify-between border-t-[1px] p-2 border-[#0B0B0D]'>
                                        <span className='w-4 text-lg'>{index + 1}</span>
                                        <div>   
                                            <input id="weight" input type='number' value={set.weight} onChange={(e) => handleWeightChange(e, ex._id, set._id)} onInput={(e) => inputOnInput(e)} onClick={(e) => inputOnClick(e)} className='bg-[#232839] w-[70px] leading-none text-white text-lg caret-[#E47D74] outline-none text-right selection:bg-[#E47D74]'  />
                                            <label htmlFor="weight">lbs</label>
                                        </div>
                                        <div>   
                                            <input id="reps" input type='number' value={set.reps} onChange={(e) => handleRepChange(e, ex._id, set._id)} onInput={(e) => inputOnInput(e)} onClick={(e) => inputOnClick(e)} className='bg-[#232839] w-[70px] leading-none text-white text-lg caret-[#E47D74] outline-none text-right selection:bg-[#E47D74]'  />
                                            <label htmlFor="reps">lbs</label>
                                        </div>
                                        <FaTrash className='text-[#E47D74]' onClick={() => removeSet(ex._id, set._id)}/>
                                    </div>
                                ))
                            }
                            <span className='border-t-[1px]  border-[#0B0B0D] p-2 h-9 flex items-center gap-2 text-[#E47D74] text-lg' onClick={() => addSet(ex._id)}><FaPlus /> Set</span> 
                        </div>
                    ))
                }
            </main>
            <footer className='m-2'>
                <button type='button' className='w-full flex items-center justify-center gap-2 bg-[#E47D74] rounded-lg h-9' onClick={() => handleExerciseView()}><FaPlus /> Exercise</button>         
            </footer>
           
        </form>
    )
}

export default WorkoutForm
import { useEffect, useState } from "react";
import workoutService from "../services/workout";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaTrash, FaDumbbell } from "react-icons/fa6";
import { GiWeightLiftingUp } from "react-icons/gi";
import axios from "axios";

const Workout = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [data, setdata] = useState(null)

    useEffect(() => {
        const fetchWorkout = async () => {
            // const response = await workoutService.getWorkout(id)
            // setWorkout(response)

            const response = await axios.get(`http://localhost:3001/api/workout/facts/${id}`)
            console.log(response.data)
            setdata(response.data)
        }
        fetchWorkout()
    }, [])

    const backToLog = () => {
        navigate('/log')
    }


    return (
        data && 
            <>
                <header className='fixed top-0 w-full p-2 bg-[#0B0B0D]'>
                    <nav className='flex items-center justify-between gap-2'>
                        <button className='w-9 h-9 bg-[#232839] flex items-center justify-center rounded-lg' onClick={() => backToLog()} ><FaArrowLeft /></button>
                        <button className='w-9 h-9 bg-[#232839] flex items-center justify-center rounded-lg' ><FaTrash className='text-[#E47D74]'/></button>
                    </nav>  
                </header>
                <main className="mt-14 m-2 flex flex-col gap-4">
                    <div className="bg-[#232839] rounded-lg flex gap-4">
                        <GiWeightLiftingUp className=" text-[225px]"/> 
                        <div  className="w-full flex flex-col items-center mt-[2em]">
                            <h1 className='font-semibold text-xl'>{data.workout.title}</h1>
                            <p>{new Date(data.workout.createdAt).toLocaleDateString()} {new Date(data.workout.createdAt).toLocaleTimeString()} - {new Date(data.workout.updatedAt).toLocaleTimeString()}</p>
                        </div>
                    </div>
                    <button className="border-[1px] rounded-lg p-3 text-[#E37C73]">Train again</button>
                    <div className="bg-[#232839] rounded-lg p-2 grid grid-cols-3 gap-2">
                        <div className="flex flex-col items-center">
                            <p className="text-sm">Total Sets</p>
                            <p className='font-semibold text-md'>{data.totalSets}</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <p className="text-sm">Total Reps</p>
                            <p className="font-semibold text-md">{data.totalReps}</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <p className="text-sm">Most sets of</p>
                            <p className="text-center font-semibold text-md">{data.mostSets}</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <p className="text-sm">Total weight</p>
                            <p className="font-semibold text-md">{data.totalWeight} <span className="text-sm font-normal">lbs</span></p>
                        </div>
                        <div className="flex flex-col items-center">
                            <p className="text-sm">Average weight</p>
                            <p className="text-md font-semibold">{data.totalWeight / data.totalSets} <span className="text-sm font-normal">lbs</span></p>
                        </div>
                        <div className="flex flex-col items-center">
                            <p className="text-sm">Heaviest</p>
                            <p className="text-md font-semibold">{data.heaviestWeight} <span className="text-sm font-normal">lbs</span></p>
                        </div>
                    
                    </div>
                    {data.workout.exercises.map(ex => (
                        <div key={ex._id} className='flex flex-col bg-[#232839] rounded-lg'>
                                <div className='p-2 flex items-center justify-between'>
                                    <h3 className=' font-semibold text-lg'>{ex.title}</h3>
                                    <FaDumbbell className='text-[#6B7076]'/>
                                </div>
                                {
                                    ex.sets.map((set, index) => (
                                        <div key={set._id} className='flex items-center justify-between border-t-[1px] p-2 border-[#0B0B0D]'>
                                            <span className='w-4'>{index + 1}</span>
                                            <div className="flex items-center gap-1">
                                                <p className="text-right w-[100px]">{set.weight}</p> 
                                                <span className="text-[#BCBDC2] text-sm">lbs</span> 
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <p className="text-right w-[100px]">{set.reps}</p>
                                                <span className="text-[#BCBDC2] text-sm">reps</span>
                                            </div>
                                        </div>
                                    ))
                                }
                        </div>
                    ))}
                </main>
            </>
        
    )
}

export default Workout
import { useState } from "react"
import workoutService from "../services/workout"
import WorkoutCard from "../components/WorkoutCard";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";

const Log = () => {
    const navigate = useNavigate();
    const [workouts, setWorkouts] = useState([])

    useState(() => {
        const fetchWorkouts = async () => {
            const workouts = await workoutService.getWorkouts()
            setWorkouts(workouts)
        }
        fetchWorkouts()
    }, [])

    const returnHome = () => {
        navigate('/')
    }

    return (
        <>
            <header className='fixed top-0 w-full p-2 bg-[#0B0B0D]'>
                <nav className='flex items-center justify-between gap-2'>
                    <button className='w-9 h-9 bg-[#232839] flex items-center justify-center rounded-lg' onClick={() => returnHome()}><FaArrowLeft /></button>
                    <h1 className='font-semibold text-lg'>Choose workout to train again</h1>
                </nav>  
            </header>
            <main className="mt-12 p-2 flex flex-col gap-4">
                {
                    workouts.map(workout => (
                        <WorkoutCard key={workout._id} workout={workout} />
                    ))
                }
            </main>
        </>
    )
}

export default Log
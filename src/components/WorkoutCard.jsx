import { FaAngleRight } from "react-icons/fa6";

const WorkoutCard = ({ workout, editWorkout }) => {
    const exercises = workout.exercises.map(ex => ex.title).join(', ')
    const date = new Date(workout.createdAt).toLocaleDateString()
    return (
        <div className="w-full h-auto bg-[#222739] rounded-lg border-l-8 border-l-white p-2 flex flex-nowrap items-center justify-between"
            onClick={() => editWorkout(workout)}
        >
            <div className="text-white">
                <p className="font-semibold leading-none mb-2">{date}</p>
                <h2 className="leading-none mb-1">{workout.title}</h2>
                <p className="leading-none text-slate-500">{exercises}</p>
            </div>
            
            <FaAngleRight className="text-slate-500"/>
        </div>
    )
}

export default WorkoutCard
import { useState } from "react"
import workoutService from "../services/workout"
import WorkoutCard from "../components/WorkoutCard"

const LoggedWorkouts = () => {
  const [workouts, setWorkouts] = useState([])

  useState(() => {
    const fetchWorkouts = async () => {
        const workouts = await workoutService.getWorkouts()
        setWorkouts(workouts)
    }
    fetchWorkouts()
  }, [])

  return (
    <div className="flex flex-col gap-4 m-4">
      <h2 className=" font-semibold text-lg">Choose workout to train again</h2>
      {workouts.map(workout => (
        <WorkoutCard key={workout._id} workout={workout}  />
      ))}
    </div>
  )
}

export default LoggedWorkouts
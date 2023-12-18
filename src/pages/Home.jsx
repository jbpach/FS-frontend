import Button from "../components/Button"
import { FaPlus, FaAngleRight  } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import workoutService from "../services/workout"
import { useEffect } from "react";

const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const id = localStorage.getItem("id")
        if (id) {
            navigate(`/new/${id}`)
        }
    })

    const handleNewWorkoutClick = async () => {
        const workoutObject = {
            "title": "New workout"
        }
        const response = await workoutService.createWorkout(workoutObject)
        localStorage.setItem("id", response._id)
        navigate(`/new/${response._id}`)
    }

    const handleLogClick = () => {
        navigate("/log")
    }

    return (
        <div className="flex flex-col gap-1 p-2">
            <Button type='button' clickHandler={handleNewWorkoutClick} icon={<FaPlus />} label='Start workout'/>
            <Button type='button' clickHandler={handleLogClick} icon={<FaAngleRight />} label='Train a logged workout again'/>
        </div>    
    )
}

export default Home
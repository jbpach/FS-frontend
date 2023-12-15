import Button from "../components/Button"
import { FaPlus, FaAngleRight  } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    const handleNewWorkoutClick = () => {
        navigate("/new")
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
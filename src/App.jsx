import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NewWorkout from "./pages/NewWorkout";
import Log from "./pages/Log";
import Workout from "./pages/Workout";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new/:id" element={<NewWorkout />} />
            <Route path="/log" element={<Log />} />
            <Route path="/log/:id" element={< Workout/>} />
        </Routes>
    )
}

export default App
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import LoggedWorkouts from "./pages/LoggedWorkouts";
import NewWorkout from "./pages/NewWorkout";

const App = () => {
    console.log("Hello from App")
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<NewWorkout />} />
            <Route path="/log" element={<LoggedWorkouts />} />
            {/* <Route path="/log/:id" element={< />} /> */}
        </Routes>
    )
}

export default App
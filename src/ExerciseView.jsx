import axios from 'axios'
import { useState, useEffect } from 'react'
import { FaMagnifyingGlass, FaXmark, FaAngleDown, FaAngleUp } from "react-icons/fa6";

const ExerciseView = ({ setExerciseString }) => {
    const [show, setShow] = useState([])
    const [exercises, setExercise] = useState([])

    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState([])

    useEffect(() => {
        const fetchExs = async () => {
            const response =  await axios.get('/api/exercise')
            setExercise(response.data)
            const showArr = new Array(response.data.length).fill(false)
            setShow(showArr)
        }
        fetchExs()
    }, [])

    const handleShow = (id) => {
        setShow(show.map((elem, index) => index === id ? !elem : elem))
    }

    const Search = (e) => {
        setSearch(e.target.value)
        if(e.target.value == "") {
            setSearchResults([])
        } else {
            let results = exercises.map(parent => parent.exercises).flat(1)
            results = results.filter(ex => ex.exercise.toLowerCase().includes(search.toLowerCase()))
            setSearchResults(results)
        }
    }

    const displayShowResult = () => (
        <div className='text-white flex  flex-col gap-4'>
            <h2 className='text-center text-xl font-semibold'>Search hits ({searchResults.length})</h2>

            {searchResults.length > 0 &&
                <div className='bg-[#232839] rounded-lg p-4'>
                    {searchResults.map(result => (
                        <div  
                            className='p-4 border-b-2 border-[#171922]'
                            key={result.exercise + result.id}
                            onClick={() => setExerciseString(result.exercise)}
                        >
                            {result.exercise}
                        </div>
                    ))}
                </div>
            }
        </div>
    )

    const displayAllExercises = () => (
        <div className='text-white bg-[#232839] rounded-lg p-4'>
            {exercises.map(parent => (
                <div 
                    key={parent.id}
                >
                    <div
                        className='bg-[#232839] p-4 flex justify-between border-b-2 border-[#171922]' 
                        onClick={() => handleShow(parent.id)}
                    >
                        {parent.muscle}
                        {show[parent.id] ? <FaAngleDown className='text-[#E47D74]'/> : <FaAngleUp className='text-[#E47D74]'/>}
                    </div>
                    {
                        show[parent.id] && (parent.exercises.map(ex => (
                            <div 
                                key={ex.id}
                                className='bg-[#232839] p-4 border-b-2 border-[#171922]'
                                onClick={() => setExerciseString(ex.exercise)}
                            >
                                {ex.exercise}
                            </div>
                        )))
                    }
                </div>
            ))}
        </div>
    )

    return (
        <div className='flex flex-col gap-4'>

            <input 
                className='w-full bg-[#232839] rounded-lg text-white px-2 py-1 caret-[#E47D74] outline-none'
                value={search} 
                onChange={(e) => Search(e)}

            />

            {
                search != "" ? (
                    displayShowResult()
                ) : (
                    displayAllExercises()
                )
            }
        </div>
    )
}

export default ExerciseView
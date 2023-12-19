import axios from 'axios'
import { useState, useEffect } from 'react'
import { FaMagnifyingGlass, FaXmark, FaAngleDown, FaAngleUp, FaAngleLeft, FaDumbbell  } from "react-icons/fa6";

const ExerciseView = ({ handleExerciseView, addExercise }) => {
    const [exercises, setExercises] = useState([])
    const [show, setShow] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [searchResults, setSearchResults] = useState([])

    useEffect(() => {
        const fetchExercises = async () => {
            const response = await axios.get('/api/exercise')
            setExercises(response.data)
            setShow(new Array(response.data.length).fill(false))
        }
        fetchExercises()
    }, [])

    const deleteSearch = () => {
        setSearchValue('')
        setSearchResults([])
    }

    const setCurrentShow = (id) => {
        setShow(show.map((elem, index) => index == id ? !elem : elem))
    }

    const handleSearchInput = (e) => {
        setSearchValue(e.target.value)
        if (searchValue != '') {
            setSearchResults(exercises.map(parent => parent.exercises).flat(1).filter(ex => ex.exercise.toLowerCase().includes(searchValue.toLowerCase())))
        }
    }

    const viewExercisesByGroups = () => (
        exercises.map(group => (
            <div key={group.id} className='border-b-[1px] border-[#0B0B0D]'>
                <div className='flex items-center justify-between select-none py-4 px-2' onClick={() => setCurrentShow(group.id)}>
                    <h3 className='font-semibold'>{group.muscle} <span className='text-[#BCBDC2] text-sm'>({group.muscle.length})</span></h3>
                    { show[group.id] ? <FaAngleUp className='text-[#E47D74]' /> : <FaAngleDown className='text-[#E47D74]' />}
                </div>
                {show[group.id] && (
                    group.exercises.map(ex => (
                        <div key={ex.id} className='select-none py-4 px-2 border-t-[1px] border-[#0B0B0D] flex items-center justify-between' onClick={() => addExercise(ex.exercise)}>   
                            <span>{ex.exercise}</span>
                            <FaDumbbell className='text-[#6B7076]'/>
                        </div>
                    ))
                )}

            </div>
        ))
    )

    const viewExercisesBySearch = () => (    
        searchResults.map((ex, index) => (
            <div key={index} className='border-b-[1px] border-[#0B0B0D] py-4 px-2 flex items-center justify-between' onClick={() => addExercise(ex.exercise)}>
                <span>{ex.exercise}</span>
                <FaDumbbell className='text-[#6B7076]'/>
            </div>
        ))
    )
    
    return (
        <>
            <header className='fixed top-0 w-full p-2 bg-[#0B0B0D]'>
                <nav className='flex items-center justify-between gap-2'>
                    <button className='w-9 h-9 bg-[#232839] flex items-center justify-center rounded-lg' onClick={() => handleExerciseView()}><FaAngleLeft /></button>
                    <div className='relative flex items-center w-full'>
                        <FaMagnifyingGlass className='absolute ml-3 pointer-events-none' />
                        <input value={searchValue} onChange={(e) => handleSearchInput(e)} className='w-full h-9 px-10 rounded-lg bg-[#232839] text-white outline-none'/>
                        <FaXmark className='absolute right-0 mr-3 text-[#E37C73]' onClick={() => deleteSearch()}/>
                    </div>
                </nav>  
            </header>
            <main className='mt-14 m-2'>
                { searchValue && <h4 className='text-white font-semibold text-lg text-center mb-4'>Search hits ({searchResults.length})</h4> }
                <div className='bg-[#232839] rounded-lg px-2'>
                    {
                        searchValue ? 
                        viewExercisesBySearch() :
                        viewExercisesByGroups()
                    }
                </div>
            </main>
        </>
    )
}

export default ExerciseView
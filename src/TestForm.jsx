import { useState } from "react"


const TestForm = () => {
    const [name, setName] = useState({
        firstname: "", 
        lastname: ""
    })

    return (
        <>
            <div>TestForm</div>
            <form>
                <input 
                    value={name.firstname} onChange={(e) => setName({ ...name, firstname:e.target.value } )}
                />
                <input 
                    value={name.lastname} onChange={(e) => setName({ ...name, lastname:e.target.value } )}
                />
            </form>
        </>
    )
}

export default TestForm

import React, { useEffect } from 'react'
import axios from 'axios'

const Home = () => {

    useEffect(() => {
        axios.get(`http://localhost:5000/user`).then((response)=>{
        
        })
        
    }, [])

    return (
        <div>
            <h1>home</h1>
        </div>
    )
}

export default Home


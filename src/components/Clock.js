import React, { useState, useEffect } from 'react'

const Clock = () => {
    const [clock, setClock] = useState(new Date().toLocaleTimeString());
    useEffect(() => {
        const interval = setInterval(() => {
            updateTime();
        }, 1000);
        return () => {
            clearInterval(interval)
        }
    }, []);
    
    const updateTime = () => {
        const newTime = new Date().toLocaleTimeString();
        setClock(newTime);
    }

    return (
        <span>
            {clock}
        </span>
    )
}

export default Clock
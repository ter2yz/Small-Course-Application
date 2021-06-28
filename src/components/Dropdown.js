import React, { useState, useEffect } from 'react'

export default function Dropdown({ onChange }) {

    const [isOpen, setIsOpen] = useState(false)
    const [state, setState] = useState({
        name: null,
        value: null
    })

    const handleClick = (e) => {
        e.preventDefault()
        const { name, value } = e.target.dataset
        setState(preState => ({
            ...preState,
            name,
            value
        }))
        setIsOpen(false)
    }

    useEffect(() => {
        onChange(state)
    }, [state])

    return (
        <div
            className="relative flex flex-col"
        >
            <div className="flex items-center">
                <button onClick={() => setIsOpen(!isOpen)} className="px-2 py-2 w-40 border border-gray-200">
                    {
                        (state.name && state.value)
                            ? <div className="flex">
                                <p>{state.name} - {state.value}</p>
                            </div>
                            : <p>Filter</p>
                    }
                </button>
                {
                    (state.name && state.value)
                        ? <button className="ml-2 w-6 h-6 flex justify-center items-center rounded-full bg-black text-white" onClick={() => setState({ name: null, value: null })}>X</button>
                        : ''
                }
            </div>
            <div className={`${isOpen ? 'max-h-screen' : 'max-h-0'} min-w-max absolute top-full left-0 shadow-lg transition-all duration-500 bg-white overflow-hidden flex flex-col items-start`}>
                <button onClick={handleClick} data-name="publishDate" data-value="asc" className="my-2 px-2 py-1">Publish date: ASC</button>
                <button onClick={handleClick} data-name="publishDate" data-value="desc" className="my-2 px-2 py-1">Publish date: DESC</button>
                <button onClick={handleClick} data-name="duration" data-value="asc" className="my-2 px-2 py-1">Duration: ASC</button>
                <button onClick={handleClick} data-name="duration" data-value="desc" className="my-2 px-2 py-1">Duration: ASC</button>
            </div>
        </div>
    )
}

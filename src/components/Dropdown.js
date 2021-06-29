import React, { useState, useEffect } from 'react'
import { IoCloseCircleSharp } from 'react-icons/io5'

export default function Dropdown({ onChange, data, btnName, className }) {

    const [isOpen, setIsOpen] = useState(false)
    const [state, setState] = useState({
        handle: null,
        value: null,
        label: null
    })

    const handleClick = (e) => {
        e.preventDefault()
        const { handle, value } = e.target.dataset
        const label = e.target.innerText
        setState(preState => ({
            ...preState,
            handle,
            value,
            label
        }))
        setIsOpen(false)
    }

    useEffect(() => {
        onChange(state)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state])

    return (
        <div
            className={`relative ${className}`}
        >
            <div className="relative flex items-center z-30">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`bg-glass-300 px-2 py-2 w-40 text-white text-sm text-center transition-all rounded-t-lg transition-all duration-500 hover:shadow-lg ${isOpen ? 'rounded-b-none' : 'rounded-b-lg'} text-shadow-md`}
                >
                    {
                        (state.label)
                            ? <div className="flex justify-center">
                                <p>{state.label}</p>
                            </div>
                            : <p>{btnName}</p>
                    }
                </button>
                {
                    (state.handle && state.value)
                        ? <button className="absolute left-full ml-1 flex justify-center items-center text-2xl text-gray-300 hover:text-gray-100 transition" onClick={() => setState({ handle: null, value: null, label: null })}><IoCloseCircleSharp /></button>
                        : ''
                }
            </div>
            <div className={`${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'} min-w-max absolute top-full left-0 shadow-lg transition-all duration-500 bg-glass overflow-hidden flex flex-col items-start rounded-b-lg rounded-tr-lg z-20`}>
                {
                    data && data.map((single, index) =>
                        <button
                            onClick={handleClick}
                            data-handle={single.handle}
                            data-value={single.value}
                            className={`w-full text-left text-shadow-md text-sm text-gray-600 hover:text-gray-700 bg-gray-200 bg-opacity-0 hover:bg-opacity-20 transition duration-500 px-4 py-3 border-opacity-50 ${data[index + 1] ? 'border-b border-white' : ''}`}
                        >
                            {single.label}
                        </button>
                    )
                }
            </div>
        </div>
    )
}

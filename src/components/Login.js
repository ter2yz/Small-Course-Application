import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { IoCloseCircleSharp } from 'react-icons/io5'

export default function Login({ handleExit }) {

    const [state, setState] = useState({
        email: '',
        password: '',
    })
    const { login } = useAuth()
    const [status, setStatus] = useState({
        status: '',
        text: '',
        bgClass: '',
        textClass: ''
    })
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setState(prevState => {
            return {
                ...prevState,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleKeyDown = () => {
        if (status.status === 'error') {
            setStatus({
                status: '',
                text: '',
                bgClass: '',
                textClass: ''
            })
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setStatus({ status: 'loading', text: 'Loading...', bgClass: 'bg-green-200', textClass: 'text-green-700' })
        try {
            await login(state.email, state.password)
            setStatus({ status: 'success', text: 'You have successfully login!', bgClass: 'bg-green-200', textClass: 'text-green-700' })
            setTimeout(() => {
                handleExit()
            }, 2000);
        } catch {
            setStatus({ status: 'error', text: 'Failed to sign in.', bgClass: 'bg-red-200', textClass: 'text-red-700' })
        }
        setLoading(false)
    }

    return (
        <div className="w-full h-full flex justify-center items-center">
            <button
                className="absolute top-10 right-10 text-gray-800 text-4xl transition duration-300 hover:text-gray-100"
                onClick={handleExit}
            >
                <IoCloseCircleSharp />
            </button>
            <div className="container">
                <div className="w-full flex flex-col justify-center items-center">
                    <div className="w-10/12 lg:w-1/3 py-10 px-8 flex flex-col items-center border border-gray-300 rounded-lg bg-glass-500">
                        <h2 className="font-poppins text-3xl font-bold py-4 text-gray-800 uppercase">Login</h2>
                        <div className={`w-full ${status.bgClass} rounded-md transition-all overflow-hidden ${status.status ? 'max-h-screen py-2 px-3 my-3' : 'max-h-0 py-0 px-0 my-0'}`}>
                            <p className={`${status.textClass}`}>{status.text}</p>
                        </div>
                        <form
                            className="w-full flex flex-col items-center"
                            onSubmit={handleSubmit}
                        >
                            <div className="w-full mb-4">
                                <label className="w-full text-sm ml-2 text-gray-800 font-light" htmlFor="">Email</label>
                                <input
                                    className="w-full rounded-md border border-gray-200 py-2 px-3 focus:outline-none bg-white bg-opacity-60 focus:bg-opacity-90 transition"
                                    type="email"
                                    name="email"
                                    onChange={handleChange}
                                    onKeyDown={handleKeyDown}
                                    value={state.email}
                                    required />
                            </div>
                            <div className="w-full">
                                <label className="w-full text-sm ml-2 text-gray-800 font-light" htmlFor="">Password</label>
                                <input
                                    className="w-full rounded-md border border-gray-200 py-2 px-3 focus:outline-none bg-white bg-opacity-60 focus:bg-opacity-90 transition"
                                    type="password"
                                    name="password"
                                    onChange={handleChange}
                                    onKeyDown={handleKeyDown}
                                    value={state.password}
                                    required />
                            </div>
                            <button
                                className="w-full mt-4 text-white py-2 rounded-lg bg-gradient-to-br from-blue-400 to-blue-500 shadow-md hover:shadow-lg transition"
                                type="submit"
                                disabled={loading}
                            >
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

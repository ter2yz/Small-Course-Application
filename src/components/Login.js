import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'

export default function Login({ handleExit }) {

    const [state, setState] = useState({
        email: '',
        password: '',
    })
    const { login } = useAuth()
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setState(prevState => {
            return {
                ...prevState,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            setError('')
            setSuccess('')
            setLoading(true)
            await login(state.email, state.password)
            setSuccess('You have successfully login!')
            setTimeout(() => {
                handleExit()
            }, 2000);
        } catch {
            setError('Failed to sign in.')
        }
        setLoading(false)
    }

    return (
        <div className="w-full h-full flex justify-center items-center">
            <button
                className="absolute top-10 right-10 w-10 h-10 bg-black text-white font-bold"
                onClick={handleExit}
            >
                <p>X</p>
            </button>
            <div className="container">
                <div className="w-full flex flex-col justify-center items-center">
                    <div className="w-10/12 lg:w-1/3 py-10 px-8 flex flex-col items-center border border-gray-300 rounded-lg">
                        <h2 className="font-poppins text-3xl font-bold">Login</h2>
                        {error &&
                            <div className="w-full bg-red-200 rounded-md py-2 px-3 my-3">
                                <p className="text-red-700">{error}</p>
                            </div>
                        }
                        {success &&
                            <div className="w-full bg-green-200 rounded-md py-2 px-3 my-3">
                                <p className="text-green-700">{success}</p>
                            </div>
                        }
                        <form
                            className="w-full flex flex-col items-center"
                            onSubmit={handleSubmit}
                        >
                            <div className="w-full">
                                <label className="w-full" htmlFor="">Email</label>
                                <input
                                    className="w-full rounded-md border border-gray-200 py-2 px-3"
                                    type="email"
                                    name="email"
                                    onChange={handleChange}
                                    value={state.email}
                                    required />
                            </div>
                            <div className="w-full">
                                <label className="w-full" htmlFor="">Password</label>
                                <input
                                    className="w-full rounded-md border border-gray-200 py-2 px-3"
                                    type="password"
                                    name="password"
                                    onChange={handleChange}
                                    value={state.password}
                                    required />
                            </div>
                            <button
                                className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg"
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

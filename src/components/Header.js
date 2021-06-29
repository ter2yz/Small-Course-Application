import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useDispatchCart, useCart } from '../contexts/CartContext'
import * as actions from '../config/action-types'

import Logo from '../images/logo.svg'

export default function Header() {
    const { currentUser, logout } = useAuth()
    const lessons = useCart()
    const dispatch = useDispatchCart()
    const [error, setError] = useState('')

    const handleLogout = async () => {
        setError('')
        try {
            await logout()
            dispatch({ type: actions.resetCart })

        } catch {
            setError('Failed to logout.')
        }
    }

    return (
        <div className="w-full flex justify-center items-center">
            <div className="container">
                <div className={`w-full py-6 flex justify-between px-5 md:px-0`}>
                    <div className="flex py-2 items-center">
                        <img className="h-10" src={Logo} alt="" />
                    </div>
                    {error &&
                        <div className="w-full bg-red-200 rounded-md py-2 px-3 my-3">
                            <p className="text-red-700">{error}</p>
                        </div>
                    }
                    <div className="flex py-2 items-center">
                        <button className="text-white ml-6 text-white text-sm transition focus:outline-none">CART</button>
                        <span className="bg-red-600 text-white text-xs w-3 h-3 flex items-center justify-center p-3 rounded-full shadow-lg ml-2"><p>{lessons.length}</p></span>
                        {
                            currentUser &&
                            <button
                                className="bg-gray-800 bg-opacity-20 shadow-lg text-gray-300 text-sm py-2 px-4 ml-4 rounded-lg transition hover:text-white hover:bg-opacity-50"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

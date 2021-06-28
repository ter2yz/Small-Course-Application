import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useCart } from '../contexts/CartContext'

export default function Header() {
    const { currentUser, logout } = useAuth()
    const lessons = useCart()
    const [error, setError] = useState('')

    const handleLogout = async () => {
        setError('')
        try {
            await logout()
        } catch {
            setError('Failed to logout.')
        }
    }

    return (
        <div className="w-full flex justify-center items-center bg-gray-900">
            <div className="container">
                <div className={`w-full py-6 flex justify-${currentUser ? 'between' : 'start'}`}>
                    <div className="flex">
                        <p className="text-white mr-4">HOME</p>
                        <p className="text-white">CART ({lessons.length})</p>
                    </div>
                    {error &&
                        <div className="w-full bg-red-200 rounded-md py-2 px-3 my-3">
                            <p className="text-red-700">{error}</p>
                        </div>
                    }
                    {
                        currentUser &&
                        <button
                            className="bg-blue-600 text-white py-2 px-4 rounded-lg"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    }
                </div>
            </div>
        </div>
    )
}

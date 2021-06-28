import React, { useState, useEffect } from 'react'
import _ from 'lodash'

import { data } from '../data/courses_data'
import Card from '../components/Card'
import Dropdown from '../components/Dropdown'
import { useAuth } from '../contexts/AuthContext'
import Login from '../components/Login'

export default function CoursesPage() {

    const { currentUser } = useAuth()
    const lessons = data[0].lessons
    const [searchTerm, setSearchTerm] = useState('')
    const [currentLessons, setCurrentLessons] = useState(lessons)
    const [filter, setFilter] = useState({
        handle: null,
        order: null
    })
    const [showLogin, setShowLogin] = useState(false)

    useEffect(() => {
        let newLessonsArr = lessons.filter((val) => {
            if (!searchTerm || (val.name.toLowerCase().includes(searchTerm.toLowerCase()) || val.author.toLowerCase().includes(searchTerm.toLowerCase()))) {
                return val
            } else {
                return null
            }
        })
        if (filter.handle && filter.order) {
            setCurrentLessons(_.orderBy(newLessonsArr, [filter.handle], [filter.order]))
        } else {
            setCurrentLessons(newLessonsArr)
        }
    }, [searchTerm, lessons, filter])

    const updateFilter = (data) => {
        const { name, value } = data
        setFilter({
            handle: name,
            order: value
        })
    }

    const addClass = () => {
        if (currentUser) {
            console.log("SUCCESSFULL ADDED", currentUser)
        } else {
            setShowLogin(true)
        }
    }

    const handleLoginSuccess = () => {
        setShowLogin(false)
    }
    const handleExit = () => {
        setShowLogin(false)
    }

    return (
        <div className="w-full flex justify-center items-center">
            <div className="container">
                <div className="w-full flex justify-center py-10">
                    <input
                        className="max-w-full w-80 py-2 px-4 mr-3 rounded-lg border border-gray-200 focus:outline-none focus:border-gray-500 transition"
                        type="text"
                        placeholder="Search..."
                        onChange={e => { setSearchTerm(e.target.value) }}
                    />
                    <Dropdown onChange={updateFilter} />
                </div>
                <div className="w-full flex justify-start flex-wrap">

                    {
                        currentLessons && currentLessons.map((lesson, key) =>
                            <div className="relative w-1/3 py-2 px-5">
                                <Card
                                    className="w-full"
                                    data={lesson}
                                    key={key}
                                />
                                <div className="absolute w-full h-full inset-0 flex py-2 px-5">
                                    <div className="w-full h-full relative">
                                        <button
                                            onClick={addClass}
                                            className="absolute top-0 right-0 w-8 h-8 bg-green-600 flex justify-center items-center text-white font-bold z-20"
                                        >+</button>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
            {
                showLogin &&
                <div className="fixed w-screen h-screen inset-0 backdrop-blur-md z-30">
                    <Login
                        handleSuccess={handleLoginSuccess}
                        handleExit={handleExit}
                    />
                </div>
            }
        </div>
    )
}

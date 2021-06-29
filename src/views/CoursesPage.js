import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import { motion, AnimatePresence } from 'framer-motion'

import { data } from '../data/courses_data'
import Card from '../components/Card'
import Dropdown from '../components/Dropdown'
import Login from '../components/Login'
import { useAuth } from '../contexts/AuthContext'
import { useDispatchCart, useCart } from '../contexts/CartContext'
import * as actions from '../config/action-types'

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

    const dispatch = useDispatchCart()
    const lessonsInCart = useCart()

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

    useEffect(() => {
        if (showLogin) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "auto"
        }
    }, [showLogin])

    const updateFilter = (data) => {
        const { handle, value } = data
        setFilter({
            handle,
            order: value
        })
    }

    const addToCart = (lesson) => {
        if (currentUser) {
            if (!(_.find(lessonsInCart, lesson))) {
                dispatch({ type: actions.addToCart, lesson })
            }
        } else {
            setShowLogin(true)
        }
    }

    const removeFromCart = (lesson) => {
        if (currentUser) {
            const updatedLessons = _.reject(lessonsInCart, lesson)
            dispatch({ type: actions.removeFromCart, updatedLessons })
        } else {
            setShowLogin(true)
        }
    }

    return (
        <div className="w-full flex justify-center items-center pb-20">
            <div className="container">
                <div className="relative w-full flex flex-col sm:flex-row justify-center items-start sm:items-center py-5 sm:py-10 z-40 px-5 sm:px-0">
                    <input
                        className="bg-glass max-w-full w-full sm:w-80 py-2 px-4 mr-3 mb-2 sm:mb-0 rounded-lg focus:outline-none transition duration-500 hover:shadow-lg focus:shadow-lg placeholder-gray-300 text-white"
                        type="text"
                        placeholder="Search..."
                        onChange={e => { setSearchTerm(e.target.value) }}
                    />
                    <Dropdown
                        onChange={updateFilter}
                        btnName={'Filter'}
                        data={[
                            { handle: 'publishDate', value: 'asc', label: 'Publish date: ASC' },
                            { handle: 'publishDate', value: 'desc', label: 'Publish date: DESC' },
                            { handle: 'duration', value: 'asc', label: 'Duration: ASC' },
                            { handle: 'duration', value: 'desc', label: 'Duration: DESC' },
                        ]}
                    />
                </div>
                <div className="relative w-full flex justify-start flex-wrap">

                    <AnimatePresence>
                        {
                            currentLessons && currentLessons.map((lesson, key) =>
                                <motion.div
                                    className="relative group w-full md:w-1/2 lg:w-1/3 py-2 px-5"
                                    key={lesson.name}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <Card
                                        className="relative w-full h-full z-0"
                                        data={lesson}
                                        key={key}
                                    />
                                    <div className="absolute inset-0 flex py-2 px-5 transition duration-500 opacity-0 group-hover:opacity-100 -translate-y-4 group-hover:translate-y-0 transform z-10">
                                        <div className="w-full h-full relative">
                                            {
                                                _.find(lessonsInCart, lesson)
                                                    ? <button
                                                        onClick={() => removeFromCart(lesson)}
                                                        className="absolute top-3 right-2 w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 via-red-400 to-red-500 flex justify-center items-center text-red-100 font-bold z-20 shadow-md transition scale-100 hover:scale-110"
                                                    >-</button>
                                                    : <button
                                                        onClick={() => addToCart(lesson)}
                                                        className="absolute top-3 right-2 w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-blue-400 flex justify-center items-center text-green-100 font-bold z-20 shadow-md transition scale-100 hover:scale-110"
                                                    >+</button>
                                            }

                                        </div>
                                    </div>
                                </motion.div>
                            )
                        }
                    </AnimatePresence>
                </div>
            </div>
            {
                showLogin &&
                <div className="fixed w-screen h-screen inset-0 backdrop-blur-md z-40">
                    <Login
                        handleExit={() => setShowLogin(false)}
                    />
                </div>
            }
        </div>
    )
}

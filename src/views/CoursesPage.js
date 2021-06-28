import React, { useState, useEffect } from 'react'

import { data } from '../data/courses_data'
import Card from '../components/Card'

export default function CoursesPage() {

    const lessons = data[0].lessons
    const [searchTerm, setSearchTerm] = useState('')
    const [currentLessons, setCurrentLessons] = useState(lessons)

    useEffect(() => {
        let newLessonsArr = lessons.filter((val) => {
            if (!searchTerm || (val.name.toLowerCase().includes(searchTerm.toLowerCase()) || val.author.toLowerCase().includes(searchTerm.toLowerCase()))) {
                return val
            } else {
                return null
            }
        })
        setCurrentLessons(newLessonsArr)
    }, [searchTerm, lessons])

    return (
        <div className="w-full flex justify-center items-center">
            <div className="container">
                <div className="w-full flex justify-center py-10">
                    <input
                        className="max-w-full w-80 py-2 px-4 rounded-lg border border-gray-200 focus:outline-none focus:border-gray-500 transition"
                        type="text"
                        placeholder="Search..."
                        onChange={e => { setSearchTerm(e.target.value) }}
                    />
                </div>
                <div className="w-full flex justify-start flex-wrap">

                    {
                        currentLessons && currentLessons.map((lesson, key) =>
                            <Card
                                className="w-1/3 py-2 px-5"
                                data={lesson}
                                key={key}
                            />
                        )
                    }
                </div>
            </div>
        </div>
    )
}

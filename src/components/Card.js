import React from 'react'

export default function Card({ className, data }) {

    const { name, description, author, publishDate, duration, image } = data

    return (
        <div className={className}>
            <div className="w-full h-full bg-glass-500 rounded-lg flex flex-col py-5 px-4 shadow-lg">
                <div className="w-full flex justify-center shadow-lg rounded-xl">
                    <img
                        className="max-w-full h-32 object-contain object-center my-2"
                        src={image}
                        alt=""
                    />
                </div>
                <div className="w-full flex flex-col px-2 mt-5 py-4">
                    <p className="text-xs font-thin">{publishDate}</p>
                    <div className="w-full flex justify-between items-center">
                        <h2 className="text-xl font-bold text-gray-800">{name}</h2>
                        <span className="text-xs font-thin bg-gray-900 bg-opacity-20 shadow-lg text-white rounded-lg px-2 py-0.5 ml-2">{duration}</span>
                    </div>
                    <p className="text-xs font-thin mb-4">{author}</p>
                    <p className="text-gray-500 text-md">{description}</p>
                </div>
            </div>
        </div>
    )
}

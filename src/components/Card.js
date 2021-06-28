import React from 'react'

export default function Card({ className, data }) {

    const { name, description, author, publishDate, duration, image } = data

    return (
        <div className={className}>
            <div className="w-full border border-gray-200 rounded-lg flex flex-col">
                <img
                    className="w-full h-40 object-contain object-center"
                    src={image}
                    alt=""
                />
                <div className="w-full flex flex-col px-2">
                    <h2 className="text-lg font-bold">{name}</h2>
                    <p className="text-sm font-thin">{author}</p>
                    <p className="text-sm font-thin">{publishDate}</p>
                    <p className="my-3">{description}</p>
                    <p className="text-sm font-thin">{duration}</p>
                </div>
            </div>
        </div>
    )
}

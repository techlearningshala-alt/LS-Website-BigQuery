import React from 'react'

const MediaCardSkeleton = () => {
    return (
        <div className="animate-pulse p-4 border rounded-xl bg-white">
            <div className="w-1/2 h-20 bg-gray-200 rounded-lg mb-4"></div>
            <div className="w-full h-4 bg-gray-200 rounded mb-2"></div>
            <div className="w-full h-4 bg-gray-200 rounded mb-2"></div>
        </div>
    )
}

export default MediaCardSkeleton
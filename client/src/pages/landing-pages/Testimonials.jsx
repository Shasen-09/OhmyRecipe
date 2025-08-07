import React, { useState } from 'react'
import { FaCircleUser } from "react-icons/fa6"
import { GrPrevious, GrNext } from "react-icons/gr"

const comments = [
  { user: 'Shiva', text: "'Cause you're a sky, 'cause you're a sky full of stars I'm gonna give you my heart", icon: <FaCircleUser /> },
  { user: 'Bishnu', text: "'Cause you're a sky, 'cause you're a sky full of stars 'Cause you light up the path", icon: <FaCircleUser /> },
  { user: 'Brahma', text: "I don't care, go on and tear me apart I don't care if you do, ooh-ooh, ooh", icon: <FaCircleUser /> },
  { user: 'Krishna', text: "'Cause in a sky, 'cause in a sky full of stars I think I saw you", icon: <FaCircleUser /> },
  { user: 'Durga', text: "'Cause you're a sky, 'cause you're a sky full of stars I wanna die in your arms, oh, oh-oh", icon: <FaCircleUser /> },
  { user: 'Saraswati', text: "'Cause you get lighter the more it gets dark I'm gonna give you my heart, oh", icon: <FaCircleUser /> }
]

const Testimonials = () => {
  const [startIndex, setStartIndex] = useState(0)
  const visibleCount = 3

  const handleNext = () => {
    if (startIndex + visibleCount < comments.length) {
      setStartIndex(startIndex + 1)
    }
  }

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1)
    }
  }

  const visibleComments = comments.slice(startIndex, startIndex + visibleCount)

  return (
    <section className='scroll-m-20' id="testimonials">
      <div className="mb-10 mt-10 w-[95%] mx-auto ">
        <h2 className="text-4xl text-center text-red-500 font-bold mb-8">Community Comments</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          {visibleComments.map((com, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-5 border border-gray-100 hover:shadow-lg transition">
              <div className="flex items-center gap-4 mb-3">
                <div className="text-4xl text-gray-500">{com.icon}</div>
                <div className="font-semibold text-lg text-gray-800">{com.user}</div>
              </div>
              <p className="text-gray-700 text-sm italic border-l-4 border-red-400 pl-4">
                "{com.text}"
              </p>
            </div>
          ))}
        </div>


        <div className="flex justify-center items-center gap-6 py-6 text-2xl text-blue-600">
          <button
            onClick={handlePrev}
            disabled={startIndex === 0}
            className={`hover:opacity-60 ${startIndex === 0 ? 'opacity-20 cursor-not-allowed' : ''}`}
          >
            <GrPrevious />
          </button>

          <button
            onClick={handleNext}
            disabled={startIndex + visibleCount >= comments.length}
            className={`hover:opacity-60 ${startIndex + visibleCount >= comments.length ? 'opacity-20 cursor-not-allowed' : ''}`}
          >
            <GrNext />
          </button>
        </div>


        <div className="flex justify-center gap-2">
          {Array.from({ length: comments.length - visibleCount + 1 }).map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full ${i === startIndex ? 'bg-red-500' : 'bg-gray-300'}`}
            ></div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials

import React, { useState } from 'react'

const Bar = () => {
  const [link, setLink] = useState('#popular');

  const barLinks = [
    { href: '#popular', label: "Popular" },
    { href: '#about', label: "About Us" },
    { href: '#features', label: "Features" },
    { href: '#testimonials', label: "Testimonials" },
  ]

  return (
    <>
      <div className='flex justify-center gap-10 text-sm font-semibold' id='popular'>
        {
          barLinks.map((barLink, index) => (
            <a className={`relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-blue-600 after:transition-all ${link === barLink.href ? "text-blue-600 after:w-full" : "text-gray-600 hover:text-gray-900"}`} onClick={() => setLink(barLink.href)} key={index} href={barLink.href}>{barLink.label}</a>
          ))

        }
      </div>

    </>
  )
}

export default Bar
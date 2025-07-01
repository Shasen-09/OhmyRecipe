import React from 'react'
import image from '../../assets/images/1.png'

const AboutUs = () => {
  return (
    <section id='about' className='w-[95%] mx-auto py-12 scroll-mt-12' >
      <div className='flex flg:flex-row gap-10 items-center'>
        <img src={image} alt="Recipe for cooking" className='rounded-lg  h-[80vh] w-full lg:w-1/2 object-cover ' />
        <div className="lg:w-1/2 ">
          <h2 className="text-4xl font-bold text-red-500 mb-6">About Us</h2>
          <p className="text-gray-700 mb-4">
            At <strong>OhMyRecipe</strong>, we're passionate about helping home cooks create delicious meals without the stress. Whether you’re a beginner or a seasoned chef, our platform offers everything you need to explore new recipes, meal plans, and kitchen tips that work in real life.
          </p>
          <p className="text-gray-600 mb-4">
            Built by a community of food lovers, OhMyRecipe is more than just a recipe site — it’s a place to connect, share, and enjoy the journey of cooking together.
          </p>

          <blockquote className="border-l-4 border-red-400 pl-4 italic text-gray-800">
            “Cooking is not just about ingredients, recipes, and cooking. It's about harnessing imagination, empowerment, and passion.” <br />
            <span className="block mt-2 text-sm text-gray-500">– OhMyRecipe Team</span>
          </blockquote>
        </div>
      </div ></section>
  )
}

export default AboutUs
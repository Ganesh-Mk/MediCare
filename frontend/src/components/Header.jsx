import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
    return (
        <div className='flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10 lg:px-20'>

            {/* --------- Header Left --------- */}
            <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]'>
                <p className='text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight'>
                    Book Doctors <br /> & Get AI Health Assistance
                </p>
                <div className='flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light'>
                    {/* <img className='w-28' src={assets.group_profiles} alt="" /> */}
                    <p>Simply browse through our extensive list of trusted doctors, <br className='hidden sm:block' /> schedule your appointment hassle-free.</p>
                </div>

                {/* Feature Pills */}
                <div className='flex flex-wrap gap-3 mt-2'>
                    <a href='#speciality' className='flex items-center gap-2 bg-white px-6 py-2 rounded-full text-[#595959] text-sm hover:scale-105 transition-all duration-300'>
                        Book appointment <img className='w-3' src={assets.arrow_icon} alt="" />
                    </a>
                    <a href='/assistant' className='flex items-center gap-2 bg-[rgba(255,255,255,0.2)] border border-white/30 px-6 py-2 rounded-full text-white text-sm hover:scale-105 transition-all duration-300'>
                        Medical Assistant <img className='w-3 rotate-90' src={assets.arrow_icon} alt="" />
                    </a>
                </div>
            </div>

            {/* --------- Header Right --------- */}
            <div className='md:w-1/2 relative'>
                <img className='w-full md:absolute bottom-0 h-auto rounded-lg' src={assets.header_img} alt="" />

                {/* Medical Assistant Bot Info */}
                <div className='absolute bottom-8 right-8 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg max-w-[200px] hidden md:block'>
                    <div className='flex items-center gap-2 mb-2'>
                        <div className='w-8 h-8 rounded-full bg-primary flex items-center justify-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" viewBox="0 0 16 16">
                                <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm.5 5a.5.5 0 0 1 0 1h-3a.5.5 0 0 1 0-1h3zm3 3a.5.5 0 0 1 0 1h-6a.5.5 0 0 1 0-1h6z" />
                                <path d="M2 8a6 6 0 1 1 12 0A6 6 0 0 1 2 8z" />
                            </svg>
                        </div>
                        <p className='font-medium text-primary'>Health Assistant</p>
                    </div>
                    <p className='text-xs text-gray-600'>Get instant answers to your health-related questions from our AI medical assistant</p>
                    <a href='/assistant' className='text-xs text-primary font-medium mt-2 flex items-center text-center'>
                        Try now <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16" className="ml-1">
                            <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                        </svg>
                    </a>
                </div>
            </div>

            {/* Mobile Medical Assistant Banner */}
            <div className='w-full bg-white/90 p-4 rounded-lg shadow-sm mt-4 flex items-center justify-between md:hidden mb-5'>
                <div className='flex items-center gap-3'>
                    <div className='w-10 h-10 rounded-full bg-primary flex items-center justify-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" viewBox="0 0 16 16">
                            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm.5 5a.5.5 0 0 1 0 1h-3a.5.5 0 0 1 0-1h3zm3 3a.5.5 0 0 1 0 1h-6a.5.5 0 0 1 0-1h6z" />
                            <path d="M2 8a6 6 0 1 1 12 0A6 6 0 0 1 2 8z" />
                        </svg>
                    </div>
                    <div>
                        <p className='font-medium text-primary'>Medical Assistant Bot</p>
                        <p className='text-xs text-gray-600'>Get instant answers to your health questions</p>
                    </div>
                </div>
                <a href='/assistant' className='bg-primary text-white px-4 py-2 rounded-full text-xs text-center'>Try now</a>
            </div>
        </div>
    )
}

export default Header
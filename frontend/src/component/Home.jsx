import React from 'react'

const Home = () => {
  return (
    <div className='p-20'>
      <div className='flex flex-col gap-4'>
        <h1 className='text-3xl '>Explore Posts</h1>
        <div className='flex gap-2 justify-between'>
            <input type="text" placeholder='Search by keyword...' className='border bg-gray-500 text-amber-50 w-2xl p-2 rounded-md' />
            <input type="text" placeholder='Filter by tags (comma-separated)' className='border bg-gray-500 text-amber-50 w-2xl p-2 rounded-md' />
        </div>
      </div>
    </div>
  )
}

export default Home

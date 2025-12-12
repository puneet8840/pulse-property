import React from 'react'

const Pagination = ({page,pageSize,totalCount,handlePage}) => {

    const totalPages=Math.ceil(totalCount/pageSize)

    const handlePageChange=(newPage)=>{
        handlePage(newPage)
    }
  return (
   <section className="container mx-auto flex justify-center items-center my-8">
      <button 
      onClick={()=>{handlePageChange(page-1)}}
      className="mr-2 px-2 py-1 border border-gray-300 rounded cursor-pointer transform hover:scale-110 hover:bg-blue-500 transition-transform duration-200 ease-out"
      disabled={page===1}>
        Previous
      </button>
      <span className='mx-2'>
        Page {page} of {totalPages}
      </span>
      <button
      onClick={()=>{handlePageChange(page+1)}}
        className='ml-2 px-2 py-1 border border-gray-300 rounded  cursor-pointer transform hover:scale-110 hover:bg-blue-500 transition-transform duration-200 ease-out'
        disabled={page===totalPages}>
        Next
      </button>
    </section>
  )
}

export default Pagination
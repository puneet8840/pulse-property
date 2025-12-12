import React from 'react'
import Image from 'next/image'

const PropertyHeader = ({image}) => {
  return (
    <section className='w-full'>
       <div className="w-full m-auto">
        <div className="grid grid-cols-1 w-full">
          <Image
            src={image}
            alt=""
            className="object-cover mt-2 block h-[300px] w-full "
            height={300}
            width='1800'
            priority={true}
          />
        </div>
      </div>
    </section>
    
    
  )
}

export default PropertyHeader
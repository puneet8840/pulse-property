import React from 'react'
import InfoBox from './InfoBox'

const InfoBoxes = () => {
    const InfoBoxPro1={heading:"For Renters",backgroundColor:'bg-gray-300',buttonInfo:{text:"Browse Properties",link:'/properties',backgroundColor:"bg-black"}}
    const InfoBoxPro2={heading:"For Property Owners",backgroundColor:'bg-gray-300',buttonInfo:{text:"add Property",link:'/properties/add',backgroundColor:"bg-black"}}
  return (
    <section>
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          <InfoBox {...InfoBoxPro1}>
              Find your dream rental property. Bookmark properties and contact
              owners.
          </InfoBox>
          <InfoBox {...InfoBoxPro2}>
               List your properties and reach potential tenants. Rent as an
              airbnb or long term.

          </InfoBox>
          
            
          </div>
        </div>
      
    </section>
  )
}

export default InfoBoxes
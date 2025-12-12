import React from 'react'
import { EmailShareButton,FacebookShareButton,WhatsappShareButton,EmailIcon,WhatsappIcon,FacebookIcon } from 'react-share'

const ShareButton = ({property}) => {
  const shareUrl=`${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property?._id}`
  return (<>
  <h3 className="text-xl font-bold text-center">Share this property:</h3>
  <div className="flex justify-center gap-3">
<EmailShareButton url={shareUrl} subject={property?.name} body={`check out this property `}>
  <EmailIcon size={40} round={true}/>
</EmailShareButton>
<FacebookShareButton url={shareUrl} quote={property?.name} hashtag={`#${property?.type.replace(/\s/g,'')}forRent `}>
  <FacebookIcon size={40} round={true}/>
</FacebookShareButton>
<WhatsappShareButton url={shareUrl} title={property?.name} separator='::'>
  <WhatsappIcon size={40} round={true}/>
</WhatsappShareButton>


    
  </div>
  
  
  
  </>
     
  )
}

export default ShareButton
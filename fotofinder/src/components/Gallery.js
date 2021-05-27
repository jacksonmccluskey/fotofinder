import React, {useState} from "react"
import NoImages from "./NoImages"
import Image from "./Image"

import { Lightbox } from "react-modal-image";

const Gallery = props => {
  const results = props.data
  let images
  let noImages

  const [open, setOpen] = useState(false)
  const [url, setUrl] = useState("")
  const [title, setTitle] = useState("")

  const openModal = (imgUrl, imgTitle) => {
    setOpen(true)
    setUrl(imgUrl)
    setTitle(imgTitle)
  }

  const closeModal = () => {
    setOpen(false)
  }

  if (results.length > 0) { // if there is any data
    images = results.map(image => { // map data in fetched image array
      const farm = image.farm // grab farm
      const server = image.server // grab server
      const id = image.id // grab id
      const secret = image.secret // grab secret
      const title = image.title // grab title
      const url = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_m.jpg`
      return <button 
              onClick={ 
                () => { openModal(url, title) } 
              }
              style={{
                padding: 0,
                border: "none",
                background: "none"
              }}
             >
                <Image 
                  url={ url } // set url
                  key={ id } // set key
                  alt={ title } // set alt
                />
              </button> // return each individual image component
    })
  } else {
    noImages = <NoImages /> // return 'not found' component if no images fetched
  }

  return (
    <div>
      <div>
        <ul>{ images }</ul>
        { noImages }
      </div>
      {open && 
        <Lightbox
            large={ url }
            alt={ title }
            onClose={ closeModal }
        />}
    </div>
  )
}

export default Gallery

import React from "react"
import NoImages from "./NoImages"
import Image from "./Image"

const Gallery = props => {
  const results = props.data
  let images
  let noImages
  if (results.length > 0) {
    images = results.map(image => { // map data in fetched image array
      const farm = image.farm // farm
      const server = image.server // server
      const id = image.id // id
      const secret = image.secret // secret
      const title = image.title // title
      const url = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_m.jpg`
      return <Image url={ url } key={ id } alt={ title } /> // return each individual image component
    })
  } else {
    noImages = <NoImages /> // return 'not found' component if no images fetched
  }
  return (
    <div>
      <ul>{ images }</ul>
      { noImages }
    </div>
  )
}

export default Gallery

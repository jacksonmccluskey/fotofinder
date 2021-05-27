import React, { useContext, useEffect } from "react"
import { PhotoContext } from "../context/PhotoContext"
import Gallery from "./Gallery"
import Loader from "./Loader"

const Container = ({ searchTerm }) => {
  const { images, loading, runSearch } = useContext(PhotoContext);
  useEffect(() => {
    console.log("useEffect: runSearch(searchTerm)")
    // run search on searchTerm
    runSearch(searchTerm)
    // eslint-disable-next-line
  }, [searchTerm]) // dependency: searchTerm

  return (
    <div className="photo-container">
      {loading ? <Loader /> : <Gallery data={images} />}
    </div> // loading true: Loader, loading false: Gallery
  )
}

export default Container

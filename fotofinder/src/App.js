import React from "react"
import PhotoContextProvider from "./context/PhotoContext"
import { HashRouter, Route, Switch, Redirect } from "react-router-dom"
import Header from "./components/Header"
import Item from "./components/Item"
import Search from "./components/Search"
import NotFound from "./components/NotFound"

const App = () => {
  const Words = require('./spelling/Words')

  const checkSpelling = (searchInput) => {
    return Words.fetchWords(searchInput)
  }

  const handleSubmit = (e, history, searchInput) => {
    e.preventDefault()
    e.currentTarget.reset()
    let url = `/search/${searchInput}`
    history.push(url)
  }

  return (
    <PhotoContextProvider>
      <HashRouter basename="/FotoFinder">
        <div className="container">
          <Route
            render={props => (
              <Header
                handleSubmit={ handleSubmit }
                history={ props.history }
              />
            )}
          />
          <Switch>
            <Route
              exact
              path="/"
              render={ () => <Redirect to="/react" /> }
            />
            <Route
              path="/react"
              render={ () => <Item searchTerm="react" /> }
            />
            <Route
              path="/search/:searchInput"
              render={props => (
                <Search searchTerm={ props.match.params.searchInput } />
              )}
            />
            <Route component={ NotFound } />
          </Switch>
        </div>
      </HashRouter>
    </PhotoContextProvider>
  )
}

export default App

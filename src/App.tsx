import { useState, useEffect } from 'react';
import { LxProvider, useLexicon } from '@nitidbit/lexicon'
import './App.css'

import ostrich from './assets/noun-ostrich-2511897.svg'
import app_json from './App.json'

function App() {
  const [admin, setAdmin] = useState(false)

  useEffect(() => {
    if (searchParams.get('logout') === 'true' && admin === true) {
      setAdmin(false)
      sessionStorage.removeItem("lexiconServerToken")
    }
    if (sessionStorage.lexiconServerToken === 'test' && admin === false) {
      setAdmin(true)
    }
  }, [admin])
  const lexicon = useLexicon(app_json)
  const searchParams = new URLSearchParams(window.location.search);
  return (
    <div className="App">
      <LxProvider apiUpdateUrl="http://example.com/update">
        <div>
          <a href="https://thenounproject.com/creator/joerivera2000/">
            <img className="logo" src={ostrich} />
          </a>
        </div>
        <h1> { lexicon.get('title') } </h1>
        <p> { lexicon.get('blurb', {product_name: lexicon.get('product_name')} ) } </p>
        <p>{
            admin ?
              <a href="/?logout=true">view as non-administrator</a>
                :
              <a href="/?lexiconServerToken=test">demo as administrator</a>
            } 
        </p>

      </LxProvider>
    </div>
  )
}

export default App

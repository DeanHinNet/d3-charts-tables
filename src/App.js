import React from 'react'
import Header from './components/Header.jsx'
import Main from './components/Main.jsx'
import Footer from './components/Footer.jsx'

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {}
  }
 
  render() {
    return(
        <div className='container'>
          <Header />
          <Main />
          <Footer />
        </div>
    )
  }
}

export default App
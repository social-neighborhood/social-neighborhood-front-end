import React, { Component } from 'react';
import './home.css';

import Navigbar from '../../Components/Navigbar-landing';
import HomeSection from '../../Components/HomeSection';
import Footer from '../../Components/Footer';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = { }
    }
    render() {
        document.body.classList.add('home');
        return (
          <div >
              <Navigbar/>
              <HomeSection/>
              <Footer/>
              <a id="upbutton"  href="/#"> <i className="fa fa-arrow-circle-up"></i></a>

          </div>
        )
    }
}



export default Home;
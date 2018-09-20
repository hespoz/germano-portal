import React, { Component } from 'react';
import './App.scss';
import {Form, Dropdown, Header, Button} from 'semantic-ui-react'
import Layout from "./components/Layout";
import Search from "./components/search/Search";
import SetUp from "./components/setUp/SetUp";

class App extends Component {

  render() {
    return (

        <Layout>

            <div className={'row justify-content-md-center justify-content-lg-center justify-content-sm-center'}>
                <div className={'col-md-6'}>
                    <Search/>
                </div>
            </div>


            <div id="practiceContainer" className={'row justify-content-md-center justify-content-lg-center justify-content-sm-center'}>
                <div className={'col-md-6'}>

                    <div className={'row'}>
                        <div className={'col-12 col-sm-12 col-md-5 col-lg-6 col-xl-10'}>

                            <div className={'row'}>
                                <div className={'col-xl-12 text-center'}>
                                    <Header>Or practice vocabulary</Header>
                                </div>
                            </div>


                            <SetUp/>



                        </div>
                    </div>


                </div>
            </div>


            <style jsx>{`


                  #practiceContainer {
                    margin-top: 20px;

                  }

                `}</style>


        </Layout>
    );
  }
}

export default App;

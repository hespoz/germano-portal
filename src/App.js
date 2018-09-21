import React, { Component } from 'react';
import './App.scss';
import {Form, Dropdown, Header, Button} from 'semantic-ui-react'
import Layout from "./components/Layout";
import Search from "./components/search/Search";
import SetUp from "./components/setUp/SetUp";
import Vocabulary from "./components/practice/Vocabulary";


class App extends Component {

  render() {
    return (

        <Layout>

            <div className={'row justify-content-md-center justify-content-lg-center justify-content-sm-center'}>
                <div className={'col-md-6'}>
                    <Search/>
                </div>
            </div>


            <div className={'row justify-content-md-center justify-content-lg-center justify-content-sm-center content-pos'}>
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

            <div className={'row justify-content-md-center justify-content-lg-center justify-content-sm-center content-pos'}>
                <div className={'col-md-7'}>
                    <Vocabulary/>


                </div>
            </div>


            <style jsx>{`


                  .content-pos {
                    margin-top: 20px;

                  }

                `}</style>


        </Layout>
    );
  }
}

export default App;

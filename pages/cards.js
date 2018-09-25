import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import Layout from '../components/Layout';


class Cards extends Component {
    static async getInitialProps({query}) {

        console.log("It is executed anytime the page is loaded or redirected", query)


        return query;
    }

    render() {
        return (
            <div>
                <Layout>
                    Cards
                </Layout>
            </div>
        )
    }

}


export default Cards;
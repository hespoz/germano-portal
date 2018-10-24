import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import {Form, Button, Divider, Message} from 'semantic-ui-react'
import Layout from '../components/Layout';
import ResetPasswordForm from "../components/auth/ResetPasswordForm"

class ResetPassword extends Component {
    static async getInitialProps({query}) {
        return query;
    }

    render() {
        return (
            <div>
                <Layout>


                    <div
                        className={'row justify-content-md-center justify-content-lg-center justify-content-sm-center'}>
                        <div className={'col-12 col-md-5'}> {/*col-12 col-sm-12 col-md-5 col-lg-6 col-xl-12*/}


                            <ResetPasswordForm recoveryToken={this.props.token}/>


                        </div>
                    </div>


                </Layout>
            </div>
        )
    }

}


export default ResetPassword;
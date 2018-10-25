import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import Layout from '../components/Layout';
import {Message} from 'semantic-ui-react';

import {
    saveUserInfoConfirm
} from "../actions/userAction"

class InfoUpdate extends Component {

    static async getInitialProps({store, isServer, query}) {

        console.log(query)
        await store.execSagaTasks(isServer, dispatch => {
            dispatch(saveUserInfoConfirm(query.token));
        })

        return {
            updateUserInfoConfirm:store.getState().user.updateUserInfoConfirm,
            updateUserInfoConfirmError:store.getState().user.updateUserInfoConfirmError
        }

    }

    render() {

        const {updateUserInfoConfirm, updateUserInfoConfirmError} = this.props

        return (
            <Layout>

                {updateUserInfoConfirm ?
                    <Message info>
                        <p>Tu email fue actualizado</p>
                    </Message>
:
                    null

                }

                {updateUserInfoConfirmError ?
                    <Message error>
                        <p>{updateUserInfoConfirmError}</p>
                    </Message>
                    :
                    null

                }


            </Layout>
        )
    }

}


const mapStateToProps = (state) => ({
    updateUserInfoConfirm:state.user.updateUserInfoConfirm,
    updateUserInfoConfirmError:state.user.updateUserInfoConfirmError
});

const mapDispatchToProps = (dispatch) => bindActionCreators({saveUserInfoConfirm}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(InfoUpdate);

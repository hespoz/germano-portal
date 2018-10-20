import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import {confirmUser} from "../actions/authAction"
import {Message} from 'semantic-ui-react';
import Layout from '../components/Layout';


class Confirmation extends Component {
    static async getInitialProps({store, isServer, query}) {

        await store.execSagaTasks(isServer, dispatch => {
            dispatch(confirmUser(query.token));
        })

        return {
            verified: store.getState().auth.verified,
            confirmUserError: store.getState().auth.confirmUserError
        }

        return query;
    }

    render() {

        const {verified, confirmUserError} = this.props

        return (
            <div>
                <Layout>



                    {verified && !confirmUserError ?

                        <Message info>
                            <Message.Header>Verificacion exitosa</Message.Header>
                            <p>Ya puedes seguir usando la aplicacion</p>
                        </Message>

                        :

                        <Message error>
                            <Message.Header>Verificacion fallida</Message.Header>
                            <p>{confirmUserError.message}</p>
                        </Message>

                    }


                </Layout>
            </div>
        )
    }

}


const mapStateToProps = (state) => ({
    verified:state.auth.verified,
    confirmUserError: state.auth.confirmUserError
});

const mapDispatchToProps = (dispatch) => bindActionCreators({confirmUser}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Confirmation);

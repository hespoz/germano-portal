import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import { Header, Menu } from 'semantic-ui-react'
import AuthModal from './auth/AuthModal'
import {openAuthModal, closeAuthModal, logOut} from "../actions/authAction";

class Layout extends Component {

    state = {
        logged: null
    }


    render() {

        const { openModal, hasToken } = this.props;

        return (
            <div className={'container'}>

                <AuthModal open={openModal} onClose={() => this.props.closeAuthModal()}/>

                <div className={'row'}>
                    <div className={'col-md-12 col-lg-12'}>
                        <Menu fluid pointing secondary>

                            <Menu.Menu position='left'>

                                <Menu.Item>
                                    <Header as='h3'>Germano</Header>
                                </Menu.Item>

                            </Menu.Menu>

                            <Menu.Menu position='right'>

                                {hasToken ?
                                    <Menu.Item onClick={()=>{
                                        this.props.logOut()
                                    }}>
                                        Log out
                                    </Menu.Item>
                                    :
                                    <Menu.Item onClick={()=>{
                                        this.props.openAuthModal()
                                    }}>
                                        Sign In
                                    </Menu.Item>
                                }

                            </Menu.Menu>
                        </Menu>
                    </div>
                </div>

                <div className={'row '}>
                    <div className={'col-12 content-page'}>
                        {this.props.children}
                    </div>
                </div>

                <style jsx>{`

                  .content-page {
                    padding-top:8px;
                  }


                `}</style>

            </div>
        )
    }

}

const mapStateToProps = (state) => ({
    openModal: state.auth.openModal,
    hasToken: state.auth.hasToken
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    openAuthModal, closeAuthModal, logOut
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(Layout);

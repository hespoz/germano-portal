import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import { Header, Menu } from 'semantic-ui-react'
import Link from 'next/link';
import AuthModal from './auth/AuthModal'
import NewWordModal from "./add_word/WordModal";
import {openAuthModal, closeAuthModal, logOut, getToken} from "../actions/authAction";
import {closeWordFormModal} from "../actions/dictionaryAction";

class Layout extends Component {

    state = {
        logged: null
    }

    componentDidMount = () => {
        this.props.getToken()
    }

    closeDialog = () => this.props.closeWordFormModal()

    render() {

        const { openModal, hasToken, wordFormModalOpen } = this.props;

        return (
            <div className={'container'}>

                <AuthModal open={openModal} onClose={() => this.props.closeAuthModal()}/>
                <NewWordModal open={wordFormModalOpen} onClose={this.closeDialog}/>

                <div className={'row'}>
                    <div className={'col-md-12 col-lg-12'}>
                        <Menu fluid pointing secondary>

                            <Menu.Menu position='left'>

                                <Menu.Item>
                                    <Header as='h3'>Germano</Header>
                                </Menu.Item>

                            </Menu.Menu>

                            <Menu.Menu position='right'>

                                <Link as={'/'} href={`/`}>
                                    <Menu.Item>
                                        Inicio
                                    </Menu.Item>
                                </Link>

                                <Menu.Item>
                                    My Stats
                                </Menu.Item>

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
    hasToken: state.auth.hasToken,
    wordFormModalOpen: state.dictionary.wordFormModalOpen
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    openAuthModal, closeAuthModal, logOut, closeWordFormModal,getToken
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(Layout);

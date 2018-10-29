import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import Layout from '../components/Layout';
import { Accordion, Icon } from 'semantic-ui-react'
import UserInfoForm from "../components/profile/UserInfoForm"
import ChangePasswordForm from "../components/profile/ChangePasswordForm"
import {fetchUserInfo, saveUserInfo, toggleConfirmationModal} from  "../actions/userAction"
import {get} from "lodash"
import Cookies from "js-cookie"

class Profile extends Component {

    state = {
        activeIndex: 0,
        paramsFunc:{},
        confirmFunc:null,
        passwordAsParameter:false
    }

    componentDidMount = () => {
        if (!Cookies.get("token")) {
            window.location = "/"
        }
    }

    handleClick = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index

        this.setState({ activeIndex: newIndex })
    }

    onSaveUserInfo = (values) => {
        if (this.props.operationAllowed) {
            this.props.saveUserInfo(values)
        } else {
            this.openConfirmDialog(this.props.saveUserInfo, values, false)
        }
    }

    onPasswordChange = (values) => {
        this.openConfirmDialog(this.props.changePassword, values, true)
    }

    openConfirmDialog = (func, values, passwordAsParameter) => {
        this.props.toggleConfirmationModal(true)
        this.setState({
            paramsFunc:values,
            confirmFunc: func,
            passwordAsParameter
        })
    }

    render() {

        const { activeIndex } = this.state
        const { userInfo, confirmationModal } = this.props


        return (
            <div>
                <Layout>

                    <div
                        className={'row justify-content-md-center justify-content-lg-center justify-content-sm-center'}>
                        <div className={'col-12 col-md-5'}>


                            <Accordion styled>
                                <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
                                    <Icon name='dropdown' />
                                    Email y nombre de usuario
                                </Accordion.Title>
                                <Accordion.Content active={activeIndex === 0}>
                                    {get(userInfo, 'user') ?
                                        <UserInfoForm email={userInfo.user.email} username={userInfo.user.username} notifications={userInfo.user.notifications} onSaveUserInfo={this.onSaveUserInfo}/>
                                        :
                                        null
                                    }
                                </Accordion.Content>

                                <Accordion.Title active={activeIndex === 1} index={1} onClick={this.handleClick}>
                                    <Icon name='dropdown' />
                                    Password
                                </Accordion.Title>
                                <Accordion.Content active={activeIndex === 1}>
                                    {get(userInfo, 'user') ?
                                        <ChangePasswordForm/>
                                        :
                                        null
                                    }
                                </Accordion.Content>


                                <Accordion.Title active={activeIndex === 4} index={4} onClick={this.handleClick}>
                                    <Icon name='dropdown' />
                                    Cerrar cuenta
                                </Accordion.Title>
                                <Accordion.Content active={activeIndex === 4}>
                                    <p>
                                        Three common ways for a prospective owner to acquire a dog is from pet shops, private
                                        owners, or shelters.
                                    </p>
                                    <p>
                                        A pet shop may be the most convenient way to buy a dog. Buying a dog from a private
                                        owner allows you to assess the pedigree and upbringing of your dog before choosing to
                                        take it home. Lastly, finding your dog from a shelter, helps give a good home to a dog
                                        who may not find one so readily.
                                    </p>
                                </Accordion.Content>

                            </Accordion>

                        </div>
                    </div>

                </Layout>
            </div>
        )
    }

}


const mapStateToProps = (state) => ({
    operationAllowed: state.user.operationAllowed,
    userInfo: state.user.userInfo,
    confirmationModal: state.user.confirmationModal
});

const mapDispatchToProps = (dispatch) => bindActionCreators({fetchUserInfo, saveUserInfo, toggleConfirmationModal}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(Profile);

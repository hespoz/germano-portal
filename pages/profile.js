import React, {Component} from "react";
import Layout from '../components/Layout';
import ProfileItem from "../components/profile/ProfileItem";
import {List} from "semantic-ui-react"
import ResetPasswordForm from "../components/profile/ResetPasswordForm"
import ProfileForm from "../components/profile/ProfileForm"


const FormEmail = ({toggle}) => (<div><h1>asdf</h1><a href={"javascript:void(0)"} onClick={toggle}>Cerrar</a></div>)

class Profile extends Component {
    static async getInitialProps({query}) {

        console.log("It is executed anytime the page is loaded or redirected", query)


        return query;
    }

    render() {
        return (
            <div>
                <Layout>

                    <div
                        className={'row justify-content-md-center justify-content-lg-center justify-content-sm-center'}>
                        <div className={'col-12 col-md-5'}>


                            <List>
                                <List.Item>
                                    <ProfileItem title={"Email y nombre de usuario"}
                                                 description={"Description"}><ProfileForm/></ProfileItem>
                                </List.Item>
                                <List.Item>
                                    <ProfileItem title={"Password"}><ResetPasswordForm/></ProfileItem>
                                </List.Item>
                                <List.Item>
                                    <ProfileItem title={"Tarjeta de credito"}
                                                 description={"Description"}><FormEmail/></ProfileItem>
                                </List.Item>
                                <List.Item>
                                    <ProfileItem title={"Cerrar cuenta"}><FormEmail/></ProfileItem>
                                </List.Item>
                            </List>


                        </div>
                    </div>

                </Layout>
            </div>
        )
    }

}


export default Profile;

import React, {Component} from "react";
import Layout from '../components/Layout';
import ProfileItem from "../components/profile/ProfileItem";

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

                    <div className={'row justify-content-md-center justify-content-lg-center justify-content-sm-center'}>
                        <div className={'col-12 col-md-5'}>


                            <ProfileItem title={"Nombre de usuario"}><FormEmail/></ProfileItem>


                        </div>
                    </div>

                </Layout>
            </div>
        )
    }

}


export default Profile;
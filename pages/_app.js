import React from "react"
import {Provider} from "react-redux"
import App, {Container} from "next/app"
import withRedux from "next-redux-wrapper"
import i18n from "../i18n"
import { I18nextProvider } from "react-i18next"
import makeStore from '../store'

class MyApp extends App {

    static async getInitialProps({Component, ctx}) {
        const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
        return {pageProps};
    }

    render() {
        const {Component, pageProps, store} = this.props;
        return (
            <Container>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <link
                    rel="stylesheet"
                    href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.3/semantic.min.css"
                />
                <link
                    rel="stylesheet"
                    href="/static/css/bootstrap.css"
                />
                <link
                    rel="stylesheet"
                    href="/static/css/global.css"
                />

                <I18nextProvider i18n={i18n}>
                    <Provider store={store}>
                        <Component {...pageProps} />
                    </Provider>
                </I18nextProvider>

            </Container>
        );
    }

}

export default withRedux(makeStore)(MyApp);

import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import Link from 'next/link';
import {Grid, List, Card} from 'semantic-ui-react'

import WordAdded from "./WordAdded";
import ScrollContainer from "./ScrollContainer";


class NewCard extends Component {

    render() {

        return (

            <Grid>

                <Grid.Row>
                    <Grid.Column width={11}>
                        Sentences
                    </Grid.Column>
                    <Grid.Column width={5}>
                        <ScrollContainer size={'60%'}>
                            <List>
                                <List.Item>
                                    <WordAdded
                                        article='der'
                                        word='BaumBaumBaumBaumBaumBaumBaumBaumBaum'
                                    />
                                </List.Item>
                                <List.Item>
                                    <List.Content>
                                        <WordAdded
                                            article='der'
                                            word='Wald'
                                        />
                                    </List.Content>
                                </List.Item>
                                <List.Item>
                                    <List.Content>
                                        <WordAdded
                                            article='der'
                                            word='Teich'
                                        />
                                    </List.Content>
                                </List.Item>
                                <List.Item>
                                    <WordAdded
                                        article='der'
                                        word='BaumBaumBaumBaumBaumBaumBaumBaumBaum'
                                    />
                                </List.Item>
                                <List.Item>
                                    <WordAdded
                                        article='der'
                                        word='BaumBaumBaumBaumBaumBaumBaumBaumBaum'
                                    />
                                </List.Item>
                                <List.Item>
                                    <List.Content>
                                        <WordAdded
                                            article='der'
                                            word='Wald'
                                        />
                                    </List.Content>
                                </List.Item>
                                <List.Item>
                                    <List.Content>
                                        <WordAdded
                                            article='der'
                                            word='Teich'
                                        />
                                    </List.Content>
                                </List.Item>
                                <List.Item>
                                    <List.Content>
                                        <WordAdded
                                            article='der'
                                            word='Wald'
                                        />
                                    </List.Content>
                                </List.Item>
                                <List.Item>
                                    <List.Content>
                                        <WordAdded
                                            article='der'
                                            word='Teich'
                                        />
                                    </List.Content>
                                </List.Item>
                                <List.Item>
                                    <List.Content>
                                        <WordAdded
                                            article='der'
                                            word='Wald'
                                        />
                                    </List.Content>
                                </List.Item>
                                <List.Item>
                                    <List.Content>
                                        <WordAdded
                                            article='der'
                                            word='Teich'
                                        />
                                    </List.Content>
                                </List.Item>
                                <List.Item>
                                    <List.Content>
                                        <WordAdded
                                            article='der'
                                            word='Wald'
                                        />
                                    </List.Content>
                                </List.Item>
                                <List.Item>
                                    <List.Content>
                                        <WordAdded
                                            article='der'
                                            word='Teich'
                                        />
                                    </List.Content>
                                </List.Item>
                                <List.Item>
                                    <List.Content>
                                        <WordAdded
                                            article='der'
                                            word='Amigo'
                                        />
                                    </List.Content>
                                </List.Item>
                                <List.Item>
                                    <List.Content>
                                        <WordAdded
                                            article='der'
                                            word='Amigo'
                                        />
                                    </List.Content>
                                </List.Item>
                                <List.Item>
                                    <List.Content>
                                        <WordAdded
                                            article='der'
                                            word='Amigo'
                                        />
                                    </List.Content>
                                </List.Item>
                                <List.Item>
                                    <List.Content>
                                        <WordAdded
                                            article='der'
                                            word='Amigo'
                                        />
                                    </List.Content>
                                </List.Item>
                                <List.Item>
                                    <List.Content>
                                        <WordAdded
                                            article='der'
                                            word='Amigo'
                                        />
                                    </List.Content>
                                </List.Item>
                            </List>
                        </ScrollContainer>
                    </Grid.Column>
                </Grid.Row>


            </Grid>
        )
    }

}

export default NewCard;
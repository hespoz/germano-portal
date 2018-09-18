import React, {Component} from "react";
import {Button} from 'semantic-ui-react'

const ScrollContainer = (props) => (
    <div>

        {props.children}

        <style jsx>{`

                  div {
                    height:${props.size};
                    overflow-y: ${props.size !== '100%' ? 'scroll' : 'none' };
                  }

         `}</style>

    </div>
)


export default ScrollContainer;
import {Message} from "semantic-ui-react";
import React from "react";

const OwnerMessage = (userName, openBucketModal) => (
    <Message>
        <Message.Header>Bienvenido a tus notas, {userName}!</Message.Header>
        <p>
            Aca puedes crear, editar y eliminar tus notas en aleman. Aun no tienes creada ninguna nota, pero puedes hacerlo haciendo click en el siguiente link
            <a href="javascript:void(0)" onClick={() => openBucketModal(null)}> crear nota</a> o usando el el boton de arriba que dice "Nueva nota"
        </p>
    </Message>
)

const VisitorMessage = (urlUserName) => (
    <Message>
        <Message.Header>Bienvenido a las notas de {urlUserName}!</Message.Header>
        <p>
            {urlUserName} Aun no tiene creado ninguna nota
        </p>
    </Message>
)


const EmptyNotes = (props) => ( <div className={'row justify-content-md-center justify-content-lg-center justify-content-sm-center content-pos'}>
    <div className={'col-md-7'}>
        {props.canWrite ?
            OwnerMessage(props.userName, props.openBucketModal)
            :
            VisitorMessage(props.urlUserName)
        }
    </div>
</div>)

export default EmptyNotes

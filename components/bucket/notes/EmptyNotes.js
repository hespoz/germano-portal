import {Message} from "semantic-ui-react";
import React from "react";
import {translate} from "react-i18next";

const OwnerMessage = (userName, openBucketModal, t) => (
    <Message>
        <Message.Header>Bienvenido a tus notas, {userName}!</Message.Header>
        <p>
            {t("empty.notes.owner.message.first")}
            <a href="javascript:void(0)"
               onClick={() => openBucketModal(null)}> {t("create.note")} </a> {t("empty.notes.owner.message.second")}
        </p>
    </Message>
)

const VisitorMessage = (urlUserName, t) => (
    <Message>
        <Message.Header>{t("welcome.to.other.notes")} {urlUserName}!</Message.Header>
        <p>
            {urlUserName} {t("empty.notes.other.message")}
        </p>
    </Message>
)

const EmptyNotes = translate("translations")((props) => {
    return <div
        className={'row justify-content-md-center justify-content-lg-center justify-content-sm-center content-pos'}>
        <div className={'col-md-7'}>
            {props.canWrite ?
                OwnerMessage(props.userName, props.openBucketModal, props.t)
                :
                VisitorMessage(props.urlUserName, props.t)
            }
        </div>
    </div>
})

export default EmptyNotes

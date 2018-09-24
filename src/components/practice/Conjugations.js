import React, { Component } from 'react'
import { Card, Form, Button, Accordion, Icon } from 'semantic-ui-react'
import {includes} from "lodash";

class Conjugations extends Component {

    state = {
        validated: false,
        ich:'',
        ich_error:false,
        du:'',
        du_error:false,
        erSieEs:'',
        erSieEs_error:false,
        ihr:'',
        ihr_error:false,
        wir:'',
        wir_error:false,
        Sie:'',
        Sie_error:false,
    }

    componentWillReceiveProps = (props) => {
        if(!this.state.validated && props.triggerValidationVerb) {
            this.setState({validated: true}, this.onCheck())
        }
    }

    calculatePoints = (validIch,validDu,validErSieEs,validIhr,validWir,validSie) => {
        let points = 0
        if(validIch) points++
        if(validDu) points++
        if(validErSieEs) points++
        if(validIhr) points++
        if(validWir) points++
        if(validSie) points++
        return points
    }


    handleChangeText = (e, {name, value}) => this.setState({
        [name] : value
    })

    onCheck = () => {
        const { ich, du, erSieEs, ihr, wir, Sie } = this.state
        const { conjugations } = this.props
        const validIch = conjugations[0].conjugation === ich
        const validDu = conjugations[1].conjugation === du
        const validErSieEs = conjugations[2].conjugation === erSieEs
        const validIhr = conjugations[3].conjugation === ihr
        const validWir = conjugations[3].conjugation === wir
        const validSie = conjugations[3].conjugation === Sie


        this.setState({
            ich_error: !validIch,
            du_error : !validDu,
            erSieEs_error: !validErSieEs,
            ihr_error: !validIhr,
            wir_error: !validWir,
            Sie_error: !validSie,
            points: this.calculatePoints(validIch, validDu, validErSieEs, validIhr, validWir, validSie)
        }, () => {
            this.props.updatePoints(this.state.points)
        })

    }

    render() {

        const { ich_error, du_error, erSieEs_error, ihr_error, wir_error, Sie_error, ich, du, erSieEs, ihr, wir, Sie } = this.state
        const { triggerValidationVerb, conjugations } = this.props

        return (
            <div>
                <Form.Input name="ich" size='small' fluid label='ich' onChange={this.handleChangeText} error={triggerValidationVerb && ich_error} value={ich}/>
                {triggerValidationVerb ? <p className={"answers"}>{conjugations[0].conjugation}</p> : null}
                <Form.Input name="du" size='small' fluid label='du' onChange={this.handleChangeText} error={triggerValidationVerb && du_error} value={du}/>
                {triggerValidationVerb ? <p className={"answers"}>{conjugations[1].conjugation}</p> : null}
                <Form.Input name="erSieEs" size='small' fluid label='es/sie/es' onChange={this.handleChangeText} error={triggerValidationVerb && erSieEs_error} value={erSieEs}/>
                {triggerValidationVerb ? <p className={"answers"}>{conjugations[2].conjugation}</p> : null}
                <Form.Input name="ihr" size='small' fluid label='ihr' onChange={this.handleChangeText} error={triggerValidationVerb && ihr_error} value={ihr}/>
                {triggerValidationVerb ? <p className={"answers"}>{conjugations[3].conjugation}</p> : null}
                <Form.Input name="wir" size='small' fluid label='wir' onChange={this.handleChangeText} error={triggerValidationVerb && wir_error} value={wir}/>
                {triggerValidationVerb ? <p className={"answers"}>{conjugations[4].conjugation}</p> : null}
                <Form.Input name="Sie" size='small' fluid label='Sie' onChange={this.handleChangeText} error={triggerValidationVerb && Sie_error} value={Sie}/>
                {triggerValidationVerb ? <p className={"answers"}>{conjugations[5].conjugation}</p> : null}
            </div>
        );
    }
}

export default Conjugations;

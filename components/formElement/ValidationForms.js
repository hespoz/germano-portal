import validator from "validator";

export const validateLogin = values => {
    const errors = {}
    if (!values.email || !validator.isEmail(values.email) ) {
        errors.email = 'Required email'
    }
    if (!values.password) {
        errors.password = 'Required password'
    }

    return errors
}


export const validateRegister = values => {
    const errors = {}
    if (!values.email || !validator.isEmail(values.email)) {
        errors.email = 'Required email'
    }
    if (!values.password) {
        errors.password = 'Required password'
    }

    if (!values.repeatPassword) {
        errors.repeatPassword = 'Repeat you password'
    }


    return errors
}

export const validateNoun = values => {
    const errors = {}

    console.log("validateNoun", values)

    if (!values.article || values.article.length === 0) {
        errors.article = 'Select article'
    }

    if (!values.plural) {
        errors.plural = 'Required plural'
    }

    if (!values.esTranslation) {
        errors.esTranslation = 'Required translation'
    }

    if (!values.categories || values.categories.length === 0) {
        errors.categories = 'Select categories'
    }

    return errors
}

export const validateVerb = values => {
    const errors = {}

    if (!values.perfect) {
        errors.perfect = 'Required translation'
    }

    if (!values.present_ich) {
        errors.present_ich = 'Required'
    }

    if (!values.present_du) {
        errors.present_du = 'Required'
    }

    if (!values.present_erSieEs) {
        errors.present_erSieEs = 'Required'
    }

    if (!values.present_ihr) {
        errors.present_ihr = 'Required'
    }

    if (!values.present_wir) {
        errors.present_wir = 'Required'
    }


    if (!values.present_Sie) {
        errors.present_Sie = 'Required'
    }

    if (!values.past_ich) {
        errors.past_ich = 'Required'
    }

    if (!values.past_du) {
        errors.past_du = 'Required'
    }

    if (!values.past_erSieEs) {
        errors.past_erSieEs = 'Required'
    }

    if (!values.past_ihr) {
        errors.past_ihr = 'Required'
    }

    if (!values.past_wir) {
        errors.past_wir = 'Required'
    }

    if (!values.past_Sie) {
        errors.past_Sie = 'Required'
    }


    if (!values.translations) {
        errors.translations = 'Required translation'
    }

    if (!values.categories || values.categories.length === 0) {
        errors.categories = 'Select categories'
    }

    return errors
}


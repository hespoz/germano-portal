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

    if (!values.ich) {
        errors.ich = 'Required'
    }

    if (!values.du) {
        errors.du = 'Required'
    }

    if (!values.erSieEs) {
        errors.erSieEs = 'Required'
    }

    if (!values.ihr) {
        errors.ihr = 'Required'
    }

    if (!values.wir) {
        errors.wir = 'Required'
    }

    if (!values.Sie) {
        errors.Sie = 'Required'
    }

    if (!values.translations) {
        errors.translations = 'Required translation'
    }

    if (!values.categories || values.categories.length === 0) {
        errors.categories = 'Select categories'
    }

    return errors
}


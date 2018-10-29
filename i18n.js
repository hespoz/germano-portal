import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n.use(LanguageDetector).init({
    // we init with resources
    resources: {
        en: {
            translations: {
                "home":"Home",
                "mynotes":"My Notes",
                "logout":"Log Out",
                "login":"Login",
                "welcome":"Welcome",
                "profile":"Profile",
                "email.resend":"Email was sended again, please check your email",
                "verification.alert":"You must verify you account for using the application, we sent you an email, please follow the instructions.",
                "resend":"Resend",
                "email":"Email",
                "password":"Password",
                "forgot.password":"Forgot password?",
                "register":"Register",
                "username":"Username",
                "repeat.password":"Repeat password",
                "repeat.password.error":"Passwords should be the same",
                "go.to.login":"Go to login",
                "recover.password":"Recover password",
                "email.sent.recover.password":"Recovery password magic link was sent to your email",
                "search.title":"Search words in german to add to your notes",
                "search.title.placeholder":"Search...",
                "new.note": "New note",
                "notes.title":"Notes of ",
                "empty.notes.owner.message.first":"Here you can create, edit and remove your notes in german. Yo don't have any note yet, you can do it clicking the following link",
                "empty.notes.owner.message.second":" or clicking the botton above in the menu  \"New note\"",
                "create.note": "Create note",
                "welcome.to.your.notes":"Welcome to your notes, ",
                "welcome.to.other.notes":"Welcome to the notes of ",
                "empty.notes.other.message": "Does not have any note",
                "remove.note.title":"Delete note",
                "delete.note.message":"Are you sure you want a delete this note?",
                "no":"No",
                "yes.delete":"Yes, delete!"
            }
        },
        es: {
            translations: {
                "home":"Inicio",
                "mynotes":"Mis Notas",
                "logout":"Cerrar sesion",
                "login":"Acceder",
                "welcome":"Bienvenido",
                "profile":"Perfil",
                "email.resend":"El email fue enviado de nuevo, por favor revisa tu email",
                "verification.alert":"Tienes que verificar tu cuenta para poder usar la aplicacion, te enviamos un email con las instrucciones.",
                "resend":"Reenviar",
                "email":"Correo electronico",
                "password":"Contraseña",
                "forgot.password":"Olvidaste tu contraseña?",
                "register":"Registrar",
                "username":"Nombre de usuario",
                "repeat.password":"Repetir password",
                "repeat.password.error":"El password tiene que ser igual",
                "go.to.login":"Ir a acceder",
                "recover.password":"Recuperar contraseña",
                "email.sent.recover.password":"Link magico para recuperar tu password fue enviado a tu email",
                "search.title":"Buscar palabras en aleman para añadir a tus notas",
                "search.title.placeholder":"Buscar...",
                "new.note": "Nueva nota",
                "notes.title":"Notas de ",
                "empty.notes.owner.message.first":"Aca puedes crear, editar y eliminar tus notas en aleman. Aun no tienes creada ninguna nota, pero puedes hacerlo haciendo click en el siguiente link",
                "empty.notes.owner.message.second":" o usando el el boton de arriba que dice \"Nueva nota\"",
                "create.note": "Crear nota",
                "welcome.to.your.notes":"Bienvenido a tus notas, ",
                "welcome.to.other.notes":"Bienvenido a las notas de ",
                "empty.notes.other.message": "Aun no tiene creado ninguna nota",
                "remove.note.title":"Borrar nota",
                "delete.note.message":"Esta seguro que desea borrar esta nota?",
                "no":"No",
                "yes.delete":"Si, borrar!"
            }
        }
    },
    fallbackLng: "en",
    debug: true,

    // have a common namespace used around the full app
    ns: ["translations"],
    defaultNS: "translations",

    keySeparator: false, // we use content as keys

    interpolation: {
        escapeValue: false, // not needed for react!!
        formatSeparator: ","
    },

    react: {
        wait: true
    }
});

export default i18n;

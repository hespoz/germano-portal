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
                "search.noresults":"This word does not exist, we keep adding new words",
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
                "yes.delete":"Yes, delete!",
                "pronoun":"Pronoun",
                "conjugation":"Conjugation",
                "language":"Language",
                "translation":"Translation",
                "add.note.name":"Note name",
                "create":"Create",
                "validate.account":"You need to validate your account for add new notes and comments.",
                "remove.sentence":"Remove sentence",
                "remove.sentence.confirm":"Are you sure you want to delete this sentence?",
                "comment.placeholder":"Write your comment",
                "note.reference.words":"Word reference",
                "note.reference.words.empty":"Search words using the search bar and add to this note",
                "empty.sentences":"You don't have sentences added",
                "sentences":"Sentences",
                "new.sentence":"New sentence",
                "cancel":"Cancel",
                "login.or.register":"Login or register",
                "comment":"Comment",
                "sentence.german":"In german",
                "sentence.other.language":"In your language",
                "add":"Add",
                "update":"Update",
                "add.new.sentence":"Add new sentence",
                "update.new.sentence":"Update sentence",
                "comments.title":"Comments",
                "last.notes.created.title":"Last notes created by users",
                "created.at":"Created at ",
                "created.by":"by",
                "your.activity":"Your activity",
                "comment.was.made":"A comment was made to ",
                "you.commented":"You comment the note "
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
                "search.noresults":"Esta palabra no existe, la tomaremos en cuenta, estamos añadiendo nuevas palabras constantemente!",
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
                "yes.delete":"Si, borrar!",
                "pronoun":"Pronombre",
                "conjugation":"Conjugación",
                "language":"Languaje",
                "translation":"Traducción",
                "add.note.name":"Nombre nota",
                "create":"Crear",
                "validate.account":"Necesitas validar tu cuenta para añadir notas y hacer comentarios.",
                "remove.sentence":"Borrar oración",
                "remove.sentence.confirm":"Estas seguro que deseas borrar esta oracion?",
                "comment.placeholder":"Escribe tu comentario",
                "note.reference.words":"Palabras de referencia",
                "note.reference.words.empty":"Busca palabras en el buscador y añadelos a esta tarjeta",
                "empty.sentences":"Aun no tienes oraciones añadidas",
                "sentences":"Oraciones",
                "new.sentence":"Nueva oración",
                "cancel":"Cancelar",
                "login.or.register":"Acceder or registrarse",
                "comment":"Comentar",
                "sentence.german":"En Aleman",
                "sentence.other.language":"En tu idioma",
                "add":"Añadir",
                "update":"Actualizar",
                "add.new.sentence":"Añadir nueva oración",
                "update.new.sentence":"Actualizar oración",
                "comments.title":"Comentarios",
                "last.notes.created.title":"Ultimas notas creadas por los usuarios",
                "created.at":"Creado en ",
                "created.by":"por",
                "your.activity":"Tu actividad",
                "comment.was.made":"Se hizo un comentario en ",
                "you.commented":"Comentaste la nota "
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

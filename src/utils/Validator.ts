function validateName(name: string){
    return name.length >= 3;
}

function isEmail(email: string){
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}

function validPassword(password: string){
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[-!$%^&*@()_+#|ˆ~=`{}\[\]:";'<>?,.\/])[0-9a-zA-Z-!$%^&*@()_+#|ˆ~=`{}\[\]:";'<>?,.\/]{8,}$/.test(password);
}
export default {isEmail, validPassword, validateName}
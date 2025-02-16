const container = document.querySelector('.container');
const LoginLink = document.querySelector('.SignInLink');
const RegisterLink = document.querySelector('.SignUpLink');
let error1 = document.getElementById('regerror');
error1.textContent = "";

// Switch between login and register forms
RegisterLink.addEventListener('click', () => {
    container.classList.add('active');
});

LoginLink.addEventListener('click', () => {
    error1.textContent = "";
    container.classList.remove('active');
});

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyACstYgV53Vs2nWIQnZR-NrOkFHPG3xB3c",
    authDomain: "register-cefcb.firebaseapp.com",
    databaseURL: "https://register-cefcb-default-rtdb.firebaseio.com",
    projectId: "register-cefcb",
    storageBucket: "register-cefcb.firebasestorage.app",
    messagingSenderId: "73609450028",
    appId: "1:73609450028:web:adbb71fdb62b6773dcf789",
    measurementId: "G-B1ZPTR01XF"
};

firebase.initializeApp(firebaseConfig);
var RegisterDB = firebase.database().ref('Register');

// Register form submission
document.getElementById('registerform').addEventListener('submit', SubmitRegForm);

function SubmitRegForm(e) {
    e.preventDefault();
    const username = getEleVal('username1');
    const password = getEleVal('password1');
    let error1 = document.getElementById('regerror');
    error1.textContent = "";

    if (validateCredentials(username, password)) {
        savecredentials(username, password);
        alert("Registered Successfully!");
        error1.textContent = "";
        container.classList.remove('active');
    }
}

// Save user credentials to Firebase
const savecredentials = (username, password) => {
    var newregisterform = RegisterDB.push();
    newregisterform.set({
        username: username,
        password: password,
    });
}

// Get value of an input field
const getEleVal = (id) => {
    return document.getElementById(id).value;
}

// Validate username and password for registration
let validateCredentials = (username, password) => {
    let error1 = document.getElementById('regerror');
    if (username.trim() === "") {
        error1.textContent = "Username cannot be empty.";
        return false;
    }
    if (username.length < 6) {
        error1.textContent = "Username must be at least 6 characters long.";
        return false;
    }
    if (password.length < 6) {
        error1.textContent = "Password must be at least 6 characters long.";
        return false;
    }
    if (!/[A-Z]/.test(password)) {
        error1.textContent = "Password must contain at least one uppercase letter.";
        return false;
    }
    if (!/[0-9]/.test(password)) {
        error1.textContent = "Password must contain at least one numeric digit.";
        return false;
    }
    if (!/[!@#$%^&*]/.test(password)) {
        error1.textContent = "Password must contain at least one special character.";
        return false;
    }
    return true;
}

// Login form submission
document.getElementById('loginform').addEventListener('submit', SubmitLoginForm);

function SubmitLoginForm(e) {
    e.preventDefault();

    
    const enteredUsername = getEleVal('username'); // Username entered by the user
    const enteredPassword = getEleVal('password'); // Password entered by the user

    console.log("Username entered:", enteredUsername);
    console.log("Password entered:", enteredPassword);

    RegisterDB.once('value', (snapshot) => {
        const users = snapshot.val(); // Retrieve all user data
        let userFound = false;

        console.log("Fetched users from database:", users);

        // Iterate through the database users
        for (let key in users) {
            if (users[key].username === enteredUsername) {
                userFound = true;

                // Check if the password matches
                if (users[key].password === enteredPassword) {
                    alert("Login successful!");
                } else {
                    alert("Incorrect password. Please try again.");
                }
                break;
            }
        }

        if (!userFound) {
            alert("Username does not exist. Please register.");
        }
    });
}



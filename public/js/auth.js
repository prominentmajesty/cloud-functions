const authSwitchLinks = document.querySelectorAll('.switch');
const authModals = document.querySelectorAll('.auth .modal');
const authWrapper = document.querySelector('.auth');
const registerForm = document.querySelector('.register');
const loginForm = document.querySelector('.login');
const signOut = document.querySelector('.sign-out');

//toggle auth modale
authSwitchLinks.forEach(link => {
    link.addEventListener('click', () => {
        authModals.forEach(modal => modal.classList.toggle('active'));
    });
});

//Register form
registerForm.addEventListener('submit', (e)=>{
    e.preventDefault();

    const email = registerForm.email.value;
    const password = registerForm.email.value;
    console.log(email, password);

    firebase.auth().createUserWithEmailAndPassword(email, password).then((user)=>{
        console.log('Registered', user);
        registerForm.reset();
    }).catch((e) => {
        //console.log(e);
        registerForm.querySelector('.error').textContent = e.message;
    });
});

//Login form
loginForm.addEventListener('submit', (e)=>{
    e.preventDefault();

    const email = loginForm.email.value;
    const password = loginForm.email.value;
    console.log(email, password);

    firebase.auth().signInWithEmailAndPassword(email, password).then((user)=>{
        console.log('Logged in', user);
        loginForm.reset();
    }).catch((e) => {
        //console.log(e);
        loginForm.querySelector('.error').textContent = e.message;
    });
});

signOut.addEventListener('click', function(){
    firebase.auth().signOut().then(()=>{
        console.log('Logged out');
    });
})

//auth Listener
firebase.auth().onAuthStateChanged((user)=>{
    if(user){
        authWrapper.classList.remove('open');
        authModals.forEach(modal => modal.classList.remove('active'));
    }else{
        authWrapper.classList.add('open');
        authModals[0].classList.add('active');
    }
});


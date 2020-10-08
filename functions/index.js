const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// http request 1
exports.randomNumber = functions.https.onRequest((request, response)=>{
    const number = Math.round(Math.random()*100);
    console.log(number);
    response.send(number.toString());
});

exports.toTheDojo = functions.https.onRequest((request, response)=>{
    const number = Math.round(Math.random()*100);
    response.redirect('https://www.thenetninja.co.uk');
});

//http callable function
exports.sayHello = functions.https.onCall((data, context) => {
    return `Hello, Ninjas`;
});

// auth trigger (new user signup)
exports.newUserSignup = functions.auth.user().onCreate(user => {
    //console.log('user created', user.email, user.uid);
    return admin.firestore().collection('users').doc(user.uid).set({
        email:user.email,
        upvotedOn : []
    });
});

//auth trigger (user deleted)
exports.userDeleted = functions.auth.user().onDelete(user => {
   //console.log('user deleted', user.email, user.uid);
   doc = admin.firestore().collection('users').doc(user.uid);
   return doc.delete();
});

exports.addRequest = functions.https.onCall((data, context) =>{
    if(!context.auth){
        throw new functions.https.HttpsError(
            'unauthenticated',
            'only authenticated users can add requests'
        );
    }
    if(data.text.length > 30){
        throw new functions.https.HttpsError(
            'invalid-argument',
            'request must not be more than 30 character long'
        );
    }
    return admin.firestore().collection('request').add({
        text : data.text,
        upvotes : 0
    });
});
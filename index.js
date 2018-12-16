firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    var user = firebase.auth().currentUser;
    if (user != null) {
    	var email_id = user.email;
    	var email_verified = user.emailVerified;
    	if (email_verified != true) {
         document.getElementById("user-div").style.display = "none";
         document.getElementById("login-div").style.display = "none";
         document.getElementById("registration-div").style.display = "none";
         document.getElementById("send-verification-div").style.display = "block";
         document.getElementById("user_para").innerHTML = "Email : " + email_id;
    	 send_verification();
    	}else{
         
         document.getElementById("user-div").style.display = "block";
         document.getElementById("login-div").style.display = "none";
         document.getElementById("registration-div").style.display = "none";
         document.getElementById("send-verification-div").style.display = "none";
         document.getElementById("user_email_show").innerHTML = "Welcome user : " + email_id;
         /*document.getElementById("user_email_show").innerHTML = "Welcome user : " + email_id +
    	 "</br> Verified : " + email_verified;*/
    	}
    	
    }
  } else {
    // No user is signed in.
    document.getElementById("user-div").style.display ="none";
    document.getElementById("login-div").style.display = "block";
    document.getElementById("registration-div").style.display = "none";
    document.getElementById("send-verification-div").style.display = "none";
  }
});


function login(){
	var userEmail = document.getElementById("email_field").value;
	var userPass = document.getElementById("password_field").value;

	firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
      // Handle Errors here.
     var errorCode = error.code;
     var errorMessage = error.message;
	  // ...
	  window.alert("Error "+ errorMessage);
	});
}
function logout(){
	firebase.auth().signOut();
}

function registration(){
	var user_email = document.getElementById("user_email").value;
	var user_password = document.getElementById("user_password").value;
	var confrom_password = document.getElementById("confrom_password").value;
	if (user_password == confrom_password) {

		firebase.auth().createUserWithEmailAndPassword(user_email, user_password).catch(function(error) {
			  // Handle Errors here.
			  var errorCode = error.code;
			  var errorMessage = error.message;
			  // ...
			  window.alert("Error "+ errorMessage);
			});
		
	var user = firebase.auth().currentUser;

    user.sendEmailVerification().then(function() {
      // Email sent.
      window.alert("Verification url sent.");
     }).catch(function(error) {
      // An error happened.
      window.alert("Error "+ errorMessage);
     });


	}else{
		window.alert("Password and Confrom Password dose not Match");
	}
}

function reg_account(){
  document.getElementById("registration-div").style.display = "block";
  document.getElementById("login-div").style.display = "none";
  document.getElementById("send-verification-div").style.display = "none";
}

function send_verification(){

	var user = firebase.auth().currentUser;

    user.sendEmailVerification().then(function() {
      // Email sent.
      //window.alert("Verification url sent.");
     }).catch(function(error) {
      // An error happened.
      window.alert("Error "+ errorMessage);
     });
}
function myFunction_reload() {
    location.reload();
}

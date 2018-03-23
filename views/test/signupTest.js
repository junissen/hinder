var Nightmare = require("nightmare");
var nightmare = Nightmare({ show: true });

nightmare
  // verify signup link works
  .goto("http://localhost:8080/")
  .click("#signupButton")
  .screenshot("1.signupPage.png")
  .wait(2000)
  // verify can't signup without entry
  .click("#submitSignup")
  .wait(2000)
  .screenshot("2.emptySignupError.png")
  // fill out the form to join an existing group
  .type("#signup_userName", "JoeShmoe")
  .type("#signup_password", "joepassword")
  .type("#signup_profileImage", "google.com")
  .type("#signup_phoneCarrier", "Verizon")
  .type("#signup_phoneNumber", "5555555555")
  .click("#signup_groupChoice")
  .click("#existingGroup-1")
  .screenshot("3.fullFormFilled.png")
  .wait(2000)
  // submit form 
  .click("#signupButton")
  // verify can't signup with empty fields
  // .type("fullName", "")
  // .type("profileImage", "")
  // .type("email", "")
  // .type("phoneCarrier", "")
  // .type("phoneNumber", "")
  // .click("#signupButton")
  // .wait(2000)
  // .screenshot("4.emptyFormError.png")

  .evaluate(function() {
  })
  .end()
  .then(function(result) {
  })
  .catch(function(error) {
  });
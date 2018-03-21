var Nightmare = require("nightmare");
var nightmare = Nightmare({ show: true });

nightmare
  // verify signup page loads
  .goto("http://localhost:8080/signup")
  .screenshot("1.signupPage.png")
  // verify can't signup without entry
  .click("#signupButton")
  .wait(2000)
  .screenshot("2.signupError.png")
  // fill out the form for an existing group
  .type("#fullName", "Joe")
  .type("#profileImage", "google.com")
  .type("#email", "joe@joe.com")
  .type("#phoneCarrier", "Verizon")
  .type("#phoneNumber", "5555555555")
  .wait(2000)
  .screenshot("3.fullFormFilled.png")
  .wait(2000)
  // submit form 
  .click("#signupButton")
  // verify can't signup with empty fields
  .type("fullName", "")
  .type("profileImage", "")
  .type("email", "")
  .type("phoneCarrier", "")
  .type("phoneNumber", "")
  .click("#signupButton")
  .wait(2000)
  .screenshot("4.emptyFormError.png")

  .evaluate(function() {
  })
  .end()
  .then(function(result) {
  })
  .catch(function(error) {
  });
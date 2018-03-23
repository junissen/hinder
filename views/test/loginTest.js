var Nightmare = require("nightmare");
var nightmare = Nightmare({ show: true });

nightmare
  // verify homepage loads
  .goto("http://localhost:8080/")
  .screenshot("1.loginPage.png")
  // verify can't login without entry
  .click("#loginButton")
  .wait(2000)
  .screenshot("2.loginError.png")
  // verify can't login without password
  .type("#login_userName", "pamBeesly")
  .click("#loginButton")
  .wait(2000)
  .screenshot("3.passwordMissing.png")
  // verify can't login without password
  .type("#login_userName", "pamBeesly")
  .type("#login_userPassword", "pam1234")  
  .click("#loginButton")
  .wait(2000)
  .screenshot("4.loginSuccess.png")

  .evaluate(function() {
  })
  .end()
  .then(function(result) {
  })
  .catch(function(error) {
  });
//variables to store user criteria
var minLength = 0;
var maxLength = 0;
var useLowerCase = false;
var useUpperCase = false;
var useNumbers = false;
var useSpecialCharacters = false;

// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

function generatePassword() {
  //get the criteria from the user
  getCriteria();

  //use the criteria to generate the password
  var password = generatePasswordUsingCriteria();

  //return the password to be displayed on the screen
  return password;
}

function getCriteria() {}

function generatePasswordUsingCriteria() {
  return "generated";
}

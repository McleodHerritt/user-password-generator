//variables to store user criteria
var minLength = 8;
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
  var password = "";

  //generate a password of letters that is at least the minimum password length
  for (var i = 0; i < minLength; i++) {
    // in ascii, a is 97 and z is 122
    // so, we want to generate a random number between 97 and 122 to represent the lowercase character to be added to the password
    var minChar = 97;
    var maxChar = 122;

    var nextChar = minChar + Math.round(Math.random() * (maxChar - minChar));

    password += String.fromCharCode(nextChar);
  }

  return password;
}

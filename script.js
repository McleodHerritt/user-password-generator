//variables to store user criteria
var minLength = 8;
var maxLength = 128;
var passwordLength = minLength;
var useLowerCase = true;
var useUpperCase = true;
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

  //generate a password of letters that is the password length
  for (var i = 0; i < passwordLength; i++) {
    // in ascii, a is 97 and z is 122
    // so, we want to generate a random number between 97 and 122 to represent the lowercase character to be added to the password
    var minChar = 97;
    var maxChar = 122;

    var nextChar = minChar + Math.round(Math.random() * (maxChar - minChar));

    password += String.fromCharCode(nextChar);
  }

  //handle user criteria for lower and uppercase, noting that we already have all lower case characters
  if (useLowerCase && useUpperCase) {
    for (var i = 0; i < passwordLength; i++) {
      //randomly change characters to uppercase

      var randomNumber = Math.random() * 100;

      if (randomNumber > 50) {
        var char = password.charAt(i);
        password =
          password.substring(0, i) +
          char.toUpperCase() +
          password.substring(i + 1);
      }
    }

    //make sure we have at least one uppercase letter
    randomNumber = Math.floor(Math.random() * passwordLength);
    var char = password.charAt(randomNumber);
    password =
      password.substring(0, randomNumber) +
      char.toUpperCase() +
      password.substring(randomNumber + 1);
  } else if (useUpperCase) {
    password = password.toUpperCase();
  }

  return password;
}

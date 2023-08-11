//variables to store user criteria
var minLength = 8;
var maxLength = 128;
var passwordLength = 8;
var useLowerCase = false;
var useUpperCase = false;
var useNumbers = true;
var useSpecialCharacters = true;
var probabilityOfInsertion = 20;

// Assignment Code
var generateBtn = document.querySelector("#generate");

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

// this function is called from the writePassword function when the user clicks
// the button to generate the button
function generatePassword() {
  //get the criteria from the user
  getCriteria();

  //use the criteria to generate the password
  var password = generatePasswordUsingCriteria();

  //return the password to be displayed on the screen
  return password;
}

// this function gets user input to determine the password criteria
// TODO
function getCriteria() {}

// this function generates the password given a set of user criteria
function generatePasswordUsingCriteria() {
  // initialize the password of all lowercase letters of length passwordLength
  var password = handlePasswordLengthCriteria(passwordLength);

  //handle user criteria for lower and uppercase, noting that we already have all lower case characters
  password = handleLowerAndUpperCaseCriteria(password);

  //handle numeric
  // password = handleNumericCriteria(password);
  password = handleCriteria(password, useNumbers, changeCharAtIndexToNumber);

  //handle special characters
  // password = handleSpecialCharCriteria(password);
  password = handleCriteria(
    password,
    useSpecialCharacters,
    changeCharAtIndexToSpecialChar
  );

  //validate the password to make sure it handles all of the criteria
  password = validatedPassword(password);

  return password;
}

// ensures the password that is returned meets all of the users criteria
function validatedPassword(password) {
  // validate password length
  if (password.length !== passwordLength)
    return generatePasswordUsingCriteria();

  // validate lowercase
  if (useLowerCase) {
    if (!/[a-z]/.test(password)) return generatePasswordUsingCriteria();
  }

  // validate uppercase
  if (useUpperCase) {
    if (!/[A-Z]/.test(password)) return generatePasswordUsingCriteria();
  }

  if (useNumbers && !/[0-9]/.test(password))
    return generatePasswordUsingCriteria();

  if (
    useSpecialCharacters &&
    !/[!\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/.test(password)
  )
    return generatePasswordUsingCriteria();

  return password;
}

function handleCriteria(password, useCriteria, changeCharFunction) {
  if (!useCriteria) return password;

  for (var i = 0; i < passwordLength; i++) {
    var randomNumber = Math.random() * 100;
    if (randomNumber < probabilityOfInsertion) {
      password = changeCharFunction(password, i);
    }
  }

  // Ensure at least one character meets the criteria
  randomNumber = Math.floor(Math.random() * passwordLength);
  password = changeCharFunction(password, randomNumber);

  return password;
}

// change character at index to special char
function changeCharAtIndexToSpecialChar(stringToModify, index) {
  // list of special characters from https://owasp.org/www-community/password-special-characters but with no space
  var specialChars = "!\"#$%&'()*+,-./:;<=>?@[]^_`{|}~";

  var randomIndex = Math.floor(Math.random() * specialChars.length);
  var specialChar = specialChars.charAt(randomIndex);

  stringToModify =
    stringToModify.substring(0, index) +
    specialChar +
    stringToModify.substring(index + 1);

  return stringToModify;
}

function changeCharAtIndexToNumber(stringToModify, index) {
  var randomNumber = Math.floor(Math.random() * 10);

  stringToModify =
    stringToModify.substring(0, index) +
    randomNumber +
    stringToModify.substring(index + 1);

  return stringToModify;
}

// this function handles the case where the user has selected lowerCase and upperCase criteria
// assumes the password given is all lowercase letters
function handleLowerAndUpperCaseCriteria(password) {
  if (useLowerCase && useUpperCase) {
    for (var i = 0; i < passwordLength; i++) {
      //randomly change characters to uppercase
      var randomNumber = Math.random() * 100;

      if (randomNumber < probabilityOfInsertion) {
        password = changeCharAtIndexToUpperCase(password, i);
      }
    }

    //make sure we have at least one uppercase letter
    randomNumber = Math.floor(Math.random() * passwordLength);
    password = changeCharAtIndexToUpperCase(password, randomNumber);
  } else if (useUpperCase) {
    password = password.toUpperCase();
  } else if (useLowerCase) {
    return password;
  }

  // not using lowercase or upper case
  return password;
}

// generates a password of lower case letters of length passwordLength
function handlePasswordLengthCriteria(length) {
  var password = "";

  // start with a password of all lowercase letters
  for (var i = 0; i < length; i++) {
    // in ascii, a is 97 and z is 122
    // so, we want to generate a random number between 97 and 122 to represent the lowercase character to be added to the password
    var minChar = 97;
    var maxChar = 122;

    // get a value between 97 and 122 which represents the next character to add to the password
    var nextChar = minChar + Math.round(Math.random() * (maxChar - minChar));

    // adds the character to the password by converting the number to the corresponding char using the fromCharCode built in function
    password += String.fromCharCode(nextChar);
  }

  if (useLowerCase) return password;

  // if use uppercase then, change it all to uppercase
  if (useUpperCase) return password.toUpperCase();

  // we are not using lowercase or uppercase, so see if we can start with all special characters
  if (useSpecialCharacters) {
    for (var i = 0; i < passwordLength; i++) {
      password = changeCharAtIndexToSpecialChar(password, i);
    }
    return password;
  }

  if (useNumbers) {
    for (var i = 0; i < passwordLength; i++) {
      password = changeCharAtIndexToNumber(password, i);
    }
    return password;
  }

  return password;
}

function changeCharAtIndexToUpperCase(stringToModify, index) {
  var char = stringToModify.charAt(index);
  stringToModify =
    stringToModify.substring(0, index) +
    char.toUpperCase() +
    stringToModify.substring(index + 1);

  return stringToModify;
}

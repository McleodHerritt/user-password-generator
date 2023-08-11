//variables to store user criteria
var minLength = 8;
var maxLength = 128;
var passwordLength = 8;
var useLowerCase = true;
var useUpperCase = true;
var useNumbers = true;
var useSpecialCharacters = true;
var probabilityOfInsertion = 20;

// Assignment Code
var generateBtn = document.querySelector("#generate");

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");
  passwordText.value = password;
}

function getCharacterSet() {
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const specialChars = "!\"#$%&'()*+,-./:;<=>?@[]^_`{|}~";

  let charset = "";
  if (useLowerCase) charset += lowercaseChars;
  if (useUpperCase) charset += uppercaseChars;
  if (useNumbers) charset += numbers;
  if (useSpecialCharacters) charset += specialChars;

  return charset;
}

function getRandomCharFromSet(charset) {
  return charset[Math.floor(Math.random() * charset.length)];
}

function generatePassword() {
  //get the criteria from the user
  getCriteria();

  let password = "";
  const charset = getCharacterSet();

  // password generation for charset
  for (let i = 0; i < passwordLength; i++) {
    password += getRandomCharFromSet(charset);
  }

  // Validation ensures password matches user criteria
  password = validatePassword(password);

  return password;
}

function validatePassword(password) {
  if (password.length !== passwordLength) return generatePassword();
  if (useLowerCase && !/[a-z]/.test(password)) return generatePassword();
  if (useUpperCase && !/[A-Z]/.test(password)) return generatePassword();
  if (useNumbers && !/[0-9]/.test(password)) return generatePassword();
  if (
    useSpecialCharacters &&
    !/[!\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/.test(password)
  )
    return generatePassword();

  return password;
}

function getCriteria() {
  // TODO: Implement fetching of user criteria, possibly through prompts or forms.
}

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

// generate a set of characters based on the user criteria
function getCharacterSet() {
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const specialChars = "!\"#$%&'()*+,-./:;<=>?@[]^_`{|}~";

  var charset = "";
  if (useLowerCase) charset += lowercaseChars;
  if (useUpperCase) charset += uppercaseChars;
  if (useNumbers) charset += numbers;
  if (useSpecialCharacters) charset += specialChars;

  return charset;
}

// get a random character from the character set
function getRandomCharFromSet(charset) {
  return charset[Math.floor(Math.random() * charset.length)];
}

//generate the password by getting the user's criteria and then generating a password based on the a character set built from that criteria
function generatePassword() {
  //get the criteria from the user
  getCriteria();

  var password = "";
  const charset = getCharacterSet();

  // password generation for charset
  for (var i = 0; i < passwordLength; i++) {
    password += getRandomCharFromSet(charset);
  }

  // Validation ensures password matches user criteria
  password = validatePassword(password);

  return password;
}

// validate that the password meets the criteria. If not, generate it again until it does.
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

// get criteria from the user
function getCriteria() {
  // TODO: Implement fetching of user criteria, possibly through prompts or forms.
}

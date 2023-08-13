//variables to store user criteria
var minLength = 8;
var maxLength = 128;
var passwordLength = 0;
var useLowerCase = false;
var useUpperCase = false;
var useNumbers = false;
var useSpecialCharacters = false;
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
  //resetting password length for the next time a password in generated.
  passwordLength = 0;
  return password;
}

// validate that the password meets the criteria. If not, generate it again until it does.
function validatePassword(password) {
  if (password.length != passwordLength) return generatePassword();
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
  // while loop to get password length from user
  while (
    passwordLength < 8 ||
    passwordLength > 128 ||
    passwordLength % 1 !== 0
  ) {
    passwordLength = prompt(
      "How many characters-long do you want your password to be?"
    );
    //this if statmetn will let the user know if they entered an answer that didnt meet the criteria
    if (
      passwordLength < 8 ||
      passwordLength > 128 ||
      passwordLength % 1 !== 0
    ) {
      alert(
        "You have to choose a number between 8 and 128 . Please try again."
      );
    }
  }
  //get criteria for password from the user
  useLowerCase = confirm("Click ok to use lower case letters.");
  useUpperCase = confirm("Click ok to use upper case letters.");
  useNumbers = confirm("Click ok to use numbers.");
  useSpecialCharacters = confirm("Click ok to use special characters.");
  // will alert user they must choose one of the criteria if they choose none
  if (!useLowerCase && !useUpperCase && !useNumbers && !useSpecialCharacters) {
    alert("Must use at least one of the criteria");
    getCriteria();
  }
}

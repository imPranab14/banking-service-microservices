import  { customAlphabet } from "nanoid";

const saving = 17;
const current = 19;
function generatedAccountNumber(accountType) {
  const currentYear = new Date().getFullYear();
  const uniqueId = customAlphabet('0123456789', 7)();
  if (accountType === "current") {
    return `${current}${currentYear}${current}${uniqueId}`;
  } else {
    return `${saving}${currentYear}${saving}${uniqueId}`;
  }
}

export default generatedAccountNumber;

import crypto from 'crypto';

const algorithm = 'AES-128-CBC';

export function encrypt(text, passphrase) {
  const cipher = crypto.createCipher(algorithm, passphrase);
  let crypted = cipher.update(text, 'utf8', 'base64');
  crypted += cipher.final('base64');
  return crypted;
}

export function decrypt(text, passphrase) {
  const decipher = crypto.createDecipher(algorithm, passphrase);
  let dec = decipher.update(text, 'base64', 'utf8');
  dec += decipher.final('utf8');
  return dec;
}

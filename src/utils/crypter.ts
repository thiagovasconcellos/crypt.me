import CryptoJS from 'crypto-es';

class Crypter {
  constructor() {

  }

  crypt(secret: string, text: string) {
    return CryptoJS.AES.encrypt(text, secret).toString();
  }

  decrypt(secret: string, encryptedText: string) {
    const bytes = CryptoJS.AES.decrypt(encryptedText, secret);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

}

export default Crypter;
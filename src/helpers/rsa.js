import crypto from "crypto";
import fs from 'fs';

const publicKeyFile = './constants/publicKey.pem';
const privateKeyFile = './constants/privateKey.pem';

// Load RSA public key from file
function loadRSAPublicKey(publicKeyFile) {
    const publicKey = fs.readFileSync(publicKeyFile, 'utf8');
    return publicKey;
}

// Load RSA private key from file
function loadRSAPrivateKey(privateKeyFile) {
    const privateKey = fs.readFileSync(privateKeyFile, 'utf8');
    return privateKey;
}

const publicKey = loadRSAPublicKey(publicKeyFile);
const privateKey = loadRSAPrivateKey(privateKeyFile);

// Encrypt using RSA public key
function encryptRSA(message) {
    const encrypted = crypto.publicEncrypt(publicKey, Buffer.from(message));
    return encrypted.toString('base64');
}

// Decrypt using RSA private key
function decryptRSA(encryptedMessage) {
    const decrypted = crypto.privateDecrypt(privateKey, Buffer.from(encryptedMessage, 'base64'));
    return decrypted.toString('utf8');
}

export { encryptRSA, decryptRSA };
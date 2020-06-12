import crypto from 'crypto-js';
import md5 from 'crypto-js/md5';
import sha1 from 'crypto-js/sha1';
import sha256 from 'crypto-js/sha256';
import sha512 from 'crypto-js/sha512';

import concatBuffers from './concatBuffers.js';

export default async function calculateHash(files, algorithm) {
  const filesArray = Array.from(files);
  const promisesArray = [];
  filesArray.forEach((file) => {
    const arrayBuffer = new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.addEventListener('load', () => {
        resolve(reader.result);
      });
    });
    promisesArray.push(arrayBuffer);
  });
  let method;
  switch (algorithm) {
    case 'MD5':
      method = md5;
      break;
    case 'SHA1':
      method = sha1;
      break;
    case 'SHA256':
      method = sha256;
      break;
    case 'SHA512':
      method = sha512;
      break;
    default:
      method = md5;
  }
  let hash;
  await Promise.all(promisesArray).then((arrayBuffers) => {
    const arrayBufferSum = concatBuffers(arrayBuffers);
    const wordArray = crypto.lib.WordArray.create(arrayBufferSum);
    hash = method(wordArray).toString(crypto.enc.Hex);
  });
  return hash;
}

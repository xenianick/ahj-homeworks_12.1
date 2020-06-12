import calculateHash from './calculateHash.js';

self.addEventListener('message', async (event) => {
  const { files, algorithm } = event.data;
  const hash = await calculateHash(files, algorithm);
  self.postMessage(hash);
});

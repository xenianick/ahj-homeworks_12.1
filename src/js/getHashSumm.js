/* eslint-disable no-param-reassign */
import Worker from './web-worker.js';

export default async function getHashSumm(loadedFiles, currentAlgorithm) {
  let hashSum;
  await new Promise((resolve) => {
    const worker = new Worker();
    worker.addEventListener('message', ({ data: result }) => {
      resolve(result);
      worker.terminate();
    });
    worker.postMessage({ files: loadedFiles, algorithm: currentAlgorithm });
  }).then((result) => {
    hashSum = result;
  });
  return hashSum;
}

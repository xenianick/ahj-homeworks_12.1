import createNewElement from './createNewElement.js';
import toggleAlgorithmMenu from './toggleAlgorithmMenu.js';
import getHashSumm from './getHashSumm.js';

export default function createHasherWidget(algorithms) {
  const mainContainer = createNewElement('div', 'main-container');

  const hasherContainer = createNewElement('div', 'hasher-container');
  const hasherHeader = createNewElement('p', 'hasher-header', 'Hasher');
  const dndContainer = createNewElement('div', 'dnd-container', '<p>Drag and Drop files here or Click to Select</p>');
  const inputFiles = createNewElement('input', 'files-input');
  inputFiles.type = 'file';
  inputFiles.multiple = true;
  dndContainer.appendChild(inputFiles);
  hasherContainer.appendChild(hasherHeader);
  hasherContainer.appendChild(dndContainer);

  const algorithmSwithcher = createNewElement('div', 'hash-algorithm-swithcher', '<p>Hash Algorithm:</p>');
  const algorithmMenu = createNewElement('ul', 'hash-algorithm-menu');
  algorithmSwithcher.appendChild(algorithmMenu);
  hasherContainer.appendChild(algorithmSwithcher);

  const calcHashContainer = createNewElement('div', 'calc-hash-container');
  const calcHashHeader = createNewElement('p', 'calc-hash-header', 'Calculated Hash:');
  const calcHash = createNewElement('p', 'calc-hash');
  calcHashContainer.appendChild(calcHashHeader);
  calcHashContainer.appendChild(calcHash);

  mainContainer.appendChild(hasherContainer);
  mainContainer.appendChild(calcHashContainer);

  let currentAlgorithm;
  let currentFiles = 0;

  algorithms.forEach((algorithm, i) => {
    const algorithmHtml = createNewElement('li', 'list-item', `${algorithm}`);
    if (i >= 1) {
      algorithmHtml.classList.add('hide');
    } else {
      currentAlgorithm = algorithm;
    }
    algorithmHtml.addEventListener('click', async () => {
      toggleAlgorithmMenu(algorithmMenu, algorithmHtml);
      if (algorithm !== currentAlgorithm) {
        currentAlgorithm = algorithm;
        if (currentFiles !== 0) {
          const hashSum = await getHashSumm(currentFiles, currentAlgorithm);
          calcHash.innerHTML = hashSum;
        }
      }
    });
    algorithmMenu.appendChild(algorithmHtml);
  });

  inputFiles.addEventListener('change', async (event) => {
    if (event.currentTarget.files.length > 0) {
      currentFiles = event.currentTarget.files;
      const hashSum = await getHashSumm(currentFiles, currentAlgorithm);
      calcHash.innerHTML = hashSum;
    }
  });

  return mainContainer;
}

export default function toggleAlgorithmMenu(algorithmMenu, algorithmHtml) {
  const array = Array.from(document.getElementsByClassName('list-item'));
  if (algorithmMenu.classList.contains('popup')) {
    array.forEach((item) => {
      if (item !== algorithmHtml) {
        item.classList.add('hide');
      }
      algorithmMenu.prepend(algorithmHtml);
    });
  } else {
    array.forEach((item) => {
      item.classList.remove('hide');
    });
  }
  algorithmMenu.classList.toggle('popup');
}

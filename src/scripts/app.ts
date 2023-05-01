type RegexElement = {
  element: HTMLInputElement;
  condition: RegExp;
  value: number;
};
type passwordMatch = {
  symbols: RegexElement;
  uppercase: RegexElement;
  lowercase: RegexElement;
  digit: RegexElement;
};

const GENERATE_PASSWORD: passwordMatch = {
  symbols: {
    element: document.querySelectorAll(
      '.setting__checked-option'
    )[3] as HTMLInputElement,
    condition: new RegExp('\\W'),
    value: 1,
  },
  uppercase: {
    element: document.querySelectorAll(
      '.setting__checked-option'
    )[0] as HTMLInputElement,
    condition: new RegExp('[A-Z]'),
    value: 0.5,
  },
  lowercase: {
    element: document.querySelectorAll(
      '.setting__checked-option'
    )[1] as HTMLInputElement,
    condition: new RegExp('[a-z]'),
    value: 0.5,
  },
  digit: {
    element: document.querySelectorAll(
      '.setting__checked-option'
    )[2] as HTMLInputElement,
    condition: new RegExp('\\d'),
    value: 1,
  },
};
const CHARACTERS: string[] = [];
for (let i = 33; i < 127; i++) {
  CHARACTERS.push(String.fromCharCode(i));
}

function copyPasswordToClipBoard(): void {
  const password: HTMLElement | null =
    document.querySelector('.password__text');
  if (password) {
    navigator.clipboard.writeText(password.innerText);
  }
}

function animationSuccesMessage(): void {
  const succesMessage: HTMLElement | null =
    document.querySelector('.password__succes');
  if (succesMessage) {
    succesMessage.style.display = 'block';
    setTimeout(() => {
      succesMessage.classList.toggle('show');
    }, 10);
    setTimeout(() => {
      succesMessage.classList.toggle('show');
    }, 2000);
  }
}

function setProgressColorInRange(): void {
  const range: HTMLInputElement | null = document.querySelector('.green-range');
  if (range) {
    const min: number = Number(range?.min);
    const max: number = Number(range?.max);
    const value: number = (100 * Number(range?.value)) / (max - min);
    range.style.background = `linear-gradient(90deg, rgba(164,255,175,1) ${
      value - 0.3
    }%, rgba(24,23,31,1) ${value - 0.3}%)`;
  }
}

function setValueRange(): void {
  const range: HTMLInputElement | null = document.querySelector('.green-range');
  const value: string = range ? range.value : '';
  const rangeDisplayValue: HTMLElement | null = document.querySelector(
    '.setting__length-value'
  );
  if (rangeDisplayValue) {
    rangeDisplayValue.innerText = value;
  }
}
function generateValidCharsArray(): string[] {
  let result: string[] = [];
  Object.values(GENERATE_PASSWORD)
    .forEach(value => {
      if (value.element.checked) {
        result = result.concat(
          CHARACTERS.filter((char) => value.condition.test(char))
        );
      }
    })
  return result;
}

function generateRandomPassword(size: number, characters: string[]): string {
  if (!characters.length) {
    return '';
  }
  return Array(size)
    .fill('')
    .map(() => characters[Math.floor(Math.random() * characters.length)])
    .join('');
}

function evaluateStrengthPassword(password: string): number {
  if(!password.length) {
    return 0;
  }
  let result: number = password.length >= 10 ? 1 : 0;
  Object.values(GENERATE_PASSWORD)
    .forEach(obj => {
      if (obj.condition.test(password)) {
        result += obj.value;
      }
    })
  return result;
}

function resetStrengthIcon(): void {
  const text: HTMLElement | null = document.querySelector('.strength__text')
  if(text){
    text.innerHTML = ''
  }
  document.querySelectorAll('.strength__icon')
    .forEach(element => {
      element.setAttribute('class', 'strength__icon');
    })
}

function displayStrengthPassword(numberColoredBar: number): void {
  resetStrengthIcon();
  const text: HTMLElement | null = document.querySelector('.strength__text')
  if(!text) {
    throw new Error('Error: element \'.stength__text\' does not exist')
  }
  const barColor: HTMLElement[] = Array.from(document.querySelectorAll('.strength__icon'))
  let classIcon: string = 'strength__icon';

  if(numberColoredBar === 0) {
    text.innerHTML = '';
  } else if (numberColoredBar >= 4){
    text.innerHTML = 'strong';
    classIcon = 'strength__icon--strong'
  } else if (numberColoredBar >= 3){
    text.innerHTML = 'medium';
    classIcon = 'strength__icon--medium'
  } else if (numberColoredBar >= 2){
    text.innerHTML = 'weak';
    classIcon = 'strength__icon--weak'
  } else if (numberColoredBar >= 0){
    text.innerHTML = 'too weak';
    classIcon = 'strength__icon--too-weak'
  }

  const nbr: number = numberColoredBar === 1.5 ? 1 : numberColoredBar;
  for(let i=0; i<nbr; i++){
    barColor[i].classList.add(classIcon);
  }
}


function main(): void {
  const rangeElement: HTMLInputElement | null = document.querySelector('.green-range');
  const passwordElement: HTMLElement | null = document.querySelector('.password__text');

  if(!rangeElement) {
    throw new Error('Error: element \'.green-range\' does not exist')
  }
  if(!passwordElement) {
    throw new Error('Error: element \'.password__text\' does not exist')
  }
  document.querySelector('.password__copy-icon')
    ?.addEventListener('click', () => {
      copyPasswordToClipBoard();
      animationSuccesMessage();
    });

  setProgressColorInRange();
  setValueRange();
  rangeElement.addEventListener('input', () => {
    setProgressColorInRange();
    setValueRange();
  });

  document.querySelector('.setting__submit')
    ?.addEventListener('click', (event) => {
      event.preventDefault();
      const size: number = rangeElement ? Number(rangeElement.value) : 0;
      
      passwordElement.innerText = generateRandomPassword(
        size,
        generateValidCharsArray()
      );
      displayStrengthPassword(evaluateStrengthPassword(passwordElement.innerText));
      
    });
}

main();

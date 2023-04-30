type RegexElement = {
  element: HTMLInputElement;
  condition: RegExp;
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
  },
  uppercase: {
    element: document.querySelectorAll(
      '.setting__checked-option'
    )[0] as HTMLInputElement,
    condition: new RegExp('[A-Z]'),
  },
  lowercase: {
    element: document.querySelectorAll(
      '.setting__checked-option'
    )[1] as HTMLInputElement,
    condition: new RegExp('[a-z]'),
  },
  digit: {
    element: document.querySelectorAll(
      '.setting__checked-option'
    )[2] as HTMLInputElement,
    condition: new RegExp('\\d'),
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

function setValueRange() {
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
  for (let value of Object.values(GENERATE_PASSWORD)) {
    if (value.element.checked) {
      result = result.concat(
        CHARACTERS.filter((char) => value.condition.test(char))
      );
    }
  }
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
// TODO: peut etre passe les selecteurs au fonction pour rendre celle ci plus generique
function main(): void {
  const rangeElement: HTMLInputElement | null = document.querySelector('.green-range')
  const passwordElement: HTMLElement | null = document.querySelector('.password__text')
  document
    .querySelector('.password__copy-icon')
    ?.addEventListener('click', () => {
      copyPasswordToClipBoard();
      animationSuccesMessage();
    });
  setProgressColorInRange();
  setValueRange();
  rangeElement?.addEventListener('input', () => {
    setProgressColorInRange();
    setValueRange();
  });
  console.log(generateRandomPassword(10, generateValidCharsArray()));
  document
    .querySelector('.setting__submit')
    ?.addEventListener('click', (event) => {
      event.preventDefault();
      const size: number = rangeElement ? Number(rangeElement.value) : 0;
      if(passwordElement){
        passwordElement.innerText = generateRandomPassword(size, generateValidCharsArray())
      }
      
    });
}

main();

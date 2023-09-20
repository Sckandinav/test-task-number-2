const resetBtn = document.querySelector('.btn__reset');

const regexPatterns = {
  carNumber: /^[A-Z]{2}\d{4}[A-Z]{2}$/,
  passportSeries: /^[A-Z]{2}\d{2}$/,
  passportNumber: /^\d{6}$/,
  issueDate: /^\d{2}\.\d{2}\.\d{4}$/
};

const validateField = (fieldName, value) => {
  const pattern = regexPatterns[fieldName];
  return pattern.test(value);
};

const generateExamples = () => {
  const examples = {
    carNumber: 'Пример: AB1234CD',
    passportSeries: 'Пример: AB12',
    passportNumber: 'Пример: 123456',
    issueDate: 'Пример: 01.01.2022'
  };

  for (const fieldName in examples) {
    const exampleElement = document.createElement('div');
    exampleElement.textContent = examples[fieldName];
    exampleElement.id = `${fieldName}-example`;
    exampleElement.className = 'example';
    exampleElement.style.display = 'none';
    const inputElement = document.getElementById(fieldName);
    inputElement.parentNode.insertBefore(exampleElement, inputElement.nextSibling);
  }
};

const updateExampleText = (fieldName, inputValue) => {
  const exampleElement = document.getElementById(`${fieldName}-example`);
  exampleElement.style.display = validateField(fieldName, inputValue) ? 'none' : 'block';
};

const addInputEventListeners = () => {
  const inputFields = ['carNumber', 'passportSeries', 'passportNumber', 'issueDate'];
  
  inputFields.forEach(fieldName => {
    const inputElement = document.getElementById(fieldName);
    
    inputElement.addEventListener('input', () => {
      const inputValue = inputElement.value;
      updateExampleText(fieldName, inputValue);
      if (!validateField(fieldName, inputValue) || inputValue === '') {
        inputElement.classList.add('invalid');
      } else {
        inputElement.classList.remove('invalid');
      }
      localStorage.setItem(fieldName, inputValue);
    });
  });
};

const isFormValid = () => {
  const inputFields = ['carNumber', 'passportSeries', 'passportNumber', 'issueDate'];
  
  for (const fieldName of inputFields) {
    const inputElement = document.getElementById(fieldName);
    const inputValue = inputElement.value;
    if (!validateField(fieldName, inputValue) || inputValue === '') {
      return false;
    }
  }
  
  return true;
};

const form = document.getElementById('form');
form.addEventListener('submit', (event) => {
  if (!isFormValid()) {
    event.preventDefault();
    alert('Заполните все поля корректно.');
  }
});

generateExamples();
addInputEventListeners();

const resetForm = () => {
  const inputs = document.querySelectorAll('.form__input');
  inputs.forEach(input => {
    input.value = '';
    localStorage.removeItem(input.id);
    location.reload()
  })
}

window.addEventListener('load', () => {
  const inputFields = ['carNumber', 'passportSeries', 'passportNumber', 'issueDate'];
  
  inputFields.forEach(fieldName => {
    const storedValue = localStorage.getItem(fieldName);
    if (storedValue) {
      const inputElement = document.getElementById(fieldName);
      inputElement.value = storedValue;
      updateExampleText(fieldName, storedValue);
    }
  });
});

resetBtn.addEventListener('click', (e) => {
  e.preventDefault();
  resetForm();
});

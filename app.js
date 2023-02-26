const error = document.getElementById('error');
const errMsg = document.querySelector('.error-message');
const bills = document.querySelector('.bills');
const tipAmt = document.querySelector('.per-person');
const totalAmt = document.querySelector('.tip-per-person');
const tipGrid = document.querySelector('.btn-grid');
const tipPercent = document.querySelectorAll('.tip');
const resetBtn = document.querySelector('.reset');
const custom = document.querySelector('.custom');
bills.addEventListener('input', cal);
error.addEventListener('input', cal);

custom.addEventListener('input', () => {
  const customVal = parseFloat(custom.value);
  if (isNaN(customVal) || customVal < 0) {
    custom.value = '';
  } else {
    const biilsValue = parseFloat(bills.value);
    const parse = parseInt(error.value);

    if (biilsValue <= 0 || isNaN(biilsValue)) {
      bills.value = '';
      reset();
    }
    if (parse <= 0 || isNaN(parse)) {
      error.value = 0;
      reset();
      errMsg.classList.add('error');
      error.style.outlineColor = 'red';
    } else {
      const per = custom.value;
      const person = biilsValue / parse;
      const percentage = person * (per / 100);
      const totalEach = percentage + person;
      tipAmt.textContent = percentage.toFixed(2);
      totalAmt.textContent = totalEach.toFixed(2);
      errMsg.classList.remove('error');
      error.style.outlineColor = 'transparent';
      if (isNaN(biilsValue)) {
        reset();
      }
    }
  }
});

resetBtn.addEventListener('click', function () {
  reset();
  bills.value = 0;
  parseInt((error.value = 0));
});

function reset() {
  tipAmt.textContent = '0.00';
  totalAmt.textContent = '0.00';
}

function cal() {
  const biilsValue = parseFloat(bills.value);
  const parse = parseInt(error.value);

  if (biilsValue <= 0 || isNaN(biilsValue)) {
    bills.value = '';
    reset();
  }
  if (parse <= 0 || isNaN(parse)) {
    error.value = 0;
    reset();
    errMsg.classList.add('error');
    error.style.outlineColor = 'red';
  } else {
    const per = parseInt(tipPercent[0].dataset.id);
    const person = biilsValue / parse;
    const percentage = person * (per / 100);
    const totalEach = percentage + person;
    tipAmt.textContent = percentage.toFixed(2);
    totalAmt.textContent = totalEach.toFixed(2);
    tipGrid.addEventListener('click', percent);
    errMsg.classList.remove('error');
    error.style.outlineColor = 'transparent';
    if (isNaN(biilsValue)) {
      reset();
    }
  }
}

function percent(e) {
  const id = parseInt(e.target.dataset.id);
  if (id) {
    const biilsValue = parseFloat(bills.value);
    const parse = parseInt(error.value);
    const person = biilsValue / parse;
    const percentage = person * (id / 100);
    const totalEach = percentage + person;
    tipAmt.textContent = percentage.toFixed(2);
    totalAmt.textContent = totalEach.toFixed(2);
    tipPercent.forEach(function (element) {
      element.classList.remove('active');
    });
    e.target.classList.add('active');
  }
}

// This Code need a hell of refactoring in the near future, too much redudancy

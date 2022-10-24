import "./css/index.css";

import IMask from "imask";

const ccBgColor = document.querySelector(".cc");

const ccLogoImg = document.querySelector(".cc-logo span:nth-child(2) img");

function setCardType(type) {
  const colors = {
    visa: "#2566AF",
    mastercard: "#EB001B",
    americanexpress: "#0077A6",
    elo: "#000",
    default: "#7C7C8A",
  };

  // Essa forma é uma maneira de acessar uma propriedade baseada em uma variável. É o mesmo que 'colors.visa', por exemplo.
  ccBgColor.style.backgroundColor = `${colors[type]}`;
  ccLogoImg.setAttribute("src", `/cc-${type}.svg`);
}

globalThis.setCardType = setCardType;

// MASKS

// Security Code (CVC)
const securityCode = document.querySelector("#security-code");
const securityCodePattern = {
  mask: "0000"
};

const secutiryCodeMasked = IMask(securityCode, securityCodePattern);

// Date
const expirationDate = document.querySelector('#expiration-date');
const expirationDatePattern = {
  mask: "MM{/}YY",
  blocks: {
    YY: {
      mask: IMask.MaskedRange,
      from: String(new Date().getFullYear()).slice('2'),
      to: String(new Date().getFullYear() + 10).slice('2')
    },

    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12
    }
  }
};

const expirationDateMasked = IMask(expirationDate, expirationDatePattern);

// Card Number
const cardNumber = document.querySelector('#card-number');
const cardNumberPattern = {
  mask: [
    {
      mask: "0000 0000 0000 0000",
      cardType: "visa",
      regex: /^4\d{0,15}/
    },
    {
      mask: "0000 0000 0000 0000",
      cardType: "mastercard",
      regex: /(^5[1,5]\d{0,2}|^22[2-9]\d{0,1}|^2[3-7]\d{0,2})\d{0,12}/,
    },
    {
      mask: "0000 0000 0000 0000",
      cardType: "elo",
      regex: /^6\d{0,15}/
    },
    {
      mask: "0000 0000 0000 0000",
      cardType: "americanexpress",
      regex: /^3\d{0,15}/
    },
    {
      mask: "0000 0000 0000 0000",
      cardType: "default"
    }
  ],
  dispatch: (appended, dynamicMasked) => {
    const number = (dynamicMasked.value + appended).replace(/\D/g, "")
    const foundMask = dynamicMasked.compiledMasks.find((item) => {
      return number.match(item.regex)
    })

    return foundMask
  }
}

const cardNumberMasked = IMask(cardNumber, cardNumberPattern)

cardNumberMasked.on("accept", () => {
  const cardType = cardNumberMasked.masked.currentMask.cardType
  setCardType(cardType)
  updateCardNumber(cardNumberMasked.value)
})

function updateCardNumber(number) {
  const ccNumber = document.querySelector(".cc-number")

  ccNumber.innerHTML = number.length === 0 ? "1234 5678 9012 3456" : number
}

const cardHolder = document.querySelector("#card-holder")
cardHolder.addEventListener("input", () => {
  const ccHolder = document.querySelector(".cc-holder .value")
  
  ccHolder.innerHTML = cardHolder.value === 0 ? "JOÃO DA SILVA" : cardHolder.value
})

expirationDateMasked.on("accept", () => {
  updateExpirationDate(expirationDateMasked.value)
})

function updateExpirationDate(date) {
  const ccExpiration = document.querySelector(".cc-expiration .value")

  ccExpiration.innerHTML = date.length === 0 ? "02/32" : date
}

secutiryCodeMasked.on("accept", () => {
  updateSecurityCode(secutiryCodeMasked.value)
})

function updateSecurityCode(code) {
  const ccSecurity = document.querySelector(".cc-security .value")

  ccSecurity.innerHTML = code.length === 0 ? "123" : code
}

const addButton = document.querySelector("#add-card")
addButton.addEventListener("click", () => {
  alert("Cartão adicionado!")
})
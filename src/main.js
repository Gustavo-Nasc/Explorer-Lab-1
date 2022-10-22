import "./css/index.css";

import IMask from "imask";

const ccBgColor = document.querySelector(".cc");

const ccLogoImg = document.querySelector(".cc-logo span:nth-child(2) img");

function setCardType(type) {
  const colors = {
    visa: "#2566AF",
    mastercard: "#EB001B",
    americanexpress: "#0077A6",
    maestro: "#7375CF",
    elo: "#000",
    hipercard: "#822124",
    alelo: "#007858",
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
  mask: "0000 0000 0000 0000"
}

const cardNumberMasked = IMask(cardNumber, cardNumberPattern)
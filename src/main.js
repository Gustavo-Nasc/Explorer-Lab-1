import "./css/index.css";

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

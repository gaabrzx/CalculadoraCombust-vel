const calculateBtn = document.querySelector(".calculateButton");
const resultContainer = document.querySelector(".result_container");
const priceResult = document.querySelector(".price_result");
const distanceResult = document.querySelector(".distance_result");
const vehicleResult = document.querySelector(".vehicle_result");

const distanceDescription = document.querySelector(".distance_description");
const vehicleDescription = document.querySelector(".vehicle_description");
const priceDescription = document.querySelector(".price_description");
const checkDescription = document.querySelector(".check_description");

const checkBox = document.querySelector("#twoTravel");

calculateBtn.addEventListener("click", () => {
  // Verifica se o result_container está visível

  // Obtem os valores dos inputs
  const distance = document.querySelector(".distance_input").value.trim();
  const vehicle = document.querySelector(".vehicle_input").value.trim();
  const price = document.querySelector(".price_input").value.trim();

  // Verifica se todos os inputs estão preenchidos
  if (!distance || !vehicle || !price) {
    return; // Interrompe a execução do cálculo
  }

  let distanceValue = parseFloat(distance);
  let vehicleValue = parseFloat(vehicle);
  let priceValue = parseFloat(price.replace(",", "."));

  // Verifica se o checkbox está marcado
  if (checkBox.checked) {
    distanceValue *= 2;
    checkDescription.innerHTML = `Considerar o caminho de volta: <b>SIM</b>`;
  } else {
    checkDescription.innerHTML = `Considerar o caminho de volta: <b>NÃO</b>`;
  }

  // Calcula o resultado
  const result = (distanceValue / vehicleValue) * priceValue;

  // Formata os valores para sempre ter duas casas decimais
  priceResult.textContent = `R$ ${result.toFixed(2).replace(".", ",")}`;
  distanceResult.textContent = `${distanceValue} km`;
  vehicleResult.textContent = `${vehicleValue} Litros`;

  // Atualiza as descrições com valores formatados
  distanceDescription.innerHTML = `Distância: <b>${distanceValue} km</b>`;
  vehicleDescription.innerHTML = `Consumo Médio do Veículo: <b>${vehicleValue} Litros</b>`;
  priceDescription.innerHTML = `Preço do Combustível por Litro: <b>R$ ${priceValue
    .toFixed(2)
    .replace(".", ",")}</b>`;

  // Abre a seção de resultados
  openResult();
});

// Input Parameters
const cleanBtn = document.querySelector(".resetLink");
cleanBtn.addEventListener("click", () => {
  document.querySelector(".distance_input").value = "";
  document.querySelector(".vehicle_input").value = "";
  document.querySelector(".price_input").value = "";
  closeResult();
});

// Close result_container button
const CLOSEBTN = document.querySelector(".closeBtn");

CLOSEBTN.addEventListener("click", () => {
  closeResult();
});

function closeResult() {
  resultContainer.style.display = "none";
}

function openResult() {
  resultContainer.style.display = "flex";
}

// Input Number Format

const priceInput = document.querySelector(".price_input");

priceInput.addEventListener("input", (e) => {
  // Remove todos os caracteres que não sejam números
  let value = e.target.value.replace(/\D/g, "");

  // Garante que o valor tenha no máximo 11 dígitos (limita valores grandes)
  value = value.slice(0, 11);

  // Adiciona a formatação no formato Real Brasileiro
  let formattedValue = (Number(value) / 100).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  // Atualiza o valor no campo de entrada
  e.target.value = formattedValue;
});

// Evita que o usuário cole valores inválidos
priceInput.addEventListener("paste", (e) => {
  e.preventDefault();
});

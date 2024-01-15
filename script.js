//  Data
// 1 - account
const account1 = {
  password: "1111",
  cardNumber: `8600 1402 3456 5678`,
  validityPeriod: "08" + "/" + "23",
  owner: {
    fristname: "Farrux",
    lastname: "Ermamatov",
  },
  currency: "USD",
  locale: "en-US",
  tranfers: [
    {
      amount: 2000,
      data: "2019-11-18T21:31:17.178Z",
    },
    {
      amount: 4555.23,
      data: "2019-12-23T07:42:13.383Z",
    },
    {
      amount: 5000,
      data: "2019-08-20T09:10:10.383Z",
    },
    {
      amount: -500,
      data: "2019-07-10T11:13:03.383Z",
    },
    {
      amount: -400,
      data: "2020-12-16T20:02:43.383Z",
    },
  ],
};
// 2 - account
const account2 = {
  password: "2222",
  cardNumber: `8600220234101234`,
  validityPeriod: "06" + "/" + "22",
  owner: {
    fristname: "Komil",
    lastname: "Rasulov",
  },
  currency: "UZS",
  locale: "ru-RU",
  tranfers: [
    {
      amount: 5000,
      data: "2019-11-18T21:31:17.178Z",
    },
    {
      amount: -150,
      data: "2019-12-23T07:42:13.383Z",
    },
    {
      amount: -790,
      data: "2019-08-20T09:10:10.383Z",
    },
    {
      amount: -642.89,
      data: "2019-07-10T11:13:03.383Z",
    },
    {
      amount: 3000,
      data: "2020-12-16T20:02:43.383Z",
    },
  ],
};
const accounts = [account1, account2];

// Elements
const inputLogin = document.querySelector(".inp_login");
const inputPassword = document.querySelector(".inp_pasword");
const btnLogin = document.querySelector(".enter");
const btnexit = document.querySelector(".exit");
const logoBrand = document.querySelector(".logo");
const cardOwner = document.querySelector(".nameSurname");
const cardNumber = document.querySelector(".cardNum");
const validityPeriod = document.querySelector(".validity-period");
const cardBalance = document.querySelector(".card-balance");
const inComes = document.querySelector(".incomes");
const expenses = document.querySelector(".expenses");

// Functions
const createLogin = () => {
  accounts.forEach((acc) => {
    acc.username =
      acc.owner.fristname[0].toLocaleLowerCase() +
      acc.owner.lastname[0].toLowerCase();
  });
};
createLogin();
// console.log(account1.password);
// console.log(account2.password);
// console.log(accounts);

let LoggedInAccount; // undefined bo'lib turadi boshlanishiga

const currencyFormatter = (amount, locale, currency) => {
  return amount.toLocaleString(locale, {
    style: "currency",
    currency,
  });
};

const calcBalance = (tranfers) => {
  return +tranfers.reduce((bal, tr) => bal + tr.amount, 0).toFixed(2);
};

const maskCreditCard = (cardNumber) => {
  const str = cardNumber + "";
  const last = str.slice(-4);
  return last.padStart(str.length, "*");
};

const setCardInfo = (acc) => {
  cardOwner.textContent = Object.values(LoggedInAccount.owner).join(" ");
  cardNumber.textContent = maskCreditCard(acc.cardNumber);
  validityPeriod.textContent = acc.validityPeriod;
  const bal = calcBalance(acc.tranfers);
  cardBalance.textContent = currencyFormatter(bal, acc.locale, acc.currency);
};

const setSummary = (acc) => {
  const income = +acc.tranfers
    .filter((tr) => tr.amount > 0)
    .reduce((bal, tr) => bal + tr.amount, 0)
    .toFixed(2);

  const expense = +acc.tranfers
    .filter((tr) => tr.amount < 0)
    .reduce((bal, tr) => bal + tr.amount, 0)
    .toFixed(2);

  inComes.textContent = currencyFormatter(income, acc.locale, acc.currency);
  expenses.textContent = currencyFormatter(expense, acc.locale, acc.currency);
};

const setAllInfo = (acc) => {
  setCardInfo(acc);
  setSummary(acc);
};

btnLogin.addEventListener("click", (e) => {
  e.preventDefault();
  const candidate = accounts.find((acc) => acc.username === inputLogin.value);

  if (!candidate) return;
  if (candidate.password !== inputPassword.value) return;
  // console.log("Xush kelibsiz foydalanuvchi");

  inputLogin.classList.add("hide");
  inputPassword.classList.add("hide");
  btnLogin.classList.add("hide");
  btnexit.classList.remove("hide");

  LoggedInAccount = candidate;
  logoBrand.textContent = `Xush kelibsiz ${candidate.owner.fristname} ${candidate.owner.lastname}`;

  inputLogin.value = "";
  inputPassword.value = "";

  setAllInfo(LoggedInAccount);
});

btnexit.addEventListener("click", () => {
  btnexit.classList.add("hide");
  inputLogin.classList.remove("hide");
  inputPassword.classList.remove("hide");
  btnLogin.classList.remove("hide");

  logoBrand.textContent = `Payments App`;

  cardOwner.textContent = "Name Surname";
  cardNumber.textContent = "0000 0000 0000 0000";
  validityPeriod.textContent = "0 " + "/" + " 0";
  cardBalance.textContent = "00.000.00";

  inComes.textContent = "+00.000";
  expenses.textContent = "-00.000";
});

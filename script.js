// App inital data

const user1 = {
  name: 'Khan Ahmed',
  userName: 'khan10',
  password: '123456',
  statements: [
    {
      type: 'Deposit',
      amount: 1000,
      date: new Date('Jun 06 2023').toLocaleDateString('en-GB'),
    },
    {
      type: 'Deposit',
      amount: 1000,
      date: new Date('Jun 05 2023').toLocaleDateString('en-GB'),
    },
    {
      type: 'Deposit',
      amount: 1000,
      date: new Date('Jun 04 2023').toLocaleDateString('en-GB'),
    },
    {
      type: 'Withdrawal',
      amount: 1000,
      date: new Date('Jun 06 2023').toLocaleDateString('en-GB'),
    },
  ],
  interestRate: 9,
  currentBalance: 0,
};

const user2 = {
  name: 'Khan Irshad',
  userName: 'khan11',
  password: '123456',
  statements: [
    {
      type: 'Deposit',
      amount: 1000,
      date: new Date('Jul 12 2022').toLocaleDateString('en-GB'),
    },
  ],
  currentBalance: 0,
};

const user3 = {
  name: 'Khan Abrar',
  userName: 'khan12',
  password: '123456',
  statements: [
    {
      type: 'Deposit',
      amount: 1000,
      date: new Date('Jul 12 2022').toLocaleDateString('en-GB'),
    },
    {
      type: 'Withdrawal',
      amount: 1000,
      date: new Date('Jul 12 2022').toLocaleDateString('en-GB'),
    },
  ],
  interestRate: 10,
  currentBalance: 0,
};

const user4 = {
  name: 'Khan Nadeem',
  userName: 'khan13',
  password: '123456',
  statements: [
    {
      type: 'Deposit',
      amount: 1000,
      date: new Date('Jul 12 2022').toLocaleDateString('en-GB'),
    },
  ],
  currentBalance: 0,
};

const users = [user1, user2, user3, user4];
let currentDate = null;

// App working logic

const loginBtn = document.querySelector('.login-btn');
const loginUser = document.querySelector('.login-user');
const loginPassword = document.querySelector('.login-password');
const appContainer = document.querySelector('.app');
const loginText = document.querySelector('.login');
const dateText = document.querySelector('.balance-date');
const statement = document.querySelector('.statement');
const deposit = document.getElementById('deposit');
const withdrawals = document.getElementById('withdraw');
const interest = document.getElementById('interest');
const acctBalance = document.querySelector('.balance-amount');
const transferBtn = document.getElementById('transfer-btn');
const loanBtn = document.getElementById('loan-btn');
const closeBtn = document.getElementById('close-btn');
const transferAmtInput = document.getElementById('transfer-amt');
const transferToInput = document.getElementById('transfer-to');
let balanceAmount = 0;
const bankInterestRate = 8;

const checkForCredentials = (userName, password) => {
  const user = users.find(
    each => userName === each?.userName && password === each?.password
  );
  if (user) {
    // Showing account details and clearing login input's
    appContainer.style.opacity = 1;
    loginUser.value = '';
    loginPassword.value = '';

    // Guessing appropriate greeting message
    currentDate = new Date();
    const currentHour = currentDate.getHours();
    const greeting =
      currentHour < 17
        ? currentHour < 12
          ? 'Good morning'
          : 'Good afternoon'
        : 'Good evening';
    loginText.innerHTML = `${greeting}, ${user?.name}`;

    // Changing date
    dateText.innerHTML = `As of ${currentDate.toLocaleDateString('en-GB')} <span id="current-time"><span>`;

    let statements = user['statements'];
    // sorting based on dates in descending order i.e farthest to nearest for rendering
    statements.sort(function(a,b){
      return new Date(a.date) - new Date(b.date);
    });
    //rendering statement
    renderingBankStatement(statements);

    calcSummaryAndDisplay(statements, user?.interestRate);
    currentTime();
  } else {
    alert('Bad credentials');
    loginUser.value = '';
    loginPassword.value = '';
  }
};

loginBtn.addEventListener('click', e => {
  e.preventDefault();
  const userName = loginUser?.value;
  const password = loginPassword?.value;
  checkForCredentials(userName, password);
});

transferBtn.addEventListener('click', e => {
  e.preventDefault();
  const transferTo = transferToInput.value;
  const transferAmt = transferAmtInput.value;
  if(Number(transferAmt) <= balanceAmount){
    console.log("proceed with withdraw");
  }else{
    alert("Not sufficient balance")
  }
})

const renderingBankStatement = statements => {
  let positiveCount = 1;
  let negativeCount = 1;
  statements.forEach(each => {
    const statementRow = document.createElement('div');
    statementRow.className = 'statement-row';
    const statmentType = document.createElement('span');
    if (each?.type === 'Deposit') {
      statmentType.innerHTML = `${positiveCount} ${each?.type}`;
      positiveCount++;
      statmentType.className = 'statement-type positive';
    } else {
      statmentType.innerHTML = `${negativeCount} ${each?.type}`;
      negativeCount++;
      statmentType.className = 'statement-type negative';
    }
    const statementDays = document.createElement('span');
    statementDays.className = 'statement-day';
    statementDays.innerHTML = `${calcDaysFromCurrentDate(each?.date)} Days ago`;
    const statementAmt = document.createElement('span');
    statementAmt.className = 'statement-amount';
    statementAmt.innerHTML = `${each?.amount}€`;
    statementRow.appendChild(statmentType);
    statementRow.appendChild(statementDays);
    statementRow.appendChild(statementAmt);
    statement.prepend(statementRow);
  });
};

function stringToDate(_date, _format, _delimiter) {
  const formatLowerCase = _format.toLowerCase();
  const formatItems = formatLowerCase.split(_delimiter);
  const dateItems = _date.split(_delimiter);
  const monthIndex = formatItems.indexOf('mm');
  const dayIndex = formatItems.indexOf('dd');
  const yearIndex = formatItems.indexOf('yyyy');
  let month = parseInt(dateItems[monthIndex]);
  month -= 1;
  return new Date(dateItems[yearIndex], month, dateItems[dayIndex]);
}

const calcDaysFromCurrentDate = date => {
  let difference =
    new Date().getTime() - stringToDate(date, 'dd/MM/yyyy', '/').getTime();
  return Math.ceil(difference / (1000 * 3600 * 24));
};

const calcSummaryAndDisplay = (statement, interestRate) => {
  const depositAmt = (statement || []).reduce((accumulator, each) => {
    if (each?.type === 'Deposit') {
        accumulator += each?.amount;
    }
    return accumulator;
  }, 0);

  const withdrawalAmt = (statement || []).reduce((accumulator, each) => {
    if (each?.type !== 'Deposit') {
        accumulator += each?.amount;
    }
    return accumulator;
  }, 0);

  const interestAmt = depositAmt * ((interestRate || bankInterestRate )/ 100);
  deposit.innerHTML = `${depositAmt}€`;
  withdrawals.innerHTML = `${withdrawalAmt}€`;
  interest.innerHTML = `${interestAmt}€`;
  balanceAmount = (depositAmt + interestAmt) - withdrawalAmt;
  acctBalance.innerHTML = `${balanceAmount}€`
};

function currentTime() {
  let date = new Date(); 
  let hh = date.getHours();
  let mm = date.getMinutes();
  let ss = date.getSeconds();
  let session = "AM";

  if(hh == 0){
      hh = 12;
  }
  if(hh > 12){
      hh = hh - 12;
      session = "PM";
   }

   hh = (hh < 10) ? "0" + hh : hh;
   mm = (mm < 10) ? "0" + mm : mm;
   ss = (ss < 10) ? "0" + ss : ss;
    
   let time = hh + ":" + mm + " " + session;

  document.getElementById("current-time").innerText = time; 
  let t = setTimeout(function(){ currentTime() }, 1000);
}
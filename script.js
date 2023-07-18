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
let currentUser;

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
const loanAmt = document.getElementById('loan-amt');
const closeUser = document.getElementById('close-user');
const closePassword = document.getElementById('close-password');

let timeDisplay ; 
let balanceAmount = 0;
const bankInterestRate = 8;

const checkForCredentials = (userName, password) => {
  currentUser = users.find(
    each => userName === each?.userName && password === each?.password
  );
  if (currentUser) {
    // Showing account details and clearing login input's
    appContainer.style.opacity = 1;
    loginUser.value = '';
    loginPassword.value = '';

    // Showing appropriate greeting message
    currentDate = new Date();
    const currentHour = currentDate.getHours();
    const greeting = greetingsBasedOnHrs(currentHour);
    loginText.innerHTML = `${greeting}, ${currentUser?.name}`;

    // Changing date
    dateText.innerHTML = `As of ${currentDate.toLocaleDateString(
      'en-GB'
    )} <span id="current-time"><span>`;
    timeDisplay = document.getElementById('current-time');

    // sorting based on dates in descending order i.e farthest to nearest for rendering
    let statements = currentUser['statements'];
    statements.sort(function (a, b) {
      return new Date(a.date) - new Date(b.date);
    });
    
    renderingBankStatement(statements);
    calcSummaryAndDisplay(statements, currentUser?.interestRate);
    currentTime(timeDisplay);
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
  if (transferTo &&  transferAmt &&  transferTo !== currentUser?.userName ) {
    let transferringTo = (users || [])
                  .find( each => each?.userName === transferTo);
    
    if (Number(transferAmt) <= balanceAmount && transferringTo) {
      let statements = transferringTo.statements;
      let deposit = {
        type: 'Deposit',
        amount: Number(transferAmt),
        date: new Date().toLocaleDateString('en-GB'),
      };
      statements.push(deposit);
      statements = currentUser.statements;
      let withdraw = {
        type: 'Withdrawal',
        amount: Number(transferAmt),
        date: new Date().toLocaleDateString('en-GB'),
      };
      statements.push(withdraw);
      // sorting based on dates in descending order i.e farthest to nearest for rendering
      statements.sort(function (a, b) {
        return new Date(a.date) - new Date(b.date);
      });
      //rendering statement
      renderingBankStatement(statements);
      calcSummaryAndDisplay(statements, currentUser?.interestRate);
    } else if (!transferringTo) {
      alert('No such user found to transfer : ' + transferTo);
    } else {
      alert('Not sufficient balance');
    }
    transferToInput.value = '';
    transferAmtInput.value = '';
  }else if (transferTo === currentUser?.userName){
    alert("Can't transfer money to yourself");
  } else {
    alert('Enter proper values');
  }
});

closeBtn.addEventListener('click', e => {
  e.preventDefault();
  let userName = closeUser.value;
  let password = closePassword.value;
  let userToRemove = users.find(
    each => userName === each?.userName && password === each?.password
  );
  if(userToRemove && userToRemove?.userName === currentUser?.userName){
    users.splice(users.findIndex(each => each.userName === currentUser.userName) , 1);
    appContainer.style.opacity = 0;
  }else if(userToRemove?.userName !== currentUser?.userName){
    alert("You cant close other people account's")
  }else{
    alert('Bad credentials');
  }
  closeUser.value = '';
  closePassword.value = '';
});

loanBtn.addEventListener('click', e => {
  e.preventDefault();
  let loanAmount =  loanAmt.value;
  if(loanAmount){
    let statements = currentUser.statements;
    let loaned = {
      type: 'Deposit',
      amount: Number(loanAmount),
      date: new Date().toLocaleDateString('en-GB'),
    };
    statements.push(loaned);
    renderingBankStatement(statements);
    calcSummaryAndDisplay(statements, currentUser?.interestRate);
  }else{
    alert('No loan amount entered');
  }
  loanAmt.value = '';
});

const renderingBankStatement = statements => {
  let positiveCount = 1;
  let negativeCount = 1;
  statement.innerHTML = '';
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
    let date = stringToDate(each?.date, 'dd/MM/yyyy', '/').toLocaleDateString(
      'en-GB'
    );
    if (date !== currentDate.toLocaleDateString('en-GB')) {
      statementDays.innerHTML = `${calcDaysFromCurrentDate(each?.date)} Days ago`;
    } else {
      statementDays.innerHTML = `Today`;
    }
    const statementAmt = document.createElement('span');
    statementAmt.className = 'statement-amount';
    statementAmt.innerHTML = `${each?.amount}€`;
    statementRow.appendChild(statmentType);
    statementRow.appendChild(statementDays);
    statementRow.appendChild(statementAmt);
    statement.prepend(statementRow);
  });
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

  const interestAmt = depositAmt * ((interestRate || bankInterestRate) / 100);
  deposit.innerHTML = `${depositAmt}€`;
  withdrawals.innerHTML = `${withdrawalAmt}€`;
  interest.innerHTML = `${interestAmt}€`;
  balanceAmount = depositAmt + interestAmt - withdrawalAmt;
  acctBalance.innerHTML = `${balanceAmount}€`;
};

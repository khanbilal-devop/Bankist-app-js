// App inital data

const user1 = {
  name: 'Khan Ahmed',
  userName: 'khan10',
  password: '123456',
  statements: [
    {
      type: 'Deposit',
      amount: 1000,
      date: new Date('Jul 12 2022').toLocaleString(),
    },
  ],
  interestRate: 1.5,
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
      date: new Date('Jul 12 2022').toLocaleString(),
    },
  ],
  interestRate: 1.5,
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
      date: new Date('Jul 12 2022').toLocaleString(),
    },
  ],
  interestRate: 1.5,
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
      date: new Date('Jul 12 2022').toLocaleString(),
    },
  ],
  interestRate: 1.5,
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

const checkForCredentials = (userName, password) => {
  const user = users.find(
    each => userName === each?.userName && password === each?.password
  );
  if(user){
    appContainer.style.opacity = 1;
    loginUser.value = '';
    loginPassword.value = '';
    currentDate = new Date();
    const currentHour = currentDate.getHours();
    const greeting =  currentHour < 17 ? (currentHour < 12 ? 'Good morning': 'Good afternoon') : 'Good evening';
    loginText.innerHTML = `${greeting}, ${user?.name}`;
  }
};

loginBtn.addEventListener('click', () => {
  const userName = loginUser?.value;
  const password = loginPassword?.value;
  checkForCredentials(userName, password);
});

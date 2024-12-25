
const results = [
    { name: 'sumit', score: 85 },
    { name: 'Bob', score: 69 },
    { name: 'rotviller', score: 92 },
    { name: 'jay', score: 52 },
    { name: 'jyot', score: 33 },
    { name: 'russian', score: 20 },
    { name: 'darshan', score: 85 }
  ];
  
 
  function toggleForm(formType) {
    if (formType === 'signup') {
      document.getElementById('login-form').style.display = 'none';
      document.getElementById('signup-form').style.display = 'block';
    } else {
      document.getElementById('login-form').style.display = 'block';
      document.getElementById('signup-form').style.display = 'none';
    }
  }
  
  
  function signup() {
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    
    if (!email || !password) {
      document.getElementById('signup-error').textContent = 'Please fill all fields';
      return;
    }
  
    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      document.getElementById('signup-error').textContent = 'User already exists';
      return;
    }
  
    users.push({ email, password });
    localStorage.setItem('users', JSON.stringify(users));
  
    alert('Sign-up successful! You can now log in.');
    toggleForm('login');
  }

  function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    if (!email || !password) {
      document.getElementById('login-error').textContent = 'Please fill all fields';
      return;
    }
  
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === email && user.password === password);
    
    if (user) {
   
      localStorage.setItem('currentUser', JSON.stringify(user));
      showResultPage();
    } else {
      document.getElementById('login-error').textContent = 'Invalid credentials';
    }
  }
  
 
  function showResultPage() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!currentUser) {
      window.location.href = '/';
      return;
    }
  
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('signup-form').style.display = 'none';
    document.getElementById('result-page').style.display = 'block';
  

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '<ul>';
    results.forEach(result => {
      resultsDiv.innerHTML += `<li>${result.name}: ${result.score}</li>`;
    });
    resultsDiv.innerHTML += '</ul>';
  }

  function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = '/';
  }
  
 
  window.onload = function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (currentUser) {
      showResultPage();
    } else {
      document.getElementById('login-form').style.display = 'block';
    }
  };
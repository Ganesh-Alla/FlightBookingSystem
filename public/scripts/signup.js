document.addEventListener('DOMContentLoaded', function() {
document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    
    var signupUsername = document.getElementById('signupUsername').value;
    var signupPassword = document.getElementById('signupPassword').value;
  
    var signupData = {
      username: signupUsername,
      password: signupPassword
    };
  
    fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(signupData)
    })
    .then(function(response) {
      if (response.status === 201) {
        window.location.href = '/';
        return response.json();  
      } else {
        return response.json(); 
      }
    })
      .then(function(data) {
        if (data.error) {
          alert(data.error); 
        } else {
          alert(data.message); 
        }
      })
      .catch(function(error) {
  console.error('Error:', error);
  alert('An error occurred: ' + error.message);
});
  });
});
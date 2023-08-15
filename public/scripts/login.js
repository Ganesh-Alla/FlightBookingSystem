
        document.addEventListener('DOMContentLoaded', function() {
            document.getElementById('loginForm').addEventListener('submit', function(event) {
                event.preventDefault(); 
              
                var loginUsername = document.getElementById('loginUsername').value;
                var loginPassword = document.getElementById('loginPassword').value;
              
                var loginData = {
                  username: loginUsername,
                  password: loginPassword
                };
              
                fetch('/login', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(loginData)
                })
                .then(function(response) {
                    if (response.status === 200) {
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
                    alert('An error occurred');
                });
            });
        });
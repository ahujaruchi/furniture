document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('query-form').addEventListener('submit', function (e) {
    e.preventDefault(); // prevent form from reloading the page

    if (!validateForm()) return;

   const form = document.getElementById('query-form');
   const formData = new FormData(form);

    fetch('./send.php', {
      method: 'POST',
      body: formData
    })
     .then(response => response.text()) // Expecting plain text response from PHP
        .then(data => {
            alert(data); // Display the message from the PHP script
            form.reset(); // Clear the form after successful submission
        })
        .catch(error => {
            alert("An error occurred: " + error.message);
        });
  });
});

function validateForm() {
    let formSubmittion = document.getElementById('query-form');
    let firstName = document.getElementById('firstName');
    let lastName = document.getElementById('lastName');
    let mobileNo = document.getElementById('phoneNo');
    let message = document.getElementById('message');
    let firstNameError = document.getElementById('firstNameError');
    let lastNameError = document.getElementById('lastNameError');
    let mobileNoError = document.getElementById('mobileNoError');
    let messageError = document.getElementById('messageError');

        let errorArray = [];
        if (firstNameError.innerHTML.trim() !== "") {
            firstNameError.innerHTML = "";
        }
        if (lastNameError.innerHTML.trim() !== "") {
            lastNameError.innerHTML = "";
        }
        if (mobileNoError.innerHTML.trim() !== "") {
            mobileNoError.innerHTML = "";
        }
        if (messageError.innerHTML.trim() !== "") {
            messageError.innerHTML = "";
        }

        console.log('firstName', firstName.value)

        if (!firstName.value.trim()) {
            console.log('firstName.trim()', firstName.value.trim())
            errorArray.push({ firstName: 'First Name is required Field' });
        } else if (!/^[A-Za-z]{3,}$/.test(firstName.value)) {
            errorArray.push({ firstName: 'Please enter a valid first name' });
        }

        if (!lastName.value.trim()) {
            errorArray.push({ lastName: 'Last Name is required Field' });
        } else if (!/^[A-Za-z]{3,}$/.test(lastName.value)) {
            errorArray.push({ lastName: 'Please enter a valid last name' });
        }
        console.log('est(mobileNo.value)', /^(.)\1{9}$/.test(mobileNo.value))

        if (!mobileNo.value.trim()) {
            errorArray.push({ mobileNo: 'Mobile No is required Field' });
        } else if(/^(.)\1{9}$/.test(mobileNo.value)) {
             errorArray.push({ mobileNo: 'Please enter a valid mobile No.' });
        }else if(!/^[6-9]\d{9}$/.test(mobileNo.value)) {
            errorArray.push({ mobileNo: 'Please enter a valid mobile No.' });
        }

        if (!message.value.trim()) {
            errorArray.push({ message: 'Message is required Field' });
        } else if (!/^[A-Za-z\s]{10,}$/.test(message.value)) {
            errorArray.push({ message: 'Please enter a valid message, Minimun 10 charaters' });
        }
    
        if(errorArray.length){
        errorArray.map(error => {
            const field = Object.keys(error)[0]; 
            const errorMessage = Object.values(error)[0]; 
            console.log('error', field, `${field}Error`);

            const errorElement = document.getElementById(`${field}Error`);
            if (errorElement) {
                errorElement.innerText = errorMessage;
            } else {
                console.warn(`Element with id "${field}Error" not found`);
            }
        });
        return false;
    }else{
        return true;
    }
}
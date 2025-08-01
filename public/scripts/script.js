document.getElementById('add-person-form').addEventListener('submit', function(event) {
    // Get the input values
    const nome = document.getElementById('name').value;
    const endereco = document.getElementById('address').value;
    const email = document.getElementById('email').value;

    // Get the email error message element
    const emailErrorElement = document.querySelector('.invalid-feedback[data-sb-feedback="email:email"]');
    const emailErrorMessage = emailErrorElement.textContent.trim();

    // Initialize a flag to track form validity
    let formIsValid = true;

    // Validate Nome
    if (nome.length > 40) {
        alert('Nome não pode exceder 40 caracteres');
        formIsValid = false;
    }

    // Validate Endereco
    if (endereco.length > 50) {
        alert('Endereço não pode exceder 50 caracteres');
        formIsValid = false;
    }

    // Validate Email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert(emailErrorMessage);
        formIsValid = false;
    }

    // If the form is not valid, prevent submission
    if (!formIsValid) {
        event.preventDefault();
    }
});

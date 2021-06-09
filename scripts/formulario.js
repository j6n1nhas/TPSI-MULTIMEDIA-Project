function mySubmitFunction(e){
    e.preventDefault();

    var lastName = document.getElementById("lname");
    var firstName = document.getElementById("fname");
    var mensagem = document.getElementById("subject");

    if(lastName.value == "" || firstName.value == "" || mensagem.value == ""){
        alert("Preencha todos os campos para enviar a mensagem");
    }
    else{
        alert ("Mensagem enviada com sucesso!");
    }

    return false;
}
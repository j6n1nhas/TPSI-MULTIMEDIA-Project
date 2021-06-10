function mySubmitFunction(e){
    e.preventDefault();

    var firstName = document.getElementById("fname");
    var contact = document.getElementById("contact");
    var mensagem = document.getElementById("subject");

    if(firstName.value == "" || contact.value == "" || mensagem.value == ""){
        alert("Preencha todos os campos para enviar uma mensagem!");
    }
    else{
        alert ("Mensagem enviada com sucesso!");
    }

    return false;
}
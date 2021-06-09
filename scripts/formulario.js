function mySubmitFuncion(e){
    e.preventDefault();

    var lastName = document.getElementById("lname");
    var firstName = document.getElementById("fname");
    var mensagem = document.getElementById("subject");

    if(lastName.innerHTML == ""){
        alert("Preencha todos os campos!");
    }
    if(firstName.innerHTML == ""){
        alert("Preencha todos os campos!");
    }
    if(mensagem.innerHTML == ""){
        alert("Preencha todos os campos");
    }

    else{
        alert ("Mensagem submetida com sucesso!");
    }

    return false;
}
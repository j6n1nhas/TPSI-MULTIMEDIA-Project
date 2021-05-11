//Descobrimos que dia é hoje
const data_hoje = new Date();
//Transformamos em string no formato: "YYYY-MM-DD"
const hoje_str = data_em_string(data_hoje);

//Fazemos o mesmo processo para definir uma data máxima admissível (30 dias)
const data_limite = new Date();
data_limite.setDate(data_hoje.getDate() + 60);
const limite_str = data_em_string(data_limite);

//Atribuimos o valor min e max ao elemento de data
const elemento_data = document.querySelector('input[type="date"]');
elemento_data.min = hoje_str;
elemento_data.value = hoje_str;
elemento_data.max = limite_str;

function data_em_string(data)
{   //Recebe um objeto Date e devolve uma string no formato YYYY-MM-DD
    const retorno = (data.getFullYear() * 10000 + (data.getMonth() + 1) * 100 + data.getDate()).toString();
    return retorno.substr(0, 4) + "-" + retorno.substr(4, 2) + "-" + retorno.substr(6);
}



//VALIDAÇÃO DO FORMULÁRIO

const elemento_numero_pessoas = document.getElementById("formulario").querySelectorAll('input[type="number"]');
for(let element of elemento_numero_pessoas)
{
    element.oninput = () =>
    {
        const validade = element.validity;
        if(!element.checkValidity())
        {
            if(validade.rangeOverflow || validade.rangeUnderflow)
                element.setCustomValidity(`Não são admitidas menos de ${element.min} nem mais que ${element.max} ${element.name}`);
            if(validade.badInput)
                element.setCustomValidity("Só são permitidos números");
            else
                element.setCustomValidity("");
        }
        else
            element.setCustomValidity("");
    }
}

const elemento_telefone = document.getElementById("form_telefone");
elemento_telefone.oninput = (event) =>
{
    const validade_telefone = event.target.validity;
    if(!event.target.checkValidity())
    {
        if(validade_telefone.patternMismatch)
            event.target.setCustomValidity(`O telefone é constituído por 9 dígitos e tem de começar por 2 ou 91, 92, 93 ou 96`);
        else
            event.target.setCustomValidity("");
    }
    else
        event.target.setCustomValidity("");
}

form_data.addEventListener("change", function()
{
    dispor_horas();
});

// Função para definir as horas mínimas admissíveis no caso de ser escolhida a data atual
function dispor_horas()
{
    const data_la = new Date(form_data.value);
    if(data_la.getDate() == data_hoje.getDate() && data_la.getMonth() == data_hoje.getMonth())
    {
        let intervalo_min = new Date()
        intervalo_min.setMinutes(intervalo_min.getMinutes() + 30);
        intervalo_min = (intervalo_min.getHours()*100 + intervalo_min.getMinutes()).toString();
        intervalo_min = intervalo_min.substr(0, 2) + ":" + intervalo_min.substr(2);
        form_horas.min = intervalo_min;
    }
    else
    {
        form_horas.min = "11:00";
        form_horas.max = "21:30";
    }
}

function receber_reserva(element)
{
    event.preventDefault();
    const elemento_agenda = document.getElementById("agendamentos");
    const elemento_lista_agenda = document.getElementById("lista_agendamentos");
    let opcao = document.createElement("option");
    opcao.name = "agenda";
    opcao.value = elemento_agenda.childElementCount+1;
    opcao.text = "Agendamento " + opcao.value;
    elemento_agenda.appendChild(opcao);
    elemento_agenda.style = "box-shadow: 0 0 3px 1px red;";
    setTimeout(() =>
    {
        elemento_agenda.style = "";
    }, 1000);
    const labels = document.getElementById("formulario").querySelectorAll("label");
    const inputs = document.getElementById("formulario").querySelectorAll("input, select");
    for(let index=0; index<labels.length; index++)
    {
        const dt = document.createElement("dt");
        const dd = document.createElement("dd");
        dt.textContent = labels[index].textContent;
        dd.textContent = inputs[index].value;
        elemento_lista_agenda.appendChild(dt);
        elemento_lista_agenda.appendChild(dd);
    }
}


window.onload = () =>
{
    dispor_horas();
}
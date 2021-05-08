//Descobrimos que dia é hoje
const data_hoje = new Date();
//Transformamos em string no formato: "YYYYMMDD"
let hoje_str = data_em_string(data_hoje);
//Colocamos em formato YYYY-MM-DD para poder ser associado ao valor min e max da data no HTML
hoje_str = hoje_str.substr(0, 4) + "-" + hoje_str.substr(4, 2) + "-" + hoje_str.substr(6);

//Fazemos o mesmo processo para definir uma data máxima admissível (30 dias)
const data_limite = new Date();
data_limite.setDate(data_hoje.getDate() + 60);
let limite_str = data_em_string(data_limite);
limite_str = limite_str.substr(0, 4) + "-" + limite_str.substr(4, 2) + "-" + limite_str.substr(6);

//Atribuimos o valor min e max ao elemento de data
const elemento_data = document.querySelector('input[type="date"]');
elemento_data.min = hoje_str;
elemento_data.value = hoje_str;
elemento_data.max = limite_str;

function data_em_string(data)
{   //Recebe um objeto Date e devolve uma string no formato YYYYMMDD
    const retorno = (data.getFullYear() * 10000 + (data.getMonth() + 1) * 100 + data.getDate()).toString();
    return retorno;
}


//Validação do formulário
const elemento_numero_pessoas = document.getElementById("formulario").querySelectorAll('input[type="number"]');
for(let element of elemento_numero_pessoas)
{
    element.onfocus = () =>
    {
        element.setCustomValidity("");
    }
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
elemento_telefone.onfocus = (event) =>
{
    event.target.setCustomValidity("");
}
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

function receber_formulario(element)
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

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
const elemento_horas = document.querySelector('input[type="time"]');

function data_em_string(data)
{   //Recebe um objeto Date e devolve uma string no formato YYYY-MM-DD
    const retorno = (data.getFullYear() * 10000 + (data.getMonth() + 1) * 100 + data.getDate()).toString();
    return retorno.substr(0, 4) + "-" + retorno.substr(4, 2) + "-" + retorno.substr(6);
}

window.onload = () => {
    let dia_semana = data_hoje.getDay();
    const limite_inf_horas = 9;
    let limite_sup_horas;
    // Definir o limite de horas consoante o dia atual
    (dia_semana == 6 || dia_semana == 0) ? limite_sup_horas = 14 : limite_sup_horas = 19;
    if(data_hoje.getHours() >= limite_sup_horas || (data_hoje.getHours() == limite_sup_horas - 1 && data_hoje.getMinutes() >= 30))
    {   // Neste caso, já passou da hora de fecho do restaurante ou estamos a menos de meia hora do fecho
        swal("Já não é possível fazer reservas para hoje", `O restaurante hoje fecha às ${limite_sup_horas}:00 e não é possível fazer marcações a partir das ${limite_sup_horas-1}:30`, 'warning', {
            closeOnClickOutside: false,
            closeOnEsc: false,
            timer: 2000,
        });
        let d = new Date();
        d.setDate(data_hoje.getDate()+1);
        d = data_em_string(d);
        elemento_data.value = d;
        elemento_data.min = d;
    }
    else
    {   // Caso contrário, ainda temos o restaurante aberto
        elemento_data.value = data_em_string(data_hoje);
        elemento_data.min = data_em_string(data_hoje);
        elemento_horas.min = data_hoje.getHours() + ":" + data_hoje.getMinutes();
        elemento_horas.max = limite_sup_horas - 1 + ":30";
    }
    //O limite máximo é sempre de um mês
    elemento_data.max = limite_str;
    elemento_horas.max = limite_sup_horas-1 + ":30";
}

// EventHandler para a modificação do elemento_data
elemento_data.addEventListener("change", function() {
    horas_disponiveis();
    const data_la = new Date(this.value);
    if(data_la.getDate() == data_hoje.getDate())
        elemento_horas.min = data_hoje.getHours() + ":" + parseInt(data_hoje.getMinutes()) + 30;
    else
        elemento_horas.min = "9:00";
    elemento_horas.value = "";
});

// EventHandler para a modificação do elemento_horas
elemento_horas.addEventListener("change", function() {
    horas_disponiveis();
});

// Função para definir as horas disponíveis consoante o dia da semana escolhido no elemento_data
function horas_disponiveis()
{
    const dia_semana = parseInt(new Date(elemento_data.value).getDay());
    let limite_sup_horas;
    (dia_semana == 6 || dia_semana == 0) ? limite_sup_horas = 13 : limite_sup_horas = 18;
    elemento_horas.max = limite_sup_horas + ":30";
}

//VALIDAÇÃO DO FORMULÁRIO

const elemento_numero_pessoas = document.getElementById("reservas").querySelectorAll('input[type="number"]');
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
        let intervalo_min = new Date();
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
    let texto = `Recebido agendamento:\n\nNome: ${form_nome.value}\n
    Telefone: ${form_telefone.value}\nE-mail: ${form_email.value}\n
    ${form_pessoas.value} pessoas no total e ${form_criancas.value} crianças\n
    O tipo de evento é ${form_tipo.value} e está agendado para ${form_data.value}
     às ${form_horas.value}.`;
    alert(texto);
    element.submit();
}

//Descobrimos que dia é hoje
const data_hoje = new Date();
//Transformamos em string no formato: "YYYY-MM-DD"
const hoje_str = data_em_string(data_hoje);
const horas_agora = data_hoje.getHours();

//Fazemos o mesmo processo para definir uma data máxima admissível (30 dias)
const data_limite = new Date();
data_limite.setDate(data_hoje.getDate() + 30);
const limite_str = data_em_string(data_limite);

//Atribuimos uma variavel a cada elemento de data e hora
const elemento_data = document.getElementById("form_data");
const elemento_horas = document.getElementById("form_horas");
const elemento_minutos = document.getElementById("form_minutos");

//Elemento para escolher o prato
const pratos = formulario.form_pratos;

const menus = new Object();
menus["2afeira"] = {
    "Carne": "Bifes de frango com cogumelos",
    "Peixe": "Salmão grelhado",
    "Especialidade": "Quiche de espinafres e queijo",
};
menus["3afeira"] = {
    "Carne": "Strogonoff de peru",
    "Peixe": "Bacalhau com natas",
    "Especialidade": "Bolonhesa vegetariana",
};
menus["4afeira"] = {
    "Carne": "Secretos de porco preto",
    "Peixe": "Lasanha de atum",
    "Especialidade": "Caril de grão e legumes",
};
menus["5afeira"] = {
    "Carne": "Arroz de pato",
    "Peixe": "Solha frita com arroz de tomate",
    "Especialidade": "Wrap de falafel",
};
menus["6afeira"] = {
    "Carne": "Lasanha de courgette com frango",
    "Peixe": "Linguini de camarão",
    "Especialidade": "Alho francês à brás",
};
menus["sabado"] = {
    "Carne": "Esparguete carbonara",
    "Peixe": "Pescada de fricassé",
    "Especialidade": "Burguer de quinoa",
};
menus["domingo"] = {
    "Carne": "Almôndegas de vitela",
    "Peixe": "Bife de atum de cebolada",
    "Especialidade": "Chili vegetariano",
};

//Atribuimos o valor min e max ao elemento de data
if(data_hoje.getHours() >= 19)
{
    //Se a hora atual passar das 19h, definimos a data mínima para o dia seguinte
    let d = new Date();
    d.setDate(data_hoje.getDate() + 1);
    d = data_em_string(d);
    elemento_data.min = d;
    elemento_data.value = d;
}
else
{
    //Caso contrário, a data mínima é a atual
    elemento_data.min = hoje_str;
    elemento_data.value = hoje_str;
}
//O limite máximo é sempre de um mês
elemento_data.max = limite_str;


//Função para devolver um objeto Date no formato YYYY-MM-DD em conformidade com os valores recebidos pelas tags HTML
function data_em_string(data)
{   //Recebe um objeto Date e devolve uma string no formato YYYY-MM-DD
    let retorno = (data.getFullYear() * 10000 + (data.getMonth() + 1) * 100 + data.getDate()).toString();
    return retorno.substr(0, 4) + "-" + retorno.substr(4, 2) + "-" + retorno.substr(6);
}

//Função para colocar os pratos do dia no elemento select HTML
function dispor_pratos()
{
    const data_la = new Date(elemento_data.value);
    let a = new Array();
    opts = form_pratos.children;
    switch(data_la.getDay())
    {
        case 0:
            a = Object.keys(menus["domingo"]);
            for(let i=0; i<opts.length; i++)
            {
                opts[i].value = menus["domingo"][a[i]];
                opts[i].textContent = menus["domingo"][a[i]];
            }
            break;
        case 1:
            a = Object.keys(menus["2afeira"]);
            for(let i=0; i<opts.length; i++)
            {
                opts[i].value = menus["2afeira"][a[i]];
                opts[i].textContent = menus["2afeira"][a[i]];
            }
            break;
        case 2:
            a = Object.keys(menus["3afeira"]);
            for(let i=0; i<opts.length; i++)
            {
                opts[i].value = menus["3afeira"][a[i]];
                opts[i].textContent = menus["3afeira"][a[i]];
            }
            break;
        case 3:
            a = Object.keys(menus["4afeira"]);
            for(let i=0; i<opts.length; i++)
            {
                opts[i].value = menus["4afeira"][a[i]];
                opts[i].textContent = menus["4afeira"][a[i]];
            }
            break;
        case 4:
            a = Object.keys(menus["5afeira"]);
            for(let i=0; i<opts.length; i++)
            {
                opts[i].value = menus["5afeira"][a[i]];
                opts[i].textContent = menus["5afeira"][a[i]];
            }
            break;
        case 5:
            a = Object.keys(menus["6afeira"]);
            for(let i=0; i<opts.length; i++)
            {
                opts[i].value = menus["6afeira"][a[i]];
                opts[i].textContent = menus["6afeira"][a[i]];
            }
            break;
        case 6:
            a = Object.keys(menus["sabado"]);
            for(let i=0; i<opts.length; i++)
            {
                opts[i].value = menus["sabado"][a[i]];
                opts[i].textContent = menus["sabado"][a[i]];
            }
            break;
    }
}

function dispor_horas(data_la)
{
    if(data_la.getDate() == data_hoje.getDate())
    {
        //Se a data escolhida for o dia de hoje
        for(let item of form_horas.children)
        {
            //Para todas as horas disponíveis (que são elementos HTML filhas do elemento form_horas)
            if(item.value < data_hoje.getHours())
            {
                //Se a hora no elemento option em causa for menor do que a hora atual, vamos desativá-la e escondê-la
                item.disabled = true;
                item.hidden = true;
            }
            else if(item.value == data_hoje.getHours() && data_hoje.getMinutes() >= 50)
            {
                item.disabled = true;
                item.hidden = true;
            }
        }
        for(let item of form_horas.children)
        {
            if(!item.hidden)
            {
                item.selected = true;
                break;
            }
        }
        if(form_horas.value == data_hoje.getHours())
        {
            for(let item of form_minutos.children)
            {
                if(item.value < data_hoje.getMinutes())
                {
                    item.disabled = true;
                    item.hidden = true;
                }
                else
                {
                    item.disabled = false;
                    item.hidden = false;
                    item.selected = true;
                    break;
                }
            }
        }
        /*
        for(let item of form_minutos.children)
        {
            if(item.value <= data_hoje.getMinutes())
            {
                item.disable;
                item.hidden = true;
            }
        }
        for(let item of form_minutos.children)
        {
            if(!item.hidden)
            {
                item.selected = true;
                break;
            }
        }
        */
    }
    //Se for outro dia qualquer, então temos de nos certificar que as horas estão todas visíveis
    else
    {
        //Para cada elemento filho do nosso elemento form_horas
        for(let item of form_horas.children)
        {
            //Ativamo-lo e deixamo-lo visível
            item.disabled = false;
            item.hidden = false;
        }
        for(let item of form_horas.children)
        {
            if(!item.hidden)
            {
                item.selected = true;
                break;
            }
        }
        for(let item of form_minutos.children)
        {
            item.disabled = false;
            item.hidden = false;
        }
        for(let item of form_minutos.children)
        {
            if(!item.hidden)
            {
                item.selected = true;
                break;
            }
        }
    }
    if(data_la.getDay() == 0 || data_la.getDay() == 6)
    {
        for(let item of form_horas.children)
        {
            if(item.value > 13)
            {
                item.disabled = true;
                item.hidden = true;
            }
        }
    }
    else
    {
        for(let item of form_horas.children)
        {
            item.disabled = false;
            item.hidden = false;
        }
    }
}


//Garantir que quando escolhemos o dia de hoje e a hora atual, não apareçam minutos inferiores aos atuais
elemento_horas.addEventListener("change", function()
{
    const data_la = new Date(elemento_data.value);
    const hora_la = this.value;
    if(data_la.getDate() == data_hoje.getDate() && data_hoje.getHours() == hora_la)
    {
        for(let item of form_minutos.children)
        {
            if(item.value < data_hoje.getMinutes())
            {
                item.disabled = true;
                item.hidden = true;
            }
            else
            {
                item.disabled = false;
                item.hidden = false;
            }
        }
        for(let item of form_minutos.children)
        {
            if(!item.hidden)
            {
                item.selected = true;
                break;
            }
        }
    }
    else
    {
        for(let item of form_minutos.children)
        {
            item.disabled = false;
            item.hidden = false;
        }
        for(let item of form_minutos.children)
        {
            if(!item.hidden)
            {
                item.selected = true;
                break;
            }
        }
    }
});

// O que acontece quando o elemento data muda
elemento_data.onchange = function()
{
    //Captamos a data que está escolhida numa variável
    const data_la = new Date(this.value);
    dispor_horas(data_la);
    dispor_pratos();
}

const take_delivery = formulario.take_delivery;
for(let item of take_delivery)
{
    item.addEventListener("change", function()
    {
        if(this.value == "delivery")
        {
            formulario.morada.disabled = false;
            formulario.morada.hidden = false;
            formulario.morada.previousElementSibling.hidden = false;
        }
        else
        {
            formulario.morada.disabled = true;
            formulario.morada.hidden = true;
            formulario.morada.previousElementSibling.hidden = true;
        }
    });
}

document.getElementById("form_adicionar").addEventListener("click", () =>
{
    //Bloquear campos
    for(let item of document.querySelectorAll("form>div input, form>div select"))
    {
        item.disabled = true;
        item.readOnly = true;
    }
    //Mostrar a tabela e acrescentar items a esta
    form_encomenda.hidden = false;
    const pratos = formulario.form_pratos;
    const encomenda = document.getElementsByTagName("tbody")[0];
    const linhas = document.querySelectorAll("tbody>tr");
    let found = false;
    for(let item of linhas)
    {
        if(pratos.value == item.firstChild.textContent)
        {
            item.lastChild.textContent = parseInt(item.lastChild.textContent) + 1;
            found = true;
        }
    }
    if(!found)
    {
        const linha = document.createElement("tr");
        const celula1 = document.createElement("td");
        const celula2 = document.createElement("td");
        celula2.style = "text-align: center;";
        celula1.textContent = pratos.value;
        celula2.textContent = 1;
        linha.appendChild(celula1);
        linha.appendChild(celula2);
        encomenda.appendChild(linha);
    }
});


//VALIDAÇÃO DO FORMULÁRIO
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

function receber_encomenda(element)
{
    event.preventDefault();
    const final_form = new FormData(element);
    for(let i of final_form)
        console.log("Item: " + i);
}

window.onload = () =>
{
    dispor_pratos();
    dispor_horas(new Date(elemento_data.value));
}

function recebe_isto(element)
{
    const final_form = new FormData(element);
    console.log(final_form);
    for(let item of final_form)
        console.log("Item: " + item);
}
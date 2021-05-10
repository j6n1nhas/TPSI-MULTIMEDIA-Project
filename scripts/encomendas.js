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
    "Carne": "Feijoada à transmontana",
    "Peixe": "Dourada grelhada",
    "Especialidade": "Sopa da pedra",
};
menus["3afeira"] = {
    "Carne": "Frango no churrasco",
    "Peixe": "Jaquinzinhos com arroz de tomate",
    "Especialidade": "Bochechas",
};
menus["4afeira"] = {
    "Carne": "Vitela estufada",
    "Peixe": "Bacalhau cozido",
    "Especialidade": "Chocos grelhados",
};
menus["5afeira"] = {
    "Carne": "Esparguete à bolonhesa",
    "Peixe": "Solha frita",
    "Especialidade": "Cozido à portuguesa",
};
menus["6afeira"] = {
    "Carne": "Dobrada com feijão branco",
    "Peixe": "Peixe cozido",
    "Especialidade": "Açorda de ovas",
};
menus["sabado"] = {
    "Carne": "Esparguete à bolonhesa",
    "Peixe": "Pescada de fricassé",
    "Especialidade": "Pernil no forno",
};
menus["domingo"] = {
    "Carne": "Grelhada mista",
    "Peixe": "Robalo grelhado",
    "Especialidade": "Espetada de gambas",
};

//Atribuimos o valor min e max ao elemento de data
if(data_hoje.getHours() >= 22)
{
    //Se a hora atual passar das 22h, definimos a data mínima para o dia seguinte
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


// O que acontece quando o elemento minutos muda
elemento_minutos.onchange = () =>
{
    //Captamos a data que está escolhida numa variável
    const data_la = new Date(elemento_data.value);
    //Se a data escolhida for hoje
    if(data_la.getDate() == data_hoje.getDate())
    {
        //Se as horas escolhidas forem iguais às atuais e os minutos estiverem abaixo dos minutos atuais
        if(elemento_horas.value == data_hoje.getHours() && elemento_minutos.value < data_hoje.getMinutes())
            elemento_minutos.setCustomValidity("Essa hora já passou");
        else
            elemento_minutos.setCustomValidity("");
    }
}


// O que acontece quando o elemento data muda
elemento_data.onchange = () =>
{
    //Captamos a data que está escolhida numa variável
    const data_la = new Date(elemento_data.value);
    if(data_la.getDate() == data_hoje.getDate())
    {
        //Se a data escolhida for o dia de hoje
        for(let item of form_horas.children)
        {
            //Para todas as horas disponíveis (que são elementos HTML filhas do elemento form_horas)
            if(item.value < data_hoje.getHours())
            {
                //Se a hora no elemento option em causa for menor do que a hora atual, vamos desativá-la e escondê-la
                item.disable;
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
    }
    //Se for outro dia qualquer, então temos de nos certificar que as horas estão todas visíveis
    else
    {
        //Para cada elemento filho do nosso elemento form_horas
        for(let item of form_horas.children)
        {
            //Ativamo-lo e deixamo-lo visível
            item.disable = false;
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
    }
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
{}

window.onload = () =>
{
    console.info("Data hoje: " + data_hoje);
    console.info("São " + horas_agora + " horas");
    dispor_pratos();
}
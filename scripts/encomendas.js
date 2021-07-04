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
const pratos = encomendas.form_pratos;

// Variável objeto para guardar os pratos diários
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

// Ao carregar página...
window.onload = function() {
    let dia_semana = data_hoje.getDay();
    const limite_inf_horas = 9;
    let limite_sup_horas;
    // Definir o limite de horas consoante o dia atual
    (dia_semana == 6 || dia_semana == 0) ? limite_sup_horas = 14 : limite_sup_horas = 19;
    if(data_hoje.getHours() >= limite_sup_horas)
    {   // Neste caso, já passou da hora de fecho do restaurante
        swal("Restaurante fechado", `O restaurante hoje fechou às ${limite_sup_horas}:00`, 'warning', {
            closeOnClickOutside: false,
            closeOnEsc: false,
            timer: 2000,
        });
        let d = new Date();
        d.setDate(data_hoje.getDate()+1);
        let ds = data_em_string(d);
        elemento_data.value = ds;
        elemento_data.min = ds;
        horas_disponiveis();
    }
    else
    {   // Caso contrário, ainda temos o restaurante aberto
        elemento_data.value = data_em_string(data_hoje);
        elemento_data.min = data_em_string(data_hoje);
        horas_disponiveis();
        for(let item of elemento_horas.children)
        {   // Vamos esconder as horas que forem inferiores à hora atual ou se na hora atual já estamos a menos de 10 minutos da próxima hora
            if(item.value < data_hoje.getHours() || (item.value == data_hoje.getHours() && data_hoje.getMinutes() >= 50))
            {
                item.hidden = true;
                item.disabled = true;
            }
        }
        for(let item of elemento_horas.children)
        {   // E vamos deixar escolhida a primeira hora disponível
            if(!item.hidden)
            {
                item.selected = true;
                break;
            }
        }
        for(let item of elemento_minutos.children)
        {   // Esconder os minutos que já passaram caso estivermos a menos de 10 minutos da próxima hora
            if(data_hoje.getMinutes() < 50)
            {
                if(item.value <= data_hoje.getMinutes())
                {
                    item.hidden = true;
                    item.disabled = true;
                }
            }
            else
            {   // Se estivermos a menos de 10 minutos da próxima hora, a hora escolhida será a próxima e então devemos deixar visíveis todos os minutos
                item.disabled = false;
                item.hidden = false;
            }
        }
        for(let item of elemento_minutos.children)
        {
            if(!item.hidden)
            {
                item.selected = true;
                break;
            }
        }
    }
    dispor_pratos();
    //O limite máximo é sempre de um mês
    elemento_data.max = limite_str;
}

// Função para definir as horas disponíveis consoante o dia da semana escolhido no elemento_data
function horas_disponiveis()
{
    const dia_semana = parseInt(new Date(elemento_data.value).getDay());
    let limite_sup_horas;
    (dia_semana == 6 || dia_semana == 0) ? limite_sup_horas = 14 : limite_sup_horas = 19;
    for(let item of elemento_horas.children)
    {
        if(item.value > limite_sup_horas)
        {
            item.disabled = true;
            item.hidden = true;
        }
    }
}

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

// EventHandler para a modificação do elemento_data
elemento_data.addEventListener('change', function() {
    horas_disponiveis();
    dispor_pratos();
    if(new Date(this.value).getDate() == data_hoje.getDate())
    {   // Se a data escolhida for o dia de hoje
        for(let item of elemento_horas.children)
        {   // Escondemos todas as horas que já passaram e a atual caso já estejamos a menos de 10 minutos da próxima hora
            if(item.value < data_hoje.getHours() || (item.value == data_hoje.getHours() && data_hoje.getMinutes() >= 50))
            {
                item.disabled = true;
                item.hidden = true;
            }
        }
        for(let item of elemento_horas.children)
        {   // Deixamos escolhida a primeira hora que estiver visível
            if(!item.hidden)
            {
                item.selected = true;
                break;
            }
        }
        for(let item of elemento_minutos.children)
        {   // Para os minutos, se estiverem abaixo dos 50 minutos, escondem-se todos os menores que os atuais
            if(data_hoje.getMinutes() < 50)
            {
                if(item.value <= data_hoje.getMinutes())
                {
                    item.disabled = true;
                    item.hidden = true;
                }
            }
            else
            {   // Caso contrário, disponibilizam-se todos porque quer dizer que a hora que está escolhida é a próxima
                item.disabled = false;
                item.hidden = false;
            }
        }
        for(let item of elemento_minutos.children)
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
        for(let item of elemento_horas.children)
        {
            item.disabled = false;
            item.hidden = false;
        }
        for(let item of elemento_horas.children)
        {
            if(!item.hidden)
            {
                item.selected = true;
                break;
            }
        }
        for(let item of elemento_minutos.children)
        {
            item.disabled = false;
            item.hidden = false;
        }
        for(let item of elemento_minutos.children)
        {
            if(!item.hidden)
            {
                item.selected = true;
                break;
            }
        }
    }
});

// EventHandler para a modificação do elemento_horas
elemento_horas.addEventListener('change', function() {
    horas_disponiveis();
    if(new Date(elemento_data.value).getDate() == data_hoje.getDate())
    {   // Se a data escolhida for a de hoje
        if(this.value == data_hoje.getHours())
        {   // Se a hora escolhida for a atual, temos de esconder os minutos que já passaram
            for(let item of elemento_minutos.children)
            {
                if(item.value <= data_hoje.getMinutes())
                {
                    item.disabled = true;
                    item.hidden = true;
                }
            }
            for(let item of elemento_minutos.children)
            {   // E deixamos selecionado o primeiro elemento de minutos que esteja visível
                if(!item.hidden)
                {
                    item.selected = true;
                    break;
                }
            }
        }
        else
        {   // Se a hora escolhida for qualquer outra, os minutos têm de ficar todos visíveis
            for(let item of elemento_minutos.children)
            {
                item.disabled = false;
                item.hidden = false;
            }
            for(let item of elemento_minutos.children)
            {   // E deixamos escolhido o primeiro elemento visível
                if(!item.hidden)
                {
                    item.selected = true;
                    break;
                }
            }
        }
    }
    else
    {
        for(let item of elemento_minutos.children)
        {
            item.disabled = false;
            item.hidden = false;
        }
        for(let item of elemento_minutos.children)
        {
            if(!item.hidden)
            {
                item.selected = true;
                break;
            }
        }
    }
});


const take_delivery = encomendas.take_delivery;
for(let item of take_delivery)
{
    item.addEventListener("change", function()
    {
        if(this.value == "delivery")
        {
            encomendas.morada.disabled = false;
            encomendas.morada.hidden = false;
            encomendas.morada.required = true;
            encomendas.morada.previousElementSibling.hidden = false;
        }
        else
        {
            encomendas.morada.disabled = true;
            encomendas.morada.hidden = true;
            encomendas.morada.required = false;
            encomendas.morada.previousElementSibling.hidden = true;
        }
    });
}

document.getElementById("form_adicionar").addEventListener("click", () =>
{
    //Bloquear campos
    for(let item of document.querySelectorAll("form>fieldset>input"))
    {
        console.log(item);
        item.readOnly = true;
        item.disabled = true;
    }
    for(let item of document.querySelectorAll("form>fieldset>select"))
    {
        for(let i of item.children)
        {
            if(!i.selected)
                i.disabled = true;
        }
    }
    //Mostrar a tabela e acrescentar items a esta
    form_encomenda.hidden = false;
    const pratos = encomendas.form_pratos;
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

function recebe_isto()
{
    for(let item of document.querySelectorAll("form>fieldset>input"))
    {
        console.log(item);
        item.disabled = false;
        item.readOnly = false;
    }
    const final_form = new FormData(element);
}

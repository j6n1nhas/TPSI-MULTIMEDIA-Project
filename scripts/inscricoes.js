let today;
// Obter os elementos de link para os dias
let elementos = document.getElementsByClassName("diaInscrever");

for(let elemt of elementos)
    elemt.onclick = inscrever;

// Classe criada para representar cada dia da lista de marcações
class Dia {
    constructor() {
        this.elemento = null; // Vai receber o elemento HTML
        this.dia_semana = 0; // Vai representar o dia da semana (0-Domingo...6-Sábado)
        this.data = new Date(); // Objeto Date correspondente ao dia escolhido
        this.data_string = null; // A data em string pronta a gravar na base de dados
        this.monta_data = function ()
        { // Função para construir a data pronta para SQL a partir do atributo data
            let ano = this.data.getFullYear();
            let mes = parseInt(this.data.getMonth(), 10) + 1;
            let dia = this.data.getDate();
            return ano + '-' + mes + '-' + dia;
        };
    }
}

function inscrever(event)
{
    myCookie = arrumarCookies();
    let dias = new Array();
    let dia_semana = today.getDay();
    if(checkCookie('utilizador'))
    {
        let control = dia_semana; // Variável de controlo
        let mais_um_dia = 60000*60*24; // Valor de milisegundos correspondente a um dia
        let tempo_acrescentar = 0;
        switch(dia_semana)
        {
            case 0:
                control++;
                tempo_acrescentar = 60000*60*24;
                for(let item of elementos)
                {
                    let resultado = new Dia(); // Crio um objeto do tipo Dia
                    resultado.elemento = document.getElementById(item.id); // Defino o elemento DOM correspondente
                    resultado.dia_semana = control; // Defino o dia da semana associado à variável de controlo
                    resultado.data = new Date(today.getTime() + tempo_acrescentar);
                    resultado.data_string = resultado.monta_data(); // Método para gerar a data "SQL-format"
                    dias.push(resultado); // Adiciono o dia ao array
                    control++; // Avanço com a variável de controlo
                    tempo_acrescentar = mais_um_dia * control; // E avanço com o valor de milisegundos a acrescentar
                }
                break;
            case 1:
                for(let item of elementos)
                {
                    let resultado = new Dia(); // Crio um objeto do tipo Dia
                    resultado.elemento = document.getElementById(item.id); // Defino o elemento DOM correspondente
                    resultado.dia_semana = control; // Defino o dia da semana associado à variável de controlo
                    resultado.data = new Date(today.getTime() + tempo_acrescentar);
                    resultado.data_string = resultado.monta_data(); // Método para gerar a data "SQL-format"
                    dias.push(resultado); // Adiciono o dia ao array
                    tempo_acrescentar = mais_um_dia * control; // E avanço com o valor de milisegundos a acrescentar
                    control++; // Avanço com a variável de controlo
                }
                break;
            case 2: // A partir destes casos, ordeno os dias a partir do dia atual
                elementos = new Array();
                elementos.push(document.getElementById("terca"));
                elementos.push(document.getElementById("quarta"));
                elementos.push(document.getElementById("quinta"));
                elementos.push(document.getElementById("sexta"));
                elementos.push(document.getElementById("sabado"));
                elementos.push(document.getElementById("segunda"));
                elementos.forEach((item) =>
                {
                    let resultado = new Dia(); // Crio um objeto do tipo Dia
                    resultado.elemento = document.getElementById(item.id);
                    if(control > 6)
                    {
                        resultado.dia_semana = 1;
                        tempo_acrescentar = mais_um_dia * (control - 1);
                        resultado.data = new Date(today.getTime() + tempo_acrescentar)
                    }
                    else
                    {
                        resultado.dia_semana = control;
                        tempo_acrescentar = mais_um_dia * (control - 2);
                        resultado.data = new Date(today.getTime() + tempo_acrescentar);
                        control++;
                    }
                    resultado.data_string = resultado.monta_data(); // Método para gerar a data "SQL-format"
                    dias.push(resultado);
                });
                break;
            case 3:
                elementos = new Array();
                elementos.push(document.getElementById("quarta"));
                elementos.push(document.getElementById("quinta"));
                elementos.push(document.getElementById("sexta"));
                elementos.push(document.getElementById("sabado"));
                elementos.push(document.getElementById("segunda"));
                elementos.push(document.getElementById("terca"));
                elementos.forEach((item) =>
                {
                    let resultado = new Dia(); // Crio um objeto do tipo Dia
                    resultado.elemento = document.getElementById(item.id);
                    if(control == 7)
                        control = 1;
                    if(control >= dia_semana)
                        resultado.data = new Date(today.getTime() + mais_um_dia * (control-dia_semana));
                    else
                        resultado.data = new Date(today.getTime() + mais_um_dia * (control+4));
                    resultado.dia_semana = control;
                    control++;
                    resultado.data_string = resultado.monta_data(); // Método para gerar a data "SQL-format"
                    dias.push(resultado);
                });
                break;
            case 4:
                elementos = new Array();
                elementos.push(document.getElementById("quinta"));
                elementos.push(document.getElementById("sexta"));
                elementos.push(document.getElementById("sabado"));
                elementos.push(document.getElementById("segunda"));
                elementos.push(document.getElementById("terca"));
                elementos.push(document.getElementById("quarta"));
                elementos.forEach((item) =>
                {
                    let resultado = new Dia(); // Crio um objeto do tipo Dia
                    resultado.elemento = document.getElementById(item.id);
                    if(control == 7)
                        control = 1;
                    if(control >= dia_semana)
                        resultado.data = new Date(today.getTime() + mais_um_dia * (control-dia_semana));
                    else
                        resultado.data = new Date(today.getTime() + mais_um_dia * (control+3));
                    resultado.dia_semana = control;
                    control++;
                    resultado.data_string = resultado.monta_data(); // Método para gerar a data "SQL-format"
                    dias.push(resultado);
                });
                break;
            case 5:
                elementos = new Array();
                elementos.push(document.getElementById("sexta"));
                elementos.push(document.getElementById("sabado"));
                elementos.push(document.getElementById("segunda"));
                elementos.push(document.getElementById("terca"));
                elementos.push(document.getElementById("quarta"));
                elementos.push(document.getElementById("quinta"));
                elementos.forEach((item) =>
                {
                    let resultado = new Dia(); // Crio um objeto do tipo Dia
                    resultado.elemento = document.getElementById(item.id);
                    if(control == 7)
                        control = 1;
                    if(control >= dia_semana)
                        resultado.data = new Date(today.getTime() + mais_um_dia * (control-dia_semana));
                    else
                        resultado.data = new Date(today.getTime() + mais_um_dia * (control+2));
                    resultado.dia_semana = control;
                    control++;
                    resultado.data_string = resultado.monta_data(); // Método para gerar a data "SQL-format"
                    dias.push(resultado);
                });
                break;
            case 6:
                elementos = new Array();
                elementos.push(document.getElementById("sabado"));
                elementos.push(document.getElementById("segunda"));
                elementos.push(document.getElementById("terca"));
                elementos.push(document.getElementById("quarta"));
                elementos.push(document.getElementById("quinta"));
                elementos.push(document.getElementById("sexta"));
                elementos.forEach((item) =>
                {
                    let resultado = new Dia(); // Crio um objeto do tipo Dia
                    resultado.elemento = document.getElementById(item.id);
                    if(control == 7)
                        control = 1;
                    if(control >= dia_semana)
                        resultado.data = new Date(today.getTime() + mais_um_dia * (control-dia_semana));
                    else
                        resultado.data = new Date(today.getTime() + mais_um_dia * (control+1));
                    resultado.dia_semana = control;
                    control++;
                    resultado.data_string = resultado.monta_data(); // Método para gerar a data "SQL-format"
                    dias.push(resultado);
                });
                break;
        }
        let data_workshop = "";
        for(let item of dias)
        {
            if(item.elemento == event.target)
            {
                if(item.dia_semana == today.getDay() && today.getHours() > 18)
                { // A partir das 18 horas já não é possível marcar para o próprio dia
                    swal("WORKSHOP", "Já não é possível efetuar marcações para hoje!", "error");
                    return;
                }
                data_workshop = item.data_string;
            }
        }
        const area = document.querySelector('.cta-inner');
        const area_children = area.querySelector('ul');
        area_children.remove();
        const formulario = document.querySelector("#form-inscricao");

        for(let item of formulario)
        {
            console.log(item);
            item.oninput = validar_inscricao;
        }

        formulario.onsubmit = marcar_workshop;
        formulario.hidden = false;
        const url = "get_userdata.php";
        const param = {
            user_data: myCookie['utilizador'],
        }
        get_server(url, param).then((response) => {
            if(response.header == 200)
            {
                swal(response.dados.resultado, response.dados.body, "success");
                formulario.username.value = response.dados.registo.username;
                formulario.nome.value = response.dados.registo.nome;
                formulario.contacto.value = response.dados.registo.contacto;
                formulario.workshop.value = data_workshop;
            }
            else
                swal(response.dados.resultado, response.dados.body, "error");
        });
    }
    else
    {
        swal("Utilizador não autenticado", "Tens de fazer login primeiro", "error")
        .then((value) =>
        {
            if(value)
                window.location.href = "workshop.html";
        });
    }
}

function validar_inscricao()
{
    const formulario = document.querySelector("#form-inscricao");
    const nome = formulario.nome;
    const telefone = formulario.contacto;
    const validadeNome = nome.validity;
    const validadeTelefone = telefone.validity;
    if(validadeNome.patternMismatch)
    {
        const validadeNumeros = new RegExp("[0-9]");
        const validadeNumerica = nome.value.match(validadeNumeros);
        if(validadeNumerica)
            nome.setCustomValidity("O nome não pode conter números");
        else
            nome.setCustomValidity("Nome inválido");
    }
    else if(validadeNome.valueMissing)
        nome.setCustomValidity("O nome tem de ser preenchido");
    else if(validadeNome.customError)
        nome.setCustomValidity("");
    if(validadeTelefone.tooShort)
    {
        const validadeCarateres = new RegExp("[^0-9]");
        if(telefone.value.match(validadeCarateres))
            telefone.setCustomValidity("O telefone não pode conter carateres não numéricos");
        else
            telefone.setCustomValidity(`São precisos ${telefone.maxLength} números. Só tens escrito ${telefone.value.length}`);
    }
    else if(validadeTelefone.patternMismatch)
    {
        if(isNaN(telefone.value))
            telefone.setCustomValidity("O telefone apenas admite números");
        else
        {
            const validadeIndicativos = new RegExp("^[2|9]");
            if(telefone.value.match(validadeIndicativos))
                telefone.setCustomValidity("O telefone tem de começar por 2 ou 9");
        }
    }
    else if(validadeTelefone.valueMissing)
        telefone.setCustomValidity("O telefone tem de ser preenchido");
    else if(validadeTelefone.customError)
        telefone.setCustomValidity("");
}

function marcar_workshop(event)
{
    event.preventDefault();
    myCookie = arrumarCookies();
    if(checkCookie("utilizador"))
    {
        const formulario = new FormData(event.target);
        const url = "inscrever.php";
        post_server(url, formulario).then((response)=>
        {
            if(response.header == 200)
            {
                swal(response.dados.resultado, response.dados.body, "success")
                .then(() => window.location.href = response.headers.get("location"));
            }
            else
                swal(response.dados.resultado, response.dados.body, "error");
        });
    }
    else
    {
        swal("Erro", "Não estás autenticado neste momento", "warning",
        {
            closeOnClickOutside: false,
            closeOnEsc: false,
        }).then((value) =>
        {
            if(value == true)
                window.location.href = "workshop.html";
        });
    }
}

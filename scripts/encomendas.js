//Descobrimos que dia é hoje
const data_hoje = new Date();
//Transformamos em string no formato: "YYYYMMDD"
let hoje_str = data_em_string(data_hoje);
//Colocamos em formato YYYY-MM-DD para poder ser associado ao valor min e max da data no HTML
hoje_str = hoje_str.substr(0, 4) + "-" + hoje_str.substr(4, 2) + "-" + hoje_str.substr(6);

//Fazemos o mesmo processo para definir uma data máxima admissível (30 dias)
const data_limite = new Date();
data_limite.setDate(data_hoje.getDate() + 30);
let limite_str = data_em_string(data_limite);
limite_str = limite_str.substr(0, 4) + "-" + limite_str.substr(4, 2) + "-" + limite_str.substr(6);

//Atribuimos o valor min e max ao elemento de data
const elemento_data = document.querySelector('input[type="date"]');
elemento_data.min = hoje_str;
elemento_data.value = hoje_str;
elemento_data.max = limite_str;

function data_em_string(data)
{
    const retorno = (data.getFullYear() * 10000 + (data.getMonth() + 1) * 100 + data.getDate()).toString();
    return retorno;
}


//Permite ao utilizador escolher o método de seleção da data para a reserva
for(const item of formulario.metodo)
{
    item.onclick = () =>
    {
        if(item.value=="data")
        {
            formulario.data_picker.hidden = false;
            formulario.day_picker.hidden = true;
        }
        else
        {
            formulario.data_picker.hidden = true;
            formulario.day_picker.hidden = false;
        }
    }
}


function encaixar_semana(event)
{
    let dias = new Array();
    let dia_semana = data_hoje.getDay();
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
}

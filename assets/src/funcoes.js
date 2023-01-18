"use stact";


// funcao select
let seletor = (e) => document.querySelector(e),
    getId = (e)=> document.getElementById(e);
    var items = localStorage;


function formulario(tipo)
{
    var form = document.createElement("div");
    eventoClose();
    switch (tipo) 
    {
        case "agenda":
            form.classList.add("form-agenda");
            form.innerHTML = ` <section class="formulario fc" id="form-agenda">
                        <h3>Nova agenda</h3> 
                        <div class="group">
                            <div class="input">    
                                <input type="text" placeholder="Digite seu titulo" id="agenda" name="titulo"> 
                            </div> 
                            <div class="input">    
                                <input type="color" title="Escolha sua cor" id="cor" name="cor"> 
                            </div> 
                        </div>
                        <button onclick="cadastrar('agenda')">Salvar</button> 
                    </section>`;
                    break;
        default:
            form.classList.add("form-tarefa");
            form.setAttribute("id", "form-tarefa");
            form.innerHTML = ` <div class="formulario fc">
                <h3>Nova agenda</h3>
                <fieldset class="group none" style="--gr:1">
                <legend>Definir</legend>               
                

                <div class="group">
                    
                    <div class="input">
                        <input type="text" id="titulo" placeholder="Digite nome da tarefa" name="titulo">
                        </div> <div class="input">
                            <select name="agenda" id="seleciona_agenda">
                                <option value="" disabled selected>Seleciona agenda</option>;
                            </select>
                        </div>
                </div>
                    <div class="group none" style="--gr:2">
                        <div class="input">
                            <input type="datetime-local" name="data" id="data_agenda" title="Escolha a data da atividade">
                        </div>
            
            
                        <div class="input">
                            <select name="tipo" id="seleciona_tipo" title="Qual a importancia desta atividade?">
                                <option value="Normal" selected>Normal</option>
                                <option value="Importante">Importante</option>
                            </select>
                        </div>
                    </div>
                </fieldset>

                <div class="group none" style="--gr:1">
                    <div class="input">
                        <label for="">Mensagen</label>
                    <textarea placeholder="escreva sua mensagem" id="msg" cols="30" rows="10"></textarea>
                    </div>
                </div>

                <button onclick="cadastrar('tarefa')">Salvar</button>  </div>`;
                break;
            }
            
            form.classList.add("screen");
            document.body.appendChild(form);
            comboBox();
        eventoClose();
                
       
};

function eventoClose(){
    if(seletor(".screen") != null)
    {
        seletor(".screen").addEventListener("dblclick", function(e){
            modalClose();
        })
    }
}

function modalClose(){
    seletor(".screen").remove();
}


function shake(e, distance, time) { 

    if (typeof e === "string") e = document.getElementById(e);

    if (!e) e = "pagina"; 
    if (!time) time = 800; 
    if (!distance) distance = 8;
    var originalStyle = e.style.cssText; 
    e.style.position = "relative"; 
    var start = (new Date()).getTime();
    animate();
    
    function animate() {  
        var tempo = (new Date()).getTime(); 
        var velocidade = tempo-start; 
    
        var instante = velocidade/time;
        if (instante < 1) { 
            var x = distance * Math.sin(instante*4*Math.PI);   e.style.left = x + "px";
            setTimeout(animate, Math.min(25, time-velocidade)); 
        } 
         else {       
            e.style.cssText = originalStyle 
         } 
        } 
}


function cadastrar(valor)
{
    switch (valor) {
        case 'agenda':
                if(getId("agenda").value.length < 1)
                {
                     shake("form-agenda");
                }
                else
                {
                    agenda(getId("agenda").value, getId("cor").value);
                    modalClose();
                }
               
            break;
    
        default:
            if(getId("seleciona_agenda").value.length == 0 || getId("titulo").value.length < 1 || getId("data_agenda").value.length < 1)
            {
                 shake("form-tarefa");
            }
            else
            {
                var index, 
                data = 
                agenda = getId("seleciona_agenda").value;
    
                var items = JSON.parse(localStorage.getItem("agenda"));
                var registro =  items.filter(e=>{ return e.id == agenda});
                var l = [];
                l.push(...registro[0].tarefas);
                l.join("")
                l.push({
                    titulo: getId("titulo").value,
                    tipo: getId("seleciona_tipo").value,
                    data: getId("data_agenda").value,
                    smg: getId("msg").value

               });

               l.join("");

               registro[0].tarefas = l;

                items.forEach(e=>{
                    if(e.id == registro[0].id)
                    {
                        e = registro;
                    }
                })
                console.log(items);

                localStorage.setItem("agenda", JSON.stringify(items));

            }
            break;
    }
}



// lista itens agenda
function agenda(item, cor)
{
    if(!cor) cor = "#222332";
    var data = new Date();

    if(items.getItem("agenda") != null)
    {
        var lista = JSON.parse(items.getItem("agenda"));
        lista.push({
            id: lista.length+1,
            agenda: item,
            cor: cor,
            tarefas: [],
            data : data.getDay()+"/"+(data.getMonth()+1)+"/"+data.getFullYear()
        });
        items.setItem("agenda", JSON.stringify(lista));
        seletor(".items").append(Componente("div", item[0], cor));

    }
    else
    {
        // salva
        var db  = [{
            id: 1,
            agenda: item,
            cor: cor,
            tarefas: [],
            data : data.getDay()+"/"+data.getMonth()+"/"+data.getFullYear()
        }];
        items.setItem("agenda", JSON.stringify(db));
        seletor(".items").append(Componente("div", item[0]));
    }
}

function Componente(ele, valor, cor,id)
{
    if(cor == null) cor = "#222332";   
    var elemento = document.createElement(ele);
    elemento.classList.add("flex");
    elemento.innerText = valor;
    elemento.setAttribute("style", "--cor:"+cor);
    elemento.setAttribute("onclick", "Registro('"+id+"')");
    return elemento;
}

function carregar(){
    var agendas = localStorage.getItem("agenda");
    if(agendas != null)
    {
        agendas = JSON.parse(agendas);
        agendas.forEach(agenda => {
            seletor(".items").append(Componente("div", agenda.agenda[0], agenda.cor, agenda.id));
        });
    }
}

carregar();


function Registro(id = null)
{
    if((localStorage.getItem("agenda") == null && id == null))
    {
        seletor(".painel-msg").innerHTML =  `<div class="enveloper">
                        <i class="bi bi-env"  id="pagina"></i>
                        <h2>Sem registros na agenda</h2>
                    </div>`;
    }
    
    if(id != null)
    {
        let items = localStorage;
        items = JSON.parse(items.getItem("agenda"));
        var registro =  items.filter(e=>{return e.id == id});
        console.log(registro);

    }
}

Registro();

function comboBox()
{
    let  agendas = (JSON.parse(localStorage.getItem("agenda")) || []);
         agendas.forEach(agenda => {
        var    opcao = document.createElement("option");
            opcao.value = agenda.id;
            opcao.innerText = agenda.agenda;
            getId("seleciona_agenda").append(opcao);
        });

}


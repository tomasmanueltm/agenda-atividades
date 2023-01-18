"use stact";


// funcao select
let seletor = (e) => document.querySelector(e),
    getId = (e)=> document.getElementById(e);



function formulario(tipo)
{
    var form = document.createElement("div");
    eventoClose();
    switch (tipo) 
    {
        case "agenda":
            form.classList.add("form-agenda");
            form.innerHTML = ` <section class="formulario fc" id="form-agenda">
                        <h3>Nova agenda</h3> <div class="input">    
                        <input type="text" placeholder="Digite seu titulo" id="agenda" name="titulo"> 
                        </div> <button onclick="cadastrar('agenda')">Salvar</button> 
                    </section>`;
                    break;
        default:
            form.classList.add("form-tarefa");
            form.innerHTML = ` <form class="formulario fc">
                <h3>Nova agenda</h3>
                <fieldset class="group none" style="--gr:1">
                <legend>Definir</legend>               
                

                <div class="group">
                    
                    <div class="input">
                        <input type="text" placeholder="Digite nome da tarefa" name="titulo">
                        </div> <div class="input">
                            <select name="agenda" id="seleciona_agenda">
                                <option value="" disabled selected>Seleciona agenda</option>
                                <option value="">Profissional</option>
                                <option value="">Pessoal</option>
                                <option value="">Rotina</option>
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
                    <textarea name="" id="" cols="30" rows="10"></textarea>
                    </div>
                </div>

                <button>Salvar</button> </form>`;
               
            break;
        }

        form.classList.add("screen");
        document.body.appendChild(form);
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
                    agenda(getId("agenda").value);
                    modalClose();
                }
               
            break;
    
        default:

            break;
    }
}



// lista itens agenda
function agenda(item)
{
    var data = new Date();
    var items = localStorage;

    if(items.getItem("agenda") != null)
    {
        var lista = JSON.parse(items.getItem("agenda"));
        lista.push({
            agenda: item,
            data : data.getDay()+"/"+(data.getMonth()+1)+"/"+data.getFullYear()
        });
        items.setItem("agenda", JSON.stringify(lista));
    }
    else
    {
        // salva
        var db  = [{
            agenda: item,
            data : data.getDay()+"/"+data.getMonth()+"/"+data.getFullYear()
        }];
        items.setItem("agenda", JSON.stringify(db));
    }
}

window.onload = function(){
    var agendas = localStorage.getItem("agenda");
    if(agendas != null)
    {
        agendas = JSON.parse(agendas);
        agendas.forEach(agenda => {
        var div = document.createElement("div");
        div.classList.add("flex");
        div.setAttribute("style", "--cor:#ffc10e");

      
            div.innerText = agenda.agenda[0];
            seletor(".items").append(div)
            
        });
    }
}
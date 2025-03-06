addEventListener("DOMContentLoaded", setEvents);

function setEvents() {
    setAddTicketEvent();
    setDeleteTicketListEvent();
    setDropSpaceEvent();
    setStopEditEvent();
}

// Eventos
function setAddTicketEvent() {
    let addButtons = document.getElementsByClassName("crear-tarjeta");
    for (let button of addButtons) {
        button.addEventListener("click", addTicket);
    }
}

function setDeleteTicketListEvent() {
    let deleteButtons = document.getElementsByClassName("eliminar-lista");
    for (let button of deleteButtons) {
        button.addEventListener("click", deleteList);
    }
}

function setDropSpaceEvent() {
    let dropSpaces = document.getElementsByClassName("drop_space");
    for (let dropSpace of dropSpaces) {
        dropSpace.addEventListener("dragover", function(event) {
            event.preventDefault();
        });
        dropSpace.addEventListener("drop", drop);
    }
}

function setTicketEvents(ticket) {
    ticket.addEventListener("dblclick", edit);
    ticket.addEventListener("dragstart", function(event) {
        this.id = "dragging";
        event.dataTransfer.clearData();
        event.dataTransfer.setData("text/plain", this.id);
    })
}

function setStopEditEvent() {
    document.addEventListener("click", function(event) {
        let titles = document.querySelectorAll(".tarjeta h2");
        for (let title of titles) {
            stopEdit(title);
        }
    });
}

// Funciones
function addTicket() {
    let ticket = document.createElement("div");
    ticket.classList.add("tarjeta");
    ticket.innerHTML = `
        <h2>Nueva tarjeta</h2>
        <button>X</button>
    `;

    let deleteTicketButton = ticket.querySelector("button");
    deleteTicketButton.addEventListener("click", deleteTicket);

    ticket.draggable = true;
    setTicketEvents(ticket);

    // crear-tarjeta -> ticket_div
    this.previousElementSibling.append(ticket);
}

function edit() {
        let title = this.querySelector("h2")
        title.contentEditable = true;
        title.focus();
}

function stopEdit(title) {
    title.contentEditable = false;
    title.blur();
}

function deleteTicket() {

    // delete_ticket -> tarjeta
    this.parentElement.remove();
}

function deleteList() {

    // eleminar-lista -> crear-tarjeta -> ticket_div -> tarjetas
    this.previousElementSibling.previousElementSibling.innerHTML = "";
}

function drop(event) {
    event.preventDefault();
    
    let data = event.dataTransfer.getData("text");
    let ticket = document.getElementById(data);
    ticket.id = "";

    // drop_space -> lista -> ticket_div
    this.firstElementChild.querySelector("div").append(ticket);
}
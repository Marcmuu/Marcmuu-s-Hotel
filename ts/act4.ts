let arrayUsuaris: any[] = [];
let arrayRooms: any[] = [];
let arrayReserva: any[] = [];
let nombreUsuario:any


//recuperar usuaris i habitacions
if(localStorage.getItem("Usuaris")){
  let recuUsuaris:any = localStorage.getItem("Usuaris");
  arrayUsuaris = JSON.parse(recuUsuaris);
}

if(localStorage.getItem("Habitacions")){
  let recuHabitacions:any = localStorage.getItem("Habitacions");
  arrayRooms = JSON.parse(recuHabitacions);
}

if(localStorage.getItem("Reservas")){
  let recuReservas:any = localStorage.getItem("Reservas");
  arrayReserva = JSON.parse(recuReservas);
}

if(localStorage.getItem("Logged")){
  let recuUser:any = localStorage.getItem("Logged");
  nombreUsuario = JSON.parse(recuUser);
}


//Objecte usuari
class User {
  idUser: number;
  username: string;
  password: string;
  booked: any;

  constructor(nuevoUsername: string, nuevoPassword: string) {
    this.idUser = arrayUsuaris.length +1;
    this.username = nuevoUsername;
    this.password = nuevoPassword;
    this.booked = [];
  }

  bookRoom(idHabitacion:number){
    this.booked.push(idHabitacion);
  }

}

// posar els icones de les habitacions banys llits... per cada habitacio
//Objecte habitació
class Room{
  idRoom: number;
  nombre: string;
  img:string;
  desc:string;
  ocupada: boolean;
  llitMatrimoni: number;
  llitIndividual: number;
  balco: boolean;
  menjador: boolean;
  banys: number;

  constructor(newNombre: string, newImg:string, newDesc:string, newllitMatrimoni:number, newllitIndividual:number, newBalco:boolean, newMenjador:boolean, newBanys:number){
    this.idRoom = arrayRooms.length +1;
    this.nombre = newNombre;
    this.img = newImg;
    this.desc = newDesc;
    this.ocupada = false;
    this.llitMatrimoni = newllitMatrimoni;
    this.llitIndividual = newllitIndividual;
    this.balco = newBalco;
    this.menjador = newMenjador;
    this.banys = newBanys;
  }

  canviarEstat(){
    this.ocupada = true;
  }
}

//objecte reserva
class Reserva{
  idReserva: number;
  idUsuario: number;
  idHabitacion: number;
  nombreUser: string;
  nombreHabitacion: string;
  fechaEntradaReserva: string;
  fechaSalidaReserva:string;
  numeroPersonas:number;

  constructor(newIdUsuario:number, newIdHabitacion:number, newNombreUser:string, newNombreHabitacion:string, newFechaEntradaReserva:string, newFechaSalidaReserva:string, newNumeroPersonas:number){
    this.idReserva = arrayReserva.length +1;
    this.idUsuario = newIdUsuario;
    this.idHabitacion = newIdHabitacion;
    this.nombreUser = newNombreUser;
    this.nombreHabitacion = newNombreHabitacion;
    this.fechaEntradaReserva = newFechaEntradaReserva;
    this.fechaSalidaReserva = newFechaSalidaReserva;
    this.numeroPersonas = newNumeroPersonas;
  }
}


//Creacio de les habitacions
//Guardem les habitacions a un array amb el push
let couple:Room = new Room("Couple", "../img/hotel-1.jpg", "If you want some privacy with your couple, this is the best room.", 1, 0, true, false, 1);
arrayRooms.push(couple);

let urban:Room = new Room("Urban", "../img/hotel-2.jpg", "Huge room where you can invite your friends and have some fun.", 1, 0, false, true, 1);
arrayRooms.push(urban);

let city:Room = new Room("City", "../img/hotel-3.jpg", "A room you can be with a coworker and have a nice stay.", 0, 2, false, false, 2);
arrayRooms.push(city);

let luxury:Room = new Room("Luxury", "../img/hotel-4.jpg", "A standard room, well localted and a high level standing.", 1, 0, false, true, 2);
arrayRooms.push(luxury);

let clasic:Room = new Room("Clasic", "../img/hotel-5.jpg", "The best room to go with two wedding couples.", 2, 0, false, true, 1);
arrayRooms.push(clasic);

let lowCost:Room = new Room("Low Cost", "../img/hotel-6.jpg", "If you are looking for a low cost room, this is a very good option.", 0, 2, false, false, 0);
arrayRooms.push(lowCost);

let monarchy:Room = new Room("Monarchy", "../img/hotel-7.jpg", "A clasic room, it makes you feel confortable and calm.", 2, 0, true, true, 3);
arrayRooms.push(monarchy);

let dark:Room = new Room("Dark", "../img/hotel-8.jpg", "If you want a luxury room with unique details, this is your room.", 3, 0, true, true, 2);
arrayRooms.push(dark);

let simple:Room = new Room("Simple", "../img/hotel-9.jpg", "This room is simple and discreet.", 0, 2, true, false, 1);
arrayRooms.push(simple);


localStorage.setItem("Habitaciones", JSON.stringify(arrayRooms));

//per agafar informacio d'una habitacio (com per exemple el nom)
// console.log(arrayRooms[0].nombre);



function printRooms(){
  let rooms:any = document.getElementById("rooms");
  let print:any = "";

  for(let i:any = 0; i < arrayRooms.length; i++){
    print += `<div class="card bg-base-100 shadow-xl">`;
      print += `<figure><img src="${arrayRooms[i].img}" alt="hotel-1" class="h-60"/></figure>`;
        print += `<div class="card-body">`;
          print += `<h2 class="card-title">${arrayRooms[i].nombre}</h2>`;
            print += `<p>${arrayRooms[i].desc}</p>`;

            print += `<div><span></span></div>`;

            print += `<div class="card-actions justify-end">`;
              print += `<label for="my-modal" class="btn btn-primary" onclick="setHabitacion('${arrayRooms[i].idRoom}')">Book Now</label>`;
            print += `</div>`;
        print += `</div>`;
    print += `</div>`;
  }

  rooms.innerHTML = print;
}

function setHabitacion(habitacionID:string){
  let room:any;
  arrayRooms.forEach(element => {
    if(element.idRoom == parseInt(habitacionID)){
      room = element;
    }
  });
  localStorage.setItem("bookedRoom", JSON.stringify(room));
}

//Creem l'usuari (sign up)
function createUser() {
  var signUser: any = document.getElementById("signUser");
  var signPass: any = document.getElementById("signPass");

  let alertDatos: any = document.getElementById("alertDatos");
  let alertExiste: any = document.getElementById("alertExiste");

  if (signUser.value == "" || signPass.value == "") {
    alertDatos.classList.remove("hidden");
    setTimeout("alertDatos.classList.add('hidden')", 3000);
  } else {
    let usuari: User = new User(signUser.value, signPass.value);
    if (localStorage.getItem("Usuaris")) {
      let arrayLocal: any = localStorage.getItem("Usuaris");
      arrayUsuaris = JSON.parse(arrayLocal);
      arrayUsuaris.forEach((usuario) => {
        if (usuario.username == usuari.username) {
          alertExiste.classList.remove("hidden");
          setTimeout("alertExiste.classList.add('hidden')", 3000);
        }
      });
    }
    arrayUsuaris.push(usuari);
    localStorage.setItem("Usuaris", JSON.stringify(arrayUsuaris));
    setTimeout(() => (window.location.href = "../index.html"), 500);
  }
}

// Comparem els valors introduits al inici de sessio amb les dades que hi ha dels usuaris creats
function login() {
  let logUser: any = document.getElementById("logUsername");
  let logPass: any = document.getElementById("logPassword");
  let ok:boolean = false;
  let localUser: any = localStorage.getItem("Usuaris");

  arrayUsuaris = JSON.parse(localUser);
  arrayUsuaris.forEach((element) => {
    if (element.username == logUser.value && element.password == logPass.value) {
        ok = true;
        //Subir al localStorage el usuario que ha iniciado session.
        localStorage.setItem("Logged", JSON.stringify(element));
    }
  });

  if (ok) {
    window.location.href = "../html/home.html";
    // var alertLogin: any = document.getElementById("alertLogin");
    // alertLogin.classList.remove("hidden");
    // setTimeout(() => alertLogin.classList.add("hidden"), 3000);
  }else{
    alert("Username doesn't exist yet, sign up");
  }
}

//Posem el nom al desplegable del usuari
function ponerNombre(){
  let n:any = document.getElementById("n");
  let a:any = "";
  //guardamos en una varaible, la informacion que hay en el localStorge nombrado 
  let userLogged:any = localStorage.getItem("Logged");
  userLogged = JSON.parse(userLogged);
  
  // cogemos el nombre
  a += "Welcome, " + userLogged.username;

  n.innerHTML = a;
}

//Funcio per sortir de la web
function logout() {
  setTimeout(() => (window.location.href = "../index.html"), 500);
}

function search() {
  var entrada: any = document.getElementById("entrada");
  var salida: any = document.getElementById("salida");
  var fechaDeHoy:any = new Date();
  let reservas:any = localStorage.getItem("Reservas");
  reservas = JSON.parse(reservas);

  let wrong:boolean = false;

  const formatearFecha = fecha =>{
      const mes = fecha.getMonth() + 1; // Ja que els messos es conten desde el 0
      const dia = fecha.getDate();
      return `${fecha.getFullYear()}-${(mes < 10 ? '0' : '').concat(mes)}-${(dia < 10 ? '0' : '').concat(dia)}`;
  };

  var formatedDate:any = formatearFecha(fechaDeHoy);

  if(entrada.value < formatedDate){
    var alertError: any = document.getElementById("alertPassed");
    alertError.classList.remove("hidden");
    setTimeout(() => alertError.classList.add("hidden"), 3000);
    return
  }

  if(entrada.value == salida.value){
    alert("You can't choose the same say");
  }

  if (salida.value > entrada.value) {
    //reload de la paginas i funcion que compruebe si las habitaciones estan libres o no, y las vuelva a mostrar o quite las que estan reservadas
    printRoomsFiltrada(); 

  } else if(salida.value < entrada.value){
    var alertError: any = document.getElementById("alertError");
    alertError.classList.remove("hidden");
    setTimeout(() => alertError.classList.add("hidden"), 3000);
    return
  }
}

function ponerModal(){
  let ponerModal:any = document.getElementById("ponerModal");
  let print:any = "";

  print += `<input type="checkbox" id="my-modal" class="modal-toggle" />`;
  print += `<div class="modal">`;
    print += `<div class="modal-box">`;
    print += `<label for="my-modal" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>`;
      print += `<h3 class="font-bold text-lg">Choose for how many people do you want to book!</h3>`;
      print += `<p class="py-4">Important: max of two people</p>`;
      print += `<select name="numPers" id="numPers">`;
        print += `<option selected value="1" class="text-center">1 </option>`;
        print += `<option value="2" class="text-center">2</option>`;
      print += `</select>`;
      print += `<div class="modal-action">`;
        print += `<label for="my-modal" class="btn" onclick="reservar()">Confirm</label>`;
      print += `</div>`;
    print += `</div>`;
  print += `</div>`;

  ponerModal.innerHTML = print;
}

function reservar(){
  let numPers:any = document.getElementById("numPers");
  let userReserva:any = localStorage.getItem("Logged");
  userReserva = JSON.parse(userReserva);
  let habitacion:any = localStorage.getItem("bookedRoom");
  habitacion = JSON.parse(habitacion);
  var entrada: any = document.getElementById("entrada");
  var salida: any = document.getElementById("salida");

  let toastReserva: any = document.getElementById("toastRoom");

  let reserva: Reserva = new Reserva(userReserva.idUser, habitacion.idRoom, userReserva.username, habitacion.nombre, entrada.value, salida.value, numPers.value);

  arrayReserva.push(reserva);
  localStorage.setItem("Reservas", JSON.stringify(arrayReserva));

  toastReserva.classList.remove("hidden");
  setTimeout(() => toastReserva.classList.add("hidden"), 3000);

}

function printRoomsFiltrada(){
  let rooms:any = document.getElementById("rooms");
  let print:any = "";
  var entrada: any = document.getElementById("entrada");
  var salida: any = document.getElementById("salida");
  let valid:boolean = true;

  for(let i:any = 0; i < arrayRooms.length; i++){
    arrayReserva.forEach(element => {
      
      if(arrayRooms[i].idRoom == element.idHabitacion){
        console.log("son iguales")
        if((entrada.value >= element.fechaEntradaReserva && entrada.value <= element.fechaSalidaReserva) || (salida.value >= element.fechaEntradaReserva && salida.value <= element.fechaSalidaReserva)){
          console.log("mal")
          return valid = false;
        }
      }
    });

    if(valid){
      print += `<div class="card bg-base-100 shadow-xl">`;
            print += `<figure><img src="${arrayRooms[i].img}" alt="hotel-1" class="h-60"/></figure>`;
              print += `<div class="card-body">`;
                print += `<h2 class="card-title">${arrayRooms[i].nombre}</h2>`;
                print += `<p>${arrayRooms[i].desc}</p>`;

                print += `<div><span></span></div>`;

                print += `<div class="card-actions justify-end">`;
                  print += `<label for="my-modal" class="btn btn-primary" onclick="setHabitacion('${arrayRooms[i].idRoom}')">Book Now</label>`;
                print += `</div>`;
              print += `</div>`;
          print += `</div>`;
    }
    valid = true;
  }
  rooms.innerHTML = print;
}

function printReserves(){
  let printReserves:any = document.getElementById("printReserves");
  let print:any = "";
  let contador:any = 0;

  print += `<div class="overflow-x-auto">
  <table class="table w-full">
    
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Day of entry</th>
        <th>Day of exit</th>
      </tr>
    </thead>
    <tbody>`;

  arrayReserva.forEach(element => {
    if(element.idUsuario == nombreUsuario.idUser){
      contador++;
      print += `<tr>`;
        print += `<th>${contador}</th>`;
        print += `<td>${element.nombreHabitacion}</td>`;
        print += `<td>${element.fechaEntradaReserva}</td>`;
        print += `<td>${element.fechaSalidaReserva}</td>`;
      print += `</tr>`;
    }
  });

  print += `</tbody>
  </table>
</div>
</main>
</div>`;

  printReserves.innerHTML = print;
}
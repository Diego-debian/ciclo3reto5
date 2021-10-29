function obtenerItems(){

    $.ajax({
	url:"http://129.151.111.172:8080/api/Reservation/all",
	//url:"http://localhost:8080/api/Reservation/all",
	contentType: "application/json; charset=utf-8",
	dataType: 'json',
	type:'GET',
      
	success:function(response) {
	    console.log(response);
	    $("miResultado").empty();
	    let miTabla = '<table>';
	    for(i=0;i<response.length;i++){
                miTabla += '<tr>';
		miTabla += "<td>"+response[i].idReservation+"</td>";
		miTabla += "<td>"+response[i].startDate+"</td>";
		miTabla += "<td>"+response[i].devolutionDate+"</td>";
		miTabla += "<td>"+JSON.stringify(response[i].motorbike)+"</td>";
		miTabla += "<td>"+ JSON.stringify(response[i].client) +"</td>";
		miTabla +='<td><button onclick="obtenerItemEspecifico('+response[i].idReservation+')">Cargar</button></td>';
		miTabla +='<td><button onclick="DeleteItem('+response[i].idReservation+')">Delete item</button></td>';
        miTabla +='<td><button onclick="actualizarItem('+response[i].idReservation+')">Update item</button></td>';
		miTabla += "</tr>";
            }
          miTabla += '</table>';
          $("#miResultado").append(miTabla);
	    
	},
	
	error: function(jqXHR, textStatus, errorThrown) {
	    
	}
    });
}


function registro(){
    let var0 = {idClient:$("#Client").val()};
    let var1 = {id:$("#Motorbike").val()};
    let var2 = {
	startDate: $("#StarDate").val(),
	devolutionDate: $("#DevolutionDate").val(),
	client: var0,
	motorbike: var1
    };
    
    $.ajax({
	type:'POST',
	url:"http://129.151.111.172:8080/api/Reservation/save",
	//url:"http://localhost:8080/api/Reservation/save",
	contentType: "application/json; charset=utf-8",
	dataType: 'json',
	data: JSON.stringify(var2),
	
	success:function(response) {
            console.log(response);
	    console.log("Se guardo correctameente");
	    alert("Se guardo correctameente");
//	    window.location.reload()

	},
	
	error: function(jqXHR, textStatus, errorThrown) {
  //	    window.location.reload()
	    alert("No se guardo correctamente");
	}
    });

}



function obtenerItemEspecifico(idItem){
    $.ajax({
	url:"http://129.151.111.172:8080/api/Reservation/"+idItem,
	//url:"http://localhost:8080/api/Reservation/"+idItem,
	contentType: "application/json; charset=utf-8",
	dataType: 'json',
	type:'GET',
	success:function(response) {
	    alert("idReservation: " + response.idReservation + "\n"+
		  "startDate: " + response.startDate + "\n"+
		  "devolutionDate: " + response.devolutionDate + "\n"+
		  "client: "+ JSON.stringify(response.client) + "\n"+
		  "motorbike: " + JSON.stringify(response.motorbike)
		 );


	},
	error: function(jqXHR, textStatus, errorThrown) {
            
	}
    });   
}

function DeleteItem(idItem){
    let element1={
	id:idItem
    };
    var dataToSend=JSON.stringify(element1);
    //JSON= JavaScript Object Notation
    $.ajax({
	dataType:'json',
	data:dataToSend,
	url:"http://129.151.111.172:8080/api/Reservation/"+idItem,
	//url:"http://localhost:8080/api/Reservation/"+idItem,
	type:'DELETE',
	contentType:'application/json',
	success:function(response) {
            console.log(response);
	    window.location.reload()
	},
	error: function(jqXHR, textStatus, errorThrown) {

	}
    });
}

function actualizarItem(idItem){
    var startDateC = prompt("Please enter new start date(dd/mm/aaaa): \n") ;
    var devolutionDateC = prompt("Please enter new devolution date(dd/mm/aaaa): \n") ;
    var motorbikeC = prompt("Please enter new motorbikeID: \n") ;
    var clientID = prompt("Please enter new clientID: \n") ;
    let variablemoto = {id:motorbikeC};
    let variableclien = {id:clientID};

    var element2={
    id:idItem,
	startDate: startDateC,
	devolutionDate: devolutionDateC,
	motorbike: variablemoto,
	client: variableclien
    }
    var dataToSend=JSON.stringify(element2);
    //JSON= JavaScript Object Notation
    $.ajax({
	dataType: 'json',
	data:dataToSend,
	contentType:'application/json',
	//url:"http://localhost:8080/api/Motorbike/update",
	url:"http://129.151.111.172:8080/api/Reservation/update",
	type:'PUT',

	success:function(response) {
    console.log(response);
    alert("data changed: "+ dataToSend);
	    window.location.reload()

	},

	error: function(jqXHR, textStatus, errorThrown) {
    alert("error whit de update");

	}
    });

}


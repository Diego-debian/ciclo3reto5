function obtenerItems(){

    $.ajax({
	url:"http://129.151.111.172:8080/api/Message/all",
	//url:"http://localhost:8080/api/Message/all",
	contentType: "application/json; charset=utf-8",
	dataType: 'json',
	type:'GET',
      
	success:function(response) {
	    console.log(response);

	    $("miResultado").empty();
	    let miTabla = '<table>';
	    
            for(i=0;i<response.length;i++){
		miTabla += '<tr>';
		miTabla += "<td>"+response[i].idMessage+"</td>";
		miTabla += "<td>"+response[i].messageText+"</td>";
		miTabla += "<td>"+JSON.stringify(response[i].motorbike)+"</td>";
		miTabla += "<td>"+JSON.stringify(response[i].client)+"</td>";
		miTabla +='<td><button onclick="obtenerItemEspecifico('+response[i].idMessage+')">View item</button></td>';
		miTabla +='<td><button onclick="DeleteItem('+response[i].idMessage+')">Delete item</button></td>';
		miTabla +='<td><button onclick="actualizarItem('+response[i].idMessage+')">Update item</button></td>';

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
    let var0 = {idClient:$("#Mclient").val()};
    let var1 = {id:$("#Mmotorbike").val()};
    let var2 = {
	messageText:$("#MessageText").val(),
	client: var0,
	motorbike: var1
    };
    $.ajax({
	type:'POST',
	url:"http://129.151.111.172:8080/api/Message/save",
	//url:"http://localhost:8080/api/Message/save",
	contentType: "application/json;  charset=utf-8",
	dataType: 'json',
	data: JSON.stringify(var2),
	
	success:function(response) {
            console.log(response);
	    console.log("Se guardo correctameente");
	    alert("Se guardo correctameente");
	    window.location.reload();

	},
	
	error: function(jqXHR, textStatus, errorThrown) {
	    alert("No se guardo correctamente, revise que el cliente y la moto existan.");
	    window.location.reload();

	}
    });

}



function obtenerItemEspecifico(idItem){
    $.ajax({
	
	url:"http://129.151.111.172:8080/api/Message/"+idItem,
	//url:"http://localhost:8080/api/Message/"+idItem,
	contentType: "application/json; charset=utf-8",
	dataType: 'json',
	type:'GET',
	success:function(response) {
	    alert("idMessage: " + response.idMessage + "\n"+
		  "messageText: " + response.messageText + "\n"+
		  "motorbike: "+ JSON.stringify(response.motorbike) + "\n"+
		  "client: " + JSON.stringify(response.client)
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
	//url:"http://localhost:8080/api/Message/"+idItem,
	url: "http://129.151.111.172:8080/api/Client/"+idItem,
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
    var messageTextC = prompt("Please enter your new messageText: \n") ;
    var motorbikeID = prompt("Please enter new motorbikeId: \n") ;
    var clientID = prompt("Please enter new clientID: \n") ;
    let variablemoto = {id:motorbikeID};
    let variableclien = {id:clientID};


    var element2={
    idMessage:idItem,
	messageText: messageTextC,
	motorbike: variablemoto,
	client: variablemoto
    }
    var dataToSend=JSON.stringify(element2);
    //JSON= JavaScript Object Notation
    $.ajax({
	dataType: 'json',
	data:dataToSend,
	contentType:'application/json',
	//url:"http://localhost:8080/api/Client/update",
	url: "http://129.151.111.172:8080/api/Client/update"+idItem,
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

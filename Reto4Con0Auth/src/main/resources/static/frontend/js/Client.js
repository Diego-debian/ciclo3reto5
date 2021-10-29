
function registro(){
    let var2 = {
	name:$("#Cname").val(),
	email:$("#Cemail").val(),
	password:$('#Cpassword').val(),
	age:$("#Cage").val()
    };
    
    $.ajax({
	type:'POST',
	url:"http://129.151.111.172:8080/api/Client/save",
	//url:"http://localhost:8080/api/Client/save",

	contentType: "application/json; charset=utf-8",
	dataType: 'json',
	data: JSON.stringify(var2),
	
	success:function(response) {
            console.log(response);
	    console.log("Se guardo correctameente");
	    alert("Se guardo correctameente");
	    window.location.reload()
	},
	
	error: function(jqXHR, textStatus, errorThrown) {
	    alert("No se guardo correctamente");
  	    window.location.reload()
	}
    });

}

function obtenerItems(){

    $.ajax({
	url:"http://129.151.111.172:8080/api/Client/all",
	//url:"http://localhost:8080/api/Client/all",

	contentType: "application/json;  charset=utf-8",
	dataType: 'json',
	type:'GET',
      
	success:function(response) {
	    console.log(response);

	    $("miResultado").empty();
	    let miTabla = '<table>';
            for(i=0;i<response.length;i++){
                miTabla += '<tr>';
		miTabla += "<td>"+response[i].idClient+"</td>";
		miTabla += "<td>"+response[i].email+"</td>";
		miTabla += "<td>"+response[i].password+"</td>";
		miTabla += "<td>"+response[i].name+"</td>";
		miTabla += "<td>"+response[i].age+"</td>";
		miTabla += "<td>"+ JSON.stringify(response[i].messages) +"</td>";
		miTabla += "<td>"+ JSON.stringify(response[i].reservations) +"</td>";
		miTabla +='<td><button onclick="obtenerItemEspecifico('+response[i].idClient+')">View item</button></td>';
    	miTabla +='<td><button onclick="DeleteItem('+response[i].idClient+')">Delete item</button></td>';
		miTabla +='<td><button onclick="actualizarItem('+response[i].idClient+')">Update item</button></td>';

		miTabla += "</tr>";
            }	 
            miTabla += '</table>';
            $("#miResultado").append(miTabla);	
	},
	
	error: function(jqXHR, textStatus, errorThrown) {
	    
	}
    });
}



function obtenerItemEspecifico(idItem){
    $.ajax({
	
	url:"http://129.151.111.172:8080/api/Client/"+idItem,
	//url:"http://localhost:8080/api/Client/"+idItem,

	contentType: "application/json;  charset=utf-8",
	dataType: 'json',
	type:'GET',
	success:function(response) {
	    alert("idClient: " + response.idClient + "\n"+
		  "email: " + response.email + "\n"+
		  "password: "+ response.password + "\n"+
		  "name: " + response.name + "\n"+
		  "age: " + response.age + "\n"+
		  "message: " + JSON.stringify(response.messages) + "\n"+
		  "reservation: " + JSON.stringify(response.reservations)
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
	url: "http://129.151.111.172:8080/api/Client/"+idItem,
	//url:"http://localhost:8080/api/Client/"+idItem,
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
    var nameC = prompt("Please enter your new name: \n") ;
    var emailC = prompt("Please enter your new email \n");
    var passwordC = prompt("Please enter your new password \n");
    var ageC = prompt("Please enter your new age \n");

    var element2={
    idClient:idItem,
	name: nameC,
	email: emailC,
	password: passwordC,
	age: ageC
    }
    var dataToSend=JSON.stringify(element2);
    //JSON= JavaScript Object Notation
    $.ajax({
	dataType: 'json',
	data:dataToSend,
	contentType:'application/json',
	//url:"http://localhost:8080/api/Client/update",
	url: "http://129.151.111.172:8080/api/Client/update",
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

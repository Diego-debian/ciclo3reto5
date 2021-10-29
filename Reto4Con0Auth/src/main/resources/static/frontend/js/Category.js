
function registro(){
    let var2 = {
	name:$("#Cname").val(),
	description:$("#Cdescription").val()
    };
    $.ajax({
	type:'POST',
	/*
	* //	url:"http://localhost:8080/api/Category/save",
	*/
    url:"http://129.151.111.172:8080/api/Category/save",
	contentType: "application/json;  charset=utf-8",
	dataType: 'json',
	data: JSON.stringify(var2),
	
	success:function(response) {
            console.log(response);
	    console.log("Se guardo correctameente");
	    alert("Se guardo correctameente");
	    window.location.reload()

	},
	
	error: function(jqXHR, textStatus, errorThrown) {
  	    window.location.reload()
	    alert("No se guardo correctameente");


	}
    });

}

function obtenerItems(){

    $.ajax({
    /*
	* //url:"http://localhost:8080/api/Category/all",
	*/
	url:"http://129.151.111.172:8080/api/Category/all",
	contentType: "application/json;  charset=utf-8",
	dataType: 'json',
	type:'GET',
      
	success:function(response) {
	    console.log(response);

	    $("miResultado").empty();
	    let miTabla = '<table>';
            for(i=0;i<response.length;i++){
                miTabla += '<tr>';
		miTabla += "<td>"+response[i].id+"</td>";
		miTabla += "<td>"+response[i].name+"</td>";
		miTabla += "<td>"+response[i].description+"</td>";
		miTabla += "<td>"+ JSON.stringify(response[i].motorbikes) +"</td>";
		miTabla +='<td><button onclick="obtenerItemEspecifico('+response[i].id+')">View item</button></td>';
		miTabla +='<td><button onclick="DeleteItem('+response[i].id+')">Delete item</button></td>';
		miTabla +='<td><button onclick="actualizarItem('+response[i].id+')">Update item</button></td>';

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
	/*
	* //url:"http://localhost:8080/api/Category/"+idItem,
	*/
	url:"http://129.151.111.172:8080/api/Category/"+idItem,
	contentType: "application/json;  charset=utf-8",
	dataType: 'json',
	type:'GET',
	success:function(response) {
	    alert("id: " + response.id + "\n"+
		  "name: " + response.name + "\n"+
		  "description: "+ response.description + "\n"+
		  "motorbikes: " + JSON.stringify(response.motorbikes)
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
	//url:"http://localhost:8080/api/Category/"+idItem,
	url:"http://129.151.111.172:8080/api/Category/"+idItem,
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
    var descriptionC = prompt("Please enter your new message \n");

    var element2={
    id:idItem,
	description:descriptionC,
	name: nameC
    }
    var dataToSend=JSON.stringify(element2);
    //JSON= JavaScript Object Notation
    $.ajax({
	dataType: 'json',
	data:dataToSend,
	contentType:'application/json',
	//url:"http://localhost:8080/api/Category/update",
	url:"http://129.151.111.172:8080/api/Category/update",
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



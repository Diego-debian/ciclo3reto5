
function registro(){
    let variable = {id:$("#Ccategory").val()};
    let var2={
	    brand:$("#Cbrand").val(),
	    year:$("#Cyear").val(),
	    name:$("#Cname").val(),
	    description:$("#Cdescription").val(),
	    category: variable
    };
    $.ajax({
	type:'POST',
	url:"http://129.151.111.172:8080/api/Motorbike/save",
	//url:"http://localhost:8080/api/Motorbike/save",

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
	    alert("No se guardo correctameente, mire que las categorias esten bien");


	}
    });

}

function obtenerItems(){

    $.ajax({
	url:"http://129.151.111.172:8080/api/Motorbike/all",
	//url:"http://localhost:8080/api/Motorbike/all",

        
	contentType: "application/json; charset=utf-8",
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
		miTabla += "<td>"+response[i].brand+"</td>";
		miTabla += "<td>"+response[i].year+"</td>";
		miTabla += "<td>"+response[i].description+"</td>";
		miTabla += "<td>"+ JSON.stringify(response[i].category) +"</td>";
		miTabla += "<td>"+JSON.stringify(response[i].messages)+"</td>";	
		miTabla += "<td>"+JSON.stringify(response[i].reservations)+"</td>";
		miTabla +='<td><button onclick="obtenerItemEspecifico('+response[i].id+')">Cargar</button></td>';
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
	url:"http://129.151.111.172:8080/api/Motorbike/"+idItem,
	//url:"http://localhost:8080/api/Motorbike/"+idItem,
	contentType: "application/json",
	dataType: 'json',
	type:'GET',
	success:function(response) {
	    alert("id: " + response.id + "\n"+
		  "name: " + response.name + "\n"+
		  "brand: "+ response.brand + "\n"+
		  "year: " + response.year + "\n"+
		  "description: " + response.description + "\n"+
		  "category: " + JSON.stringify(response.category) + "\n"+
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
	url:"http://129.151.111.172:8080/api/Motorbike/"+idItem,
	//url:"http://localhost:8080/api/Motorbike/"+idItem,
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
    var brandC = prompt("Please enter your new brand: \n") ;
    var yearC = prompt("Please enter new year: \n") ;
    var categoryID = prompt("Please enter new category: \n") ;
    var nameC = prompt("Please enter your new name: \n") ;
    var descriptionC = prompt("Please enter new description: \n") ;
    let variable = {id:categoryID};

    var element2={
    id:idItem,
	name: nameC,
	brand: brandC,
	year: yearC,
	description: descriptionC,
	category: variable
    }
    var dataToSend=JSON.stringify(element2);
    //JSON= JavaScript Object Notation
    $.ajax({
	dataType:'json',
	data:dataToSend,
	contentType:'application/json',
	//url:"http://localhost:8080/api/Motorbike/update",
	url:"http://129.151.111.172:8080/api/Motorbike/update",
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

function traerInformacion(){
    $.ajax({
        url:"http://129.151.111.172:8080/api/Admin/all",
        type:"GET",
        datatype:"JSON",
        contentType: "application/json; charset=utf-8",

        success:function(respuesta){
            console.log(respuesta);
            $("#resultado").empty();
            pintarRespuesta(respuesta);
        },
        error : function(xhr, status) {
            alert('ha sucedido un problema:'+ status);
        }
    });
}

function pintarRespuesta(items){
    let myTable="<table>";
    myTable += '<th>' + "ID" + '</th>';
    myTable += '<th>' + "NOMBRE" + '</th>';
    myTable += '<th>' + "EMAIL" + '</th>';
    myTable += '<th>' + "EDITAR" + '</th>';
    myTable += '<th>' + "BORRAR" + '</th>';
    for (i = 0; i < items.length; i++) {
        myTable+="<tr>";
        myTable+="<td>"+items[i].idAdmin+"</td>";
        myTable+="<td>"+items[i].name+"</td>";
        myTable+="<td>"+items[i].email+"</td>";
        myTable+= "<td> <button onclick='editarRegistro("+items[i].idAdmin+")'>Editar</button>";
        myTable+= "<td> <button onclick='borrarElemento("+items[i].idAdmin+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado").append(myTable);
}

function guardarInformacion(){
    let myData={
        idAdmin:$("#idAdmin").val(),
        name:$("#name").val(),
        email:$("#email").val(),
        password:$("#password").val(),
    };
    let datosJson=JSON.stringify(myData);
    $.ajax(
        'http://129.151.111.172:8080/api/Admin/save',
        {data:datosJson,
        type:"POST",
        datatype:"json",
        contentType: "application/json; charset=utf-8",

        statusCode : {
            201 :  function() {
                alert("Se ha guardado.");
                $("#idAdmin").val(""),
                $("#name").val(""),
                $("#email").val(""),
                $("#password").val(""),
                traerInformacion();
            }
        }
        });
}

function editarRegistro(dato){
    $.ajax({
        url:'http://129.151.111.172:8080/api/Admin/'+dato,
        type:'GET',
        datatype:'JSON',
        contentType: "application/json; charset=utf-8",

        success:function(respuesta){
            console.log(respuesta+ "url" + "http://localhost/api/Admin/"+dato);
            let myTable = '<table>';
                $("#idAdmin").val(respuesta.idAdmin);
                $("#name").val(respuesta.name);
                $("#password").val(respuesta.password);
                $("#idAdmin").attr("readonly", true);
	    },
        error : function(xhr, status) {
            alert('ha sucedido un problema:'+ status);
        }
        });
}

function actualizarInformacion(){
    let myData={
        idAdmin:$("#idAdmin").val(),
        name:$("#name").val(),
        password:$("#password").val(),
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax(
        'http://129.151.111.172:8080/api/Admin/update',
        {data: dataToSend,
        type:'PUT',
        datatype:'JSON',
        contentType: "application/json; charset=utf-8",

        statusCode : {
            201 :  function() {
                alert("Se ha Actualizado.");
                $("#idAdmin").val(""),
                $("#name").val(""),
                $("#email").val(""),
                $("#password").val(""),
                $("#idAdmin").attr("readonly", false);
                traerInformacion();
                }
            }
        });
}

function borrarElemento(registro){
    $.ajax({
        url:'http://129.151.111.172:8080/api/Admin/'+registro,
        type:'DELETE',
        datatype:'JSON',
        contentType:"application/json; charset=utf-8",

    statusCode : {
        204 :  function() {
            alert("Eliminado el registro No:"+registro);
            traerInformacion();
        }
    }
    });
}
var billetes = {
	money: [{
		valor:1000,
		cantidad:2
	},{
		valor:500,
		cantidad:4
	},{
		valor:200,
		cantidad:3
	},{
		valor:100,
		cantidad:3
	},{
		valor:50,
		cantidad:5
	}]
};


function is_valid(money,cantidad, valid, retiro){
	var verify = true;
	var incremental = 1;
	while(verify == true){
		var evaluate = valid - incremental;
		if ((cantidad-evaluate) < 0){
			incremental++;
		}
		else if ((cantidad-evaluate)>=0){
			valid = evaluate;
			verify=false;
		}
	}
	retiro = retiro - (valid * money);
	
	return [valid, retiro];
}

function cajero_logic(retiro,retiro_saldado){

	document.write("Calculando retiro...");

	for(var p in billetes.money){
		var how_much = billetes.money[p].cantidad;
		if (how_much > 0){
			var valid = retiro / billetes.money[p].valor;
			valid = Math.floor(valid);
			
			if((billetes.money[p].cantidad-valid) < 0){
				valid_list = is_valid(billetes.money[p].valor, billetes.money[p].cantidad,valid,retiro);
				valid = valid_list[0];
				retiro = valid_list[1];
				retiro_saldado.push({valor: billetes.money[p].valor,cantidad: valid});
				billetes.money[p].cantidad = billetes.money[p].cantidad-valid;
				
			}
			else if ((billetes.money[p].cantidad-valid) >= 0){
				retiro = retiro - (valid * billetes.money[p].valor);
				retiro_saldado.push({valor: billetes.money[p].valor,cantidad: valid});
				billetes.money[p].cantidad = billetes.money[p].cantidad-valid;
			}
			
		}
	}

}

function mostrar(no){
	if (no == false) {
		document.write("<hr><br>");
		document.write("Disponibilidad de billetes: <br>");
		var total = 0;
		for(var p in billetes.money){
		document.write(billetes.money[p].valor+" | ");
		document.write(billetes.money[p].cantidad+"<br>");
		total += billetes.money[p].valor*billetes.money[p].cantidad;
		}
	}
	else{
		var total = 0;
		for(var p in billetes.money){
			total += billetes.money[p].valor*billetes.money[p].cantidad;
		}

	}
	return total;
}

function main(){

	retiro = parseInt(prompt("Cuanto quieres retirar?"));

	retiro_saldado = new Array();
	var no = 0;
	total = mostrar(no);
	document.write("Verificando retiro...<br>");
	document.write("A retirar: "+retiro+"<br>");

	if (retiro > total){
		document.write("<h3 style='color: red'>Lo sentimos cajero desabastecido</h3>");
	}
	
	else if (retiro <= total){
		if (retiro < billetes.money[billetes.money.length-1].valor){
		document.write("<h3 style='color: red'>Lo sentimos su cantidad a retirar es muy pequeña</h3>");
		}
		else{
			cajero_logic(retiro,retiro_saldado);
			no = 1;
			restante = mostrar(no);

			document.write("<br><hr>");
			document.write("Verificando retiro...<br><br>");

			for(var i in retiro_saldado){
				document.write("<p style='color: blue'>Usted está recibiendo: "+retiro_saldado[i].valor+" | "+retiro_saldado[i].cantidad+
					": "+retiro_saldado[i].valor*retiro_saldado[i].cantidad+"</p>");
			}
			document.write("Total recibido: "+(total-restante));
			no = 0;
			mostrar(no);
		}
		
	}
}

main()



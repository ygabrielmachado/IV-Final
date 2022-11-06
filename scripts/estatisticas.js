drawChart();

async function drawChart() {
	const datapoints = await getData();
	const data = {

		labels: datapoints.horaData,
		datasets: [{
			label: 'Lula',
			data: datapoints.lulaData,
			backgroundColor:
				'rgba(255, 26, 104, 0.2)',

			borderColor:
				'rgba(255, 26, 104, 1)',

			tension: 0.4
		},
		{
			label: 'Bolsonaro',
			data: datapoints.bolsonaroData,
			backgroundColor: 'rgba(54, 162, 235, 0.2)',
			borderColor: 'rgba(54, 162, 235, 0.2)'
			,
			tension: 0.4
		}
		]
	};

	// config 
	const config = {
		type: 'line',
		data,
		options: {
			scales: {
				y: {
					beginAtZero: false
				}
			}
		}
	};

	// render init block
	const myChart = new Chart(
		document.getElementById('myChart'),
		config
	);
};

async function getData() {
	const horaData = [];
	const bolsonaroData = [];
	const lulaData = [];
	const url = `http://localhost:5500/data/2T.csv`;
	const response = await fetch(url);
	const tableData = await response.text();

	const table = tableData.split('\n');
	table.forEach(row => {
		const column = row.split(',');
		const hora = column[0];
		const lula = column[1];
		const bolsonaro = column[2];
		horaData.push(hora);
		lulaData.push(lula);
		bolsonaroData.push(bolsonaro);
	});

	console.log(horaData);
	console.log(lulaData);
	console.log(bolsonaroData);
	return { horaData, lulaData, bolsonaroData };
}


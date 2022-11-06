drawChart();
async function drawChart() {
	const datapoints = await getData();
	const data = {

		labels: datapoints.apuradosData,
		datasets: [{
			label: 'Bolsonaro',
			data: datapoints.lulaData,
			backgroundColor: 'rgba(54, 162, 235, 0.2)',
			borderColor: 'rgba(54, 162, 235, 0.2)'
			,
			tension: 0.4
		},
		{
			label: 'Lula',
			data: datapoints.bolsonaroData,

			backgroundColor:
				'rgba(255, 26, 104, 0.2)',

			borderColor:
				'rgba(255, 26, 104, 1)',

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
	const myChartII = new Chart(
		document.getElementById('myChartII'),
		config
	);
};

async function getData() {
	const apuradosData = [];
	const bolsonaroData = [];
	const bolsoData = [];
	const url = `https://ygabrielmachado.github.io/IV-Final/projeto/data/apurados.csv`;
	const response = await fetch(url);
	const tableData = await response.text();

	const table = tableData.split('\n');
	table.forEach(row => {
		const column = row.split(',');
		const apurados = column[0];
		const lula = column[1];
		const bolsonaro = column[2];
		apuradosData.push(apurados);
		bolsoData.push(lula);
		bolsonaroData.push(bolsonaro);
	});

	console.log(apuradosData);
	console.log(bolsoData);
	console.log(bolsonaroData);
	return { apuradosData, lulaData: bolsoData, bolsonaroData };
}

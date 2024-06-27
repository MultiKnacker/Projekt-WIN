function renderCharts(data) {
    console.log(data); // Überprüfe die empfangenen Daten in der Konsole

    const ctx = document.getElementById('chart').getContext('2d');
    const labels = data.map(report => report.name);
    const dataset = data.map(report => report.centralID); // Beispielhafte Verwendung eines zentralen Datenfeldes

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Performance',
                data: dataset,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

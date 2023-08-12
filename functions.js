
//SET CHART JS
let myChart = null;
printChart([0,0,0,0,0,0],[0,0,0,0,0,0])
function printChart(keysArray, valuesArray) {
    if (myChart) {
        myChart.destroy(); // Destruye el gráfico anterior si existe
    }

    const ctx = document.getElementById('myChart');

    myChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: keysArray,
            datasets: [{
                label: 'Pokemon Stats',
                
                data: valuesArray,
                borderWidth: 3
            }]
        },
        options: {
            scales: {
                r: {
                    beginAtZero: true,
                    suggestedMin: 0,
                    suggestedMax: 200,
                    ticks: {
                        stepSize: 25,
                    }
                }
            }
        }
    });
}

//SET CARD
function setCard(img, name) {
    const imgContainer = document.querySelector('.card-img-top');
    imgContainer.src = img;

    name = name.toUpperCase();
    const nameContainer = document.querySelector(`.card-title`);
    nameContainer.textContent = name;
}

export default printChart;
export { setCard };










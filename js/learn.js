/**
 * Created by SRUDENT on 16.06.2016.
 */
"use strict";

function compareNumbers(a, b) {
    return a - b;
}

function boxMuller(n, mu, Sigma) {
    var x, y, z0, z1, s, a = 0;
    var result = [];

    while (result.length != n) {
        x = 2.0 * Math.random() - 1.0;
        y = 2.0 * Math.random() - 1.0;
        s = x * x + y * y;

        if (s > 1 || s == 0) {
            continue;
        }

        a = Math.sqrt(-2 * Math.log(s) / s);
        z0 = x * a * Sigma + +mu;
        z1 = y * a * Sigma + +mu;
        result.push(+z0);
        if (result.length == n) {
            break;
        }
        result.push(+z1);
    }

    return result.sort(compareNumbers);
}

function draw(params, collection, plotn) {
    var arr = [];
    drawTable(collection);

    for (var i = 0; i < collection.length; i++) {
        arr[i] = [collection[i], 0];
    }


    $(function () {
        $('#chart1').highcharts({
            title: {
                text: 'График плотности распределения случайной величины <br> Закон распределения: нормальный <br> Параметры:' + params
            },
            tooltip: {
                formatter: function () {
                    var s;
                    if (this.series.name == 'x') {
                        s = '<b>Сгенерированное значение</b> = ' + this.x.toFixed(4);
                    }
                    else s = '<b>' + this.series.name + '</b>' + ' = ' +
                        this.y.toFixed(4) + ', x = ' + this.x.toFixed(4);
                    return s;
                }
            },
            plotOptions: {
                line: {
                    marker: {
                        enabled: false
                    }
                }
            },
            xAxis: {
                min: plotn[0][0],
                max: plotn[plotn.length - 1][0]
            },
            yAxis: [{
                title: {
                    text: 'Плотность'
                }
            }, {
                opposite: true
            }],
            series: [
                {
                    type: 'scatter',
                    name: 'График плотности',
                    data: plotn,
                    lineWidth: 2,
                    marker: {
                        enabled: false
                    },
                    yAxis: 1,
                    color: '#206be5'
                },
                {
                    type: 'scatter',
                    name: 'Сгенерированные значения',
                    data: arr,
                    marker: {
                        symbol: 'diamond'
                    },
                    color: '#0f0f0e'
                }]
        });
    });
}


function normal(mu, Sigma, collection) {
    var start, step, x = 0;
    var plotn = [];

    start = collection[0] - Math.abs((collection[collection.length - 1] - collection[0]) / 4);
    step = (collection[collection.length - 1] +
        Math.abs((collection[collection.length - 1] - collection[0]) / 4) - start) / 100;

    for (var i = 0; i <= 100; i++) {
        x = start + step * i;
        plotn[i] = [x, normalDist(x, mu, Sigma)];
    }

    return plotn;
}

function normalDist(x, mu, Sigma) {
    return (1 / Math.sqrt(Sigma * 2 * Math.PI)) * Math.exp(-Math.pow((x - mu), 2) / (2 * Sigma));
}

function drawTable(collection) {
    document.getElementById('result').style.display = '';
    var result = [];
    var show = '';
    var show2 = '';
    var number = 0;

    for (var i = 0; i < collection.length; i++) {
        number = i + 1;
        show += '<td>' + number + '</td>';
        show2 += '<td>' + collection[i].toFixed(2) + '</td>';
    }

    document.getElementById("tableValues").innerHTML = show2;
    document.getElementById("tableNums").innerHTML = show;
}

function getDataFromForm() {
    var data = document.getElementById("params");
    var text = [];

    for (var i = 0; i < data.length - 1; i++) {
        text[i] = data.elements[i].value;
    }

    var n = +text[0];
    var m = +text[1];
    var sigma = +text[2];

    if (validateParams(n, m, sigma)) {
        var collection = boxMuller(n, m, sigma);
        var distribution = normal(m, sigma, collection);
        var params = "m = " + m + ", σ  = " + sigma;
        document.getElementById('myForms').className = 'form-group has-success';
        document.getElementById('alertError').style.display = 'none';
        document.getElementById("tableParams").innerHTML = params;
        draw(params, collection, distribution);
        return;
    }

    document.getElementById('myForms').className = 'form-group has-error';
    document.getElementById('alertError').style.display = 'inline';


}

function validateParams(n, m, sigma) {
    if (n >= 10 && n <= 100 && m >= -500 && m <= 500 && sigma >= 0
        && sigma <= 500) {
        return true;
    }
    return false;
}


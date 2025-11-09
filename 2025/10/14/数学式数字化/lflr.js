function calculateLagrange() {
    // 初始化时清除结果和表达式
    document.getElementById('result').innerHTML = '';
    document.getElementById('expression').innerHTML = '';
    document.getElementById('slowexpress').innerHTML = '';

    const pointsInput = document.getElementById('points').value;
    const pointsArray = pointsInput.split(';').map(point => point.split(',').map(Number));
    const points = pointsArray.map(([x, y]) => ({ x, y }));

    const lagrangePolynomial = (param) => {
        let result = 0;
        for (let i = 0; i < points.length; i++) {
            let term = points[i].y;
            for (let j = 0; j < points.length; j++) {
                if (i !== j) {
                    term *= (param - points[j].x) / (points[i].x - points[j].x);
                }
            }
            result += term;
        }
        return result;
    };
    const getLagrangeExpression = () => {
        let expression = '注意到\n';
        for (let i = 0; i < points.length; i++) {
            expression +=`f(${points[i].x})=${points[i].y}\n`;
        }
        expression+='易得:\n';
        for (let i = 0; i < points.length; i++) {
            let term = `${points[i].y}`;
            for (let j = 0; j < points.length; j++) {
                if (i !== j) {
                    term += ` * (x - ${points[j].x}) / (${points[i].x} - ${points[j].x})`;
                }
            }
            if (i > 0) {
                expression += ' + \n';
            }
            expression += term;
        }
        return expression;
    };

    const param = parseFloat(prompt("请输入要计算的x值:"));
    const result = lagrangePolynomial(param);
    const expression = getLagrangeExpression();

    document.getElementById('result').innerHTML = `Lagrange插值多项式在x=${param}处的值为 ${result}`;
    document.getElementById('expression').innerHTML = `Lagrange插值多项式表达式为: ${expression}`;


    const printExpression = (expr) => {
        let index = 0;
        const intervalId = setInterval(() => {
            if (index < expr.length) {
                document.getElementById('slowexpress').innerHTML += expr[index];
                index++;
            } else {
                clearInterval(intervalId);
            }
        }, 30); // 调整延迟时间以控制打印速度
    };

    printExpression(expression);
}



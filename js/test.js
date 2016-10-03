function getRandomArbitary(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

describe("validateParams", function() {

    function makeTest() {
        var n = getRandomArbitary(0, 10);
        it("при входном " + n + " меньше 10 получаем: " + false, function() {
            assert.equal(validateParams(n, 1, 3), false);
        });
    }

    for (var i = 0; i < 5; i++) {
        makeTest();
    }

});

describe("boxMuller", function() {

    function makeTest() {
        var n = getRandomArbitary(10, 99);
        it("при генерации " + n + " значений получаем массив длинной: " + n, function() {
            assert.equal(boxMuller(n, 1, 3).length, n);
        });
    }

    for (var i = 0; i < 5; i++) {
        makeTest();
    }

});

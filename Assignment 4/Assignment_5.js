function processData(numbers, callback) {
    return callback(numbers);
}

const numbersArray = [1, 3, 2, 4, 5, 7, 6, 8];

const filterOdd = numbers => {
    return numbers.filter(num => num % 2 !== 0);
};

const doubleNumbers = numbers => {
    return numbers.map(num => num * 2);
};

const calculateSum = numbers => {
    return numbers.reduce((sum, num) => sum + num, 0);
};

const findMax = numbers => {
    return numbers.reduce((max, num) => (num > max ? num : max), numbers[0]);
};


console.log("Filtered Odd Numbers:", processData(numbersArray, filterOdd));
console.log("Doubled Numbers:", processData(numbersArray, doubleNumbers));
console.log("Sum of Numbers:", processData(numbersArray, calculateSum));
console.log("Maximum Number:", processData(numbersArray, findMax)); 

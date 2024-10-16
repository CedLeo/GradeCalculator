const totalUnitsElement = document.getElementById('totalUnits');
const gradeAveElement = document.getElementById('gradeAverage');
const finalConversionElement = document.getElementById('finalConversion');
const gradeTable = document.getElementById('gradeTable');
const addTableBtn = document.getElementById('addTableBtn');
const removeTableBtn = document.getElementById('removeTableBtn');

function addRow() {
    const newRow = document.createElement('div');
    newRow.classList.add('row');
    
    newRow.innerHTML = `
        <div class="row-item subject-name"><input type="text" placeholder="Subject Name"></div>
        <div class="row-item subject-units"><input type="number" placeholder="Units" class="unit-input"></div>
        <div class="row-item subject-grade"><input type="number" placeholder="Grade" class="grade-input"></div>
        <div class="row-item grade-converted"><p></p></div>
    `;
    gradeTable.appendChild(newRow);

    const unitInput = newRow.querySelector('.unit-input');
    const gradeInput = newRow.querySelector('.grade-input');
    const resultCell = newRow.querySelector('.grade-converted p');

    // Add event listeners to calculate grade and update the total units/grades
    unitInput.addEventListener('input', () => {
        calculateGrade(unitInput, gradeInput, resultCell);
        updateTotals();
    });
    gradeInput.addEventListener('input', () => {
        calculateGrade(unitInput, gradeInput, resultCell);
        updateTotals();
    });
}

// remove the last row
function removeRow() {
    const rows = gradeTable.getElementsByClassName('row');
    if (rows.length > 1) { 
        gradeTable.removeChild(rows[rows.length - 1]);
        updateTotals(); // Recalculate totals after row removal
    }
}

//calculate the converted grade (unit * grade)
function calculateGrade(unitInput, gradeInput, resultCell) {
    const grade = parseFloat(gradeInput.value) || 0;

    if (grade > 0) {
        if (grade < 75) {
            resultCell.textContent = "5.00";
        } else if (grade < 79) {
            resultCell.textContent = "3.00";
        } else if (grade < 82) {
            resultCell.textContent = "2.75";
        } else if (grade < 84) {
            resultCell.textContent = "2.50";
        } else if (grade < 87) {
            resultCell.textContent = "2.25";
        } else if (grade < 89) {
            resultCell.textContent = "2.00";
        } else if (grade < 92) {
            resultCell.textContent = "1.75";
        } else if (grade < 94) {
            resultCell.textContent = "1.50";
        } else if (grade < 96) {
            resultCell.textContent = "1.25";
        } else {
            resultCell.textContent = "1.00";
        }
    } else {
        resultCell.textContent = ''; // Clear if inputs are invalid
    }
}

function updateTotals() {
    const unitInputs = document.querySelectorAll('.unit-input');
    const gradeInputs = document.querySelectorAll('.grade-input');
    const resultCells = document.querySelectorAll('.grade-converted p');

    let totalUnits = 0;
    let totalWeightedGrades = 0;
    let totalConvertedGrades = 0;

    unitInputs.forEach((unitInput, index) => {
        const units = parseFloat(unitInput.value) || 0;
        const grade = parseFloat(gradeInputs[index].value) || 0;
        const convertedGrade = parseFloat(resultCells[index].textContent) || 0;

        totalUnits += units;
        totalWeightedGrades += units * grade;
        totalConvertedGrades += units * convertedGrade;
    });

    const gradeAverage = totalUnits > 0 ? (totalWeightedGrades / totalUnits).toFixed(2) : 0;
    if (gradeAverage < 75) {
        finalConversionElement.textContent = "5.00";
    } else if (gradeAverage < 79) {
        finalConversionElement.textContent = "3.00";
    } else if (gradeAverage < 82) {
        finalConversionElement.textContent = "2.75";
    } else if (gradeAverage < 84) {
        finalConversionElement.textContent = "2.50";
    } else if (gradeAverage < 87) {
        finalConversionElement.textContent = "2.25";
    } else if (gradeAverage < 89) {
        finalConversionElement.textContent = "2.00";
    } else if (gradeAverage < 92) {
        finalConversionElement.textContent = "1.75";
    } else if (gradeAverage < 94) {
        finalConversionElement.textContent = "1.50";
    } else if (gradeAverage < 96) {
        finalConversionElement.textContent = "1.25";
    } else {
        finalConversionElement.textContent = "1.00";
    }
    totalUnitsElement.textContent = totalUnits.toFixed(2);
    gradeAveElement.textContent = gradeAverage;
}

const initialUnitInput = document.querySelector('.unit-input');
const initialGradeInput = document.querySelector('.grade-input');
const initialResultCell = document.querySelector('.grade-converted p');

initialUnitInput.addEventListener('input', () => {
    calculateGrade(initialUnitInput, initialGradeInput, initialResultCell);
    updateTotals();
});
initialGradeInput.addEventListener('input', () => {
    calculateGrade(initialUnitInput, initialGradeInput, initialResultCell);
    updateTotals();
});

addTableBtn.addEventListener('click', addRow);
removeTableBtn.addEventListener('click', removeRow);

// byced

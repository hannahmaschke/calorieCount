// get the values from the food and calories form
const calorieForm = document.getElementById("calorieForm");

let totalCalories = 0;

// submit button handler
function submitForm(event) {
    event.preventDefault();
    const foodnameInput = document.getElementById("foodname").value;
    const caloriesInput = document.getElementById("calories").value;
    const table = document.getElementById("calorieTable").getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    const foodCell = newRow.insertCell(0);
    const caloriesCell = newRow.insertCell(1);
    const dateCell = newRow.insertCell(2);

    foodCell.textContent = foodnameInput;
    caloriesCell.textContent = caloriesInput;
    dateCell.textContent = new Date().toLocaleString();

    // Update total
    const calories = parseInt(caloriesInput);
    if (!isNaN(calories)) {
        totalCalories += calories;
        document.getElementById("totalCalories").textContent = totalCalories;
    }
    // call backend
    fetch('http://localhost:3000/api/saveTotalCalories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ totalCalories })
    })
        .then(res => res.json())
        .then(data => console.log('Calories saved:', data))
        .catch(err => console.error('Save error:', err));


    // Clear inputs
    document.getElementById("foodname").value = "";
    document.getElementById("calories").value = "";


}


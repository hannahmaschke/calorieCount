let currentGoal = null;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('goalForm');
  form.addEventListener('submit', event => {
    event.preventDefault();
    const goalInput = document.getElementById('calorieGoal').value;
    currentGoal = goalInput ? parseInt(goalInput, 10) : null;
    loadHistory(); // reload with goal applied
  });

  loadHistory(); // initial load
});

function loadHistory() {
  fetch('http://localhost:3000/api/getAllCalories')
    .then(res => res.json())
    .then(data => {
      const tbody = document.getElementById('historyTableBody');
      tbody.innerHTML = ''; // clear previous rows

      data.forEach(entry => {
        const row = document.createElement('tr');

        const goalStatus = getGoalStatus(entry.totalCalories);

        row.innerHTML = `
          <td class="border px-4 py-2">${entry.date}</td>
          <td class="border px-4 py-2">${entry.totalCalories}</td>
          <td class="border px-4 py-2">${goalStatus}</td>
        `;

        tbody.appendChild(row);
      });
    })
    .catch(err => console.error('Error loading history:', err));
}

function getGoalStatus(total) {
  if (currentGoal === null) return `<span class="text-gray-500">No goal</span>`;

  if (total === currentGoal) return `<span class="text-green-600 font-semibold">Reached ✅</span>`;
  if (total < currentGoal) return `<span class="text-yellow-500 font-semibold">Under 🟡</span>`;
  if (total > currentGoal) return `<span class="text-red-600 font-semibold">Over 🔴</span>`;
}

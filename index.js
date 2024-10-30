function getHourlyRate() {
    return parseFloat(document.getElementById('hourlyRate').value);
}

function getStartingTime() {
    const startTimeInput = document.getElementById('startTime').value;
    const [hours, minutes] = startTimeInput.split(':').map(Number);
    shiftStartTime = new Date();
    shiftStartTime.setHours(hours);
    shiftStartTime.setMinutes(minutes);
    shiftStartTime.setSeconds(0); // Ensure seconds are set to 0

    return shiftStartTime;
}

function openModal() {
    document.getElementById('settingsModal').classList.remove('hidden');
    loadHourlyRate();
}

function closeModal() {
    document.getElementById('settingsModal').classList.add('hidden');
    localStorage.setItem('hourlyRate', getHourlyRate());
}

function updateEarnings() {
    const hourlyRate = getHourlyRate();
    const currentTime = Date.now(); // Get current time in milliseconds
    const shiftStartTimeMillis = shiftStartTime ? shiftStartTime.getTime() : null; // Convert shift start time to milliseconds

    if (shiftStartTimeMillis && !isNaN(hourlyRate) && shiftStartTimeMillis <= currentTime) {
        const totalHours = (currentTime - shiftStartTimeMillis) / (1000 * 60 * 60);
        const earnings = `$${(totalHours * hourlyRate).toFixed(2)}`;
        document.getElementById('earnings').innerText = earnings;
    } else {
        document.getElementById('earnings').innerText = `$0.00`;
    }
}

// Call getStartingTime() when appropriate (e.g., after the user selects a time)
document.getElementById('startTime').addEventListener('change', getStartingTime);

setInterval(updateEarnings, 100); // Keep this for updating earnings

window.addEventListener('DOMContentLoaded', () => {
    const hourlyRate = localStorage.getItem('hourlyRate');
    if (hourlyRate) {
        document.getElementById('hourlyRate').value = hourlyRate;
    }
});

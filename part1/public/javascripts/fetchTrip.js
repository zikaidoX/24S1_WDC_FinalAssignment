document.addEventListener('DOMContentLoaded', async () => {

    try {
        const response = await fetch('/trips');
        if (!response.ok) {
            throw new Error('Network response bbad');
        }

        const trips = await response.json();
        const selectTrip = document.getElementById('trip');

        trips.forEach(trip => {
            const option = document.createElement('option');
            option.value = trip.trip_id;
            option.textContent = trip.destination;
            selectTrip.appendChild(option);
        });
    }
    catch (error) {
        console.error('Error loading trips:', error);
        alert('Error loading trips');
    }
});

window.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/manager/manager-data');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const feedbackData = await response.json();
        const feedbackContainer = document.querySelector('.showing_feedback');
        feedbackContainer.innerHTML = '';

        feedbackData.forEach(feedback => {
            const feedbackElement = document.createElement('div');
            feedbackElement.classList.add('feedback-item');

            const formattedDate = new Date(feedback.date).toLocaleDateString();
            let imageUrl = feedback.trip_id ? `/images/trip${feedback.trip_id}.png` : `/images/SA_travel${Math.floor(Math.random() * 4) + 1}.png`;

            console.log('Feedback:', feedback.trip_id);
            console.log('Image URL:', imageUrl);

            feedbackElement.innerHTML = `
                <img src="${imageUrl}" alt="${feedback.destination}" class="trip-image">
                <h3>Trip: ${feedback.destination}</h3>
                <p>Rating: ${feedback.rating}</p>
                <p>Comments: ${feedback.comments}</p>
                <p>Date: ${formattedDate}</p>
            `;
            feedbackContainer.appendChild(feedbackElement);
        });
    } catch (error) {
        console.error('Error fetching feedback:', error);
    }
});

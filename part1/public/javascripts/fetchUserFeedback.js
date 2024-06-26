document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/manager/feedback-data');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const feedbackData = await response.json();
        const feedbackContainer = document.querySelector('.show_user_feedback');
        feedbackContainer.innerHTML = '';

        feedbackData.forEach(feedback => {
            const feedbackElement = document.createElement('div');
            feedbackElement.classList.add('feedback-item');

            const formattedDate = new Date(feedback.date).toLocaleDateString();
            let imageUrl = feedback.trip_id ? `/images/trip${feedback.trip_id}.png` : `/images/SA_travel${Math.floor(Math.random() * 4) + 1}.png`;

            feedbackElement.innerHTML = `
                <img src="${imageUrl}" alt="${feedback.destination}" class="trip-image">
                <h2>Trip: ${feedback.destination}</h2>
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

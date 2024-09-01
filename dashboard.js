function fetchAnnouncements() {
  const announcementsContent = document.getElementById('announcements-content');
  announcementsContent.innerHTML = 'Loading announcements...';

  const apiKey = 'f99db92a79c6c7a7da9ada3c4c81a1c89e260165d05a60c50d68c4daf509822d';

  fetch('https://aurovillenetwork.org/c/announcements/5.json', {
    headers: {
      'Api-Key': apiKey,
      'Api-Username': 'system' // You might need to replace 'system' with an actual username
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('API response:', data);

      if (!data.topic_list || !data.topic_list.topics || data.topic_list.topics.length === 0) {
        throw new Error('No announcements found in the API response');
      }

      announcementsContent.innerHTML = '';
      
      data.topic_list.topics.forEach(topic => {
        console.log('Processing topic:', topic);
        const announcementHtml = `
          <div class="announcement-item">
            <img src="${topic.image_url || 'default-image-url.jpg'}" alt="${topic.title}">
            <div class="content">
              <h3>${topic.title}</h3>
              <p>${new Date(topic.created_at).toLocaleDateString()}</p>
            </div>
          </div>
        `;
        announcementsContent.innerHTML += announcementHtml;
      });
    })
    .catch(error => {
      console.error('Error fetching announcements:', error);
      announcementsContent.innerHTML = `<p class="error-message">Error loading announcements: ${error.message}</p>`;
    });
}

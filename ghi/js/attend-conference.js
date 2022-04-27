window.addEventListener('DOMContentLoaded', async () => {
  const select = document.getElementById('conference');

  const form = document.getElementById('create-attendee-form');
  form.addEventListener('submit', async event => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form))

    for (let element of form.elements) {
      element.disabled = true;
    }

    const attendeeUrl = 'http://localhost:8001/api/attendees/';
    const fetchOptions = {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const attendeeResponse = await fetch(attendeeUrl, fetchOptions);
    if (attendeeResponse.ok) {
      select.selectedIndex = 0;
      const success = document.getElementById('success-message');
      form.classList.add('d-none');
      success.classList.remove('d-none');
    } else {
      console.log(attendeeResponse);
    }
  });

  const conferencesUrl = 'http://localhost:8000/api/conferences/';
  const conferenceResponse = await fetch(conferencesUrl);
  if (conferenceResponse.ok) {
    const data = await conferenceResponse.json();
    for (let conference of data.conferences) {
      const option = document.createElement('option');
      option.value = conference.href;
      option.innerHTML = conference.name;
      select.appendChild(option);
    }
    select.classList.remove('d-none');
    const spinner = document.getElementById('loading-conference-spinner');
    spinner.classList.add('d-none');
  }

});

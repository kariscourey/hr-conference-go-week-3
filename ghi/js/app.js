window.addEventListener('DOMContentLoaded', async () => {

  const url = 'http://localhost:8000/api/conferences/';
  const response = await fetch(url);
  if (response.ok) {
    const data = await response.json();
    console.log(data);
  }

});

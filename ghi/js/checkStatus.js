export async function validate() {
  const url = 'http://localhost:8000/api/token/refresh/refresh_access/';
  const csrfToken = await cookieStore.get('csrftoken');
  const data = new FormData();
  data.append("jwt_type", "refresh");
  const response = await fetch(url, {
    credentials: 'include',
    method: 'post',
    body: data,
    headers: {
      'X-CSRFToken': csrfToken.value,
    },
  });
  if (response.ok) {
    const payloadCookie = await cookieStore.get('jwt_access_payload');
    const encodedPayload =  JSON.parse(payloadCookie.value);
    const payload = JSON.parse(atob(encodedPayload));
    console.log(payload);
    const permissions = payload.user.perms;
    if (permissions.includes("events.add_conference")) {
      const link = document.querySelector("[href='new-conference.html']");
      if (link) {
        link.classList.remove('d-none');
      }
    }
    if (permissions.includes("events.add_location")) {
      const link = document.querySelector("[href='new-location.html']");
      if (link) {
        link.classList.remove('d-none');
      }
    }
  }
}

validate();

const payloadCookie = await cookieStore.get('jwt_access_payload');
if (payloadCookie) {
  console.log(payloadCookie);
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

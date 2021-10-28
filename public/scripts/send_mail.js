export const sendMail = mail => {
  fetch('https://horatiorosa.com/send',  {
    method: 'post', 
    body: mail,
  }).then(response => {
    return response.json();
  });
}


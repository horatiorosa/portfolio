const dreamhostRequest = 'https://horatiorosa.com/send';
const herokuRequest = 'https://test-and-debug-pws.herokuapp.com/send';

export const sendMail = mail => {
  fetch(dreamhostRequest,  {
    method: 'post',
    body: mail
  }).then(response => {
    return response.json();
  });
};
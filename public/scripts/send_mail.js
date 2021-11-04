// export const sendMail = mail => {
//   fetch('https://horatiorosa.com/send',  {
//     method: 'post',
//     body: mail,
//   }).then(response => {
//     return response.json();
//   });
// }

export const sendMail = mail => {
  fetch('https://test-and-debug-pws.herokuapp.com/send',  {
    method: 'post',
    body: mail,
  }).then(response => {
    return response.json();
  });
}


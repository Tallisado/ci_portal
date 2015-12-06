var rest = require('restler');

// multipart request sending a 321567 byte long file using https
rest.post('http://localhost:3000/api/auth/signin', {
  // multipart: true,
  username: 'asd',
  password: 'asdasd',
  // data: {
  //   'sound[message]': 'hello from restler!',
  //   'sound[file]': rest.file('doug-e-fresh_the-show.mp3', null, 321567, null, 'audio/mpeg')
  // }
}).on('complete', function(data) {
  console.log(data);
});

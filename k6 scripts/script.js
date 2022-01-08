//running this script: k6 run --vus 1000 --iterations 10000 script.js 

import http from 'k6/http';

export default function () {
  const url = 'http://20.103.122.194/api/Authentication';
  const payload = JSON.stringify({
  userId: 0,
  userName: "miguelsoto",
  email: "string",
  password: "johnnyiscool",
  admin: true
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  http.post(url, payload, params);
}

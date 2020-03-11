
export interface GoogleAccountData {
  firstName: string;
  lastName: string;
  email: string;
}

export let response = (data: GoogleAccountData) => JSON.stringify({
  provider: 'google-plus',
  id: '106902585744864513864',
  displayName: `${data.firstName} ${data.lastName}`,
  name: { familyName: data.lastName, givenName: data.firstName },
  emails: [ { value: data.email, type: 'ACCOUNT' } ],
  photos: [
    {
      value: 'https://lh6.googleusercontent.com/-7Rw5DzzIIvg/AAAAAAAAAAI/AAAAAAAAAAA/AKF05nCBwKURtELlnMPo1P3XlG9JyO3dqw/s50/photo.jpg'
    }
  ],
  /* _raw: '{\n' +
    '  "id": "106902585744864513864",\n' +
    '  "name": {\n' +
    '    "familyName": "${data.lastName}",\n' +
    '    "givenName": "${data.firstName}"\n' +
    '  },\n' +
    '  "displayName": "${data.firstName} ${data.lastName}",\n' +
    '  "image": {\n' +
    '    "url": "https://lh6.googleusercontent.com/-7Rw5DzzIIvg/AAAAAAAAAAI/AAAAAAAAAAA/AKF05nCBwKURtELlnMPo1P3XlG9JyO3dqw/s50/photo.jpg",\n' +
    '    "isDefault": true\n' +
    '  },\n' +
    '  "emails": [\n' +
    '    {\n' +
    '      "value": "${data.email}",\n' +
    '      "type": "ACCOUNT"\n' +
    '    }\n' +
    '  ],\n' +
    '  "language": "en",\n' +
    '  "kind": "plus#person",\n' +
    '  "etag": "%EgUCawolLhoDAQUH"\n' +
    '}\n', */
  _json: {
    id: '106902585744864513864',
    name: { familyName: `${data.lastName}`, givenName: `${data.firstName}` },
    displayName: `${data.firstName} ${data.lastName}`,
    image: {
      url: 'https://lh6.googleusercontent.com/-7Rw5DzzIIvg/AAAAAAAAAAI/AAAAAAAAAAA/AKF05nCBwKURtELlnMPo1P3XlG9JyO3dqw/s50/photo.jpg',
      isDefault: true
    },
    emails: [ {value: data.email, type: 'ACCOUNT'} ],
    language: 'en',
    kind: 'plus#person',
    etag: '%EgUCawolLhoDAQUH'
  }
});

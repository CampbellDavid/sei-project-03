// const twilio = require('twilio')
// const accountSid = process.env.TWILIO_ACC_SID
// const authToken = process.env.TWILIO_AUTH_TOK
// const client = require('twilio')(accountSid, authToken)

// client.chat.services.create({ friendlyName: 'pubMessageResource' }
//   .then(service.channels.create({ identity: 'newChannel' })
//     .then(channel.members.create({ identity: 'newMember' })
//       .then(member => console.log(member.sid)))))









// client.chat.services('PubMessageResource')
//   .channels
//   .create({ identity: 'NewChannel' })
//   .then(channel => console.log(channel.sid))

// client.chat.services('PubMessageResource')
//   .channels('CHXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
//   .members
//   .create({ identity: 'identity' })
//   .then(member => console.log(member.sid))
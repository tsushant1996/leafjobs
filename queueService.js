const amqp = require('amqplib/callback_api');
const USERS_COLLECTION = require('./models_schema/models').users;
const ObjectID = require('mongodb').ObjectID;
const emailService = require('./emailService');
module.exports = {

	orderNotifications: async (params,queue) => {

		let rabbitmq_host = 'localhost';
        let  rabbitmq_user = 'admin';
        let rabbitmq_pass = 'password';
		amqp.connect('amqp://localhost', function(err, conn) {
			conn.createChannel(function(err, ch) {
                var q = 'orderNotifications';
            
                ch.assertQueue(q, {durable: false});
                console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
                ch.consume(q, function(msg) {
                  console.log(" [x] Received %s", msg.content.toString());
                  console.log('msg content',msg.content.userId);
                  let recievedData = JSON.parse(msg.content);
                  console.log('recieveddata',recievedData);
                  let query = {_id: new ObjectID(recievedData.userId)};
                  console.log('query---------->',query);
                  let body = 'Order Recieved';
                  USERS_COLLECTION.find(query)
                    .then( (result) => {
                        console.log('result',result);
                        emailService.sendMail(result[0].email,body);
                    }).catch(err => {
                        console.log(err);
                        return err;
                    })
                   
                }, {noAck: true});
              });
		});
		return;
    }
};
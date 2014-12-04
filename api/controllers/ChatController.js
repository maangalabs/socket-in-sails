/**
 * ChatController
 *
 * @description :: Server-side logic for managing chats
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	addConv:function (req,res) {
		
		var data_from_client = req.params.all();

		if(req.isSocket && req.method === 'POST'){

			// This is the message from connected client
			// So add new conversation
			Chat.create(data_from_client)
				.exec(function(error,data_from_client){
					console.log(data_from_client);
					Chat.publishCreate({id: data_from_client.id, message : data_from_client.message , user:data_from_client.user});
				}); 
		}
		else if(req.isSocket){
			Chat.watch(req.socket);
			console.log( 'User subscribed to ' + req.socket.id );
		}
	}	
};


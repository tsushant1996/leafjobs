const DELIEVERY_COLLECTION = require('../models_schema/models').delieveries;
const AGENTS_COLLECTION = require('../models_schema/models').agents;
const carts = require('../models/carts');
const agents  = require('../models/agents');
var delieveries = {
     createDelieveries: async  (cartId) => {
             console.log('creatingDelievery================>',cartId);
            try {
                /*
                cheking if agents are free or not isFree = 0 ---->agent is free
                and is_Free = 1 ------>agent is not free 

                */
                let  today = new Date();
        
                let query = {'isFree':1} 
                let freeAgents = await AGENTS_COLLECTION.find(query,{_id:1});
            
                if(freeAgents && freeAgents.length > 0){
                    let  shippingCart = new DELIEVERY_COLLECTION({
                        'cartId': cartId._id,
                        'agentId':freeAgents[0]._id,
                        'expectedTimeline': today.setDate(today.getDate() + 1),
                        'status':0,
                        'delieveredTimeline':'',
                        'createdAt':new Date(),
                        'updatedAt':new Date()
                      });
                    let result = await shippingCart.save();
                     await carts.updateCart(cartId._id);
                     await agents.busyAgent(freeAgents[0]._id);
                    return result;
                }else{
                    return [];
                }
            } catch (error) {
                console.log(error);
                throw new Error(error);
            }
    },


    updateDelieveries: async  (cartId) => {
             
        let  query = {_id:new ObjectID(data.cartId)};
        let   updateQuery = {
             $set: {
                   'status':1,
                   'delieveredTimeline':new Date(),
                   'updatedAt':new Date()
                 }
           };
 
         try{
 
             let data = await DELIEVERY_COLLECTION.find(query);
             if(data && data.length > 0) {
                data =   await DELIEVERY_COLLECTION.update(query,updateQuery);
                return data;
             }
         } catch(err){
             console.log(err);
             throw new Error(err);
         }
},





  };

  module.exports = delieveries;

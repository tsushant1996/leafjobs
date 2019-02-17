const cron = require('node-cron');
const CARTS_COLLECTION  = require('../models_schema/models').carts;
const AGENTS_COLLECTION = require('../models_schema/models').agents;
const agents = require('../models/agents');
const deliveries = require('../models/delievery');

var cronJobs = {
     assignJob: async  () => {

         /*product which is confirmed,not assigned and not delievered
                  We can have further grouping on the basis of users
                  address but for simplicity we are taking on those item whic are not delivered
                  For now we will assign only on cart  to on agent
          */
        
       cron.schedule('* * * * *', () => {
            
            try {
               
                let query = {'isDelievered':0,'isAssgined':0,'status':1} 
                let freeCarts = await CARTS_COLLECTION.find({});
                console.log('freeCarts',freeCarts);
                if(freeCarts && freeCarts.length > 0){
                    console.log('freeCartFound');
                        let freeAgents = await agents.searchForAgent();
                            console.log('freeagent found',freeAgents);
                        if(freeAgents.length > 0){
                                for(const cart of freeCarts ) {
                                  await deliveries.createDelieveries(cart);
                                }
                        } else {
                            console.log('All agents are busy');
                        }
                } else {
                    console.log('All carts are delievered or assigned');
                }

            } catch (error) {
                
            }

          });
     
    },
  };

  module.exports = cronJobs;

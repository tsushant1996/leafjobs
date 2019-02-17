const AGENTS_COLLECTION = require('../models_schema/models').agents;
const ObjectID = require('mongodb').ObjectID;
var agents = {
     searchForAgent: async  () => {
             
            try {
                /*
                cheking if agents are free or not isFree = 0 ---->agent is free
                and is_Free = 1 ------>agent is not free 

                */
                let query = {'isFree':1} 
                let freeAgents =await AGENTS_COLLECTION.find(query,{_id:1});
                
                if(freeAgents && freeAgents.length > 0){
                    return freeAgents;
                }else{
                    return [];
                }
            } catch (error) {
                console.log(error);
                throw new Error(error);
            }
    },

    busyAgent: async (agentId) => {

        try {
            let query  = {_id:new ObjectID(agentId)};
            let agentData  = await AGENTS_COLLECTION.find(query);
            
            if(agentData && agentData.length > 0) {
                let   updateQuery = {
                    $set: {
                          'isFree':0,
                          'updatedAt':new Date()
                        }
                  };
                  let updateAgent =await AGENTS_COLLECTION.update(query,updateQuery);
                  if(updateAgent){
                      console.log('Agent Got Busy');
                      return true;
                  }else{
                      return false;
                  }
               
            } 

        } catch (error) {
            console.log(error);
            return error;
        }
    }
  };

  module.exports = agents;

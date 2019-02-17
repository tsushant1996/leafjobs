const CARTS_COLLECTION = require('../models_schema/models').carts;
const ObjectID = require('mongodb').ObjectID;
var carts = {
     

    updateCart: async (cartId) => {

        try {
            let query  = {_id:new ObjectID(cartId)};
            let cartData  = await CARTS_COLLECTION.find(query);
            
            if(cartData && cartData.length > 0) {
                let   updateQuery = {
                    $set: {
                          'isAssigned':1,
                          'updatedAt':new Date()
                        }
                  };
                  let updateCart =await CARTS_COLLECTION.update(query,updateQuery);
                  return updateCart;

            } 

        } catch (error) {
            console.log(error);
            return error;
        }
    }
  };

  module.exports = carts;

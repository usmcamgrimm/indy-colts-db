const { responseObj } = require('../util/helper');
const { q, clientQuery } = require('../util/connection');

exports.handler = async (event, context) => {
  try {
   let players = await clientQuery.query(
     q.Map(
       q.Paginate(q.Documents(q.Collection('players'))),
       q.Lambda(x => q.Get(x))
      )
    )
    return responseObj(200, [players])
  } catch (error) {
    console.log(error)
    return responseObj(500, error);
  }
};
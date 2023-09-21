const { getIO } = require('../utils/socket');
const reddis = require('../utils/redisClient');
const helpers = require('../helpers/helpers');

const postMatch = async (req, res) => {
  const users = req.body.players;
  const deck = await helpers.fetchDeck()
  await reddis.set(deck.deck_id, JSON.stringify(
    {
      'totalPlayers': users
    }
  ))
  res.json(deck);
}

const getReddisMatch = async (req, res) => {
  const result = await reddis.get("k3ohao2icmm1")
  res.json(result);
}



const startMatch = async(req, res)=>{
  const io = getIO();
  const socketId = req.body.socketId;
  const socket = io.sockets.sockets.get(socketId)
  let clients
  let deckId

  socket.on("join_room", (data) => {
    socket.join(data);
    deckId = data
    const room = io.sockets.adapter.rooms.get(data);
    const totalUsersInRoom = room ? room.size : 0;

    clients = Array.from (io.sockets.adapter.rooms.get(data) );
    io.in(data).emit('get_total_users_joined', { totalUsersInRoom: totalUsersInRoom, clients: clients });
  });

  socket.on("requestCards", async(data) => {

    if(socket.id == clients[data.myTurn]){
      const cardsData =  await helpers.drawcards(deckId,1);

      if (data.myTurn == 0 && helpers.checkForA(data.cards)){
      io.in(deckId).emit('getPoints', { playerOnePoints: data.playerOnePoints + 1, playerTwoPoints: data.playerTwoPoints });
      }
      else if (data.myTurn == 1 && helpers.checkForA(data.cards))  {
        io.in(deckId).emit('getPoints', { playerOnePoints: data.playerOnePoints , playerTwoPoints: data.playerTwoPoints + 1 });
      }

      io.to(clients[data.myTurn]).emit("initialCards", cardsData.cards)

      const nextTurn = helpers.incrementTurn(data.totalPlayers -1, data.myTurn)
      io.in(deckId).emit('currentTurn', { currentTurn: nextTurn});
    }

  })

  const result = await reddis.get(req.body.gameId)
  res.send(result);

}


const Matches = {
  postMatch,
  getReddisMatch,
  startMatch
}
module.exports  = Matches

import card from './Card';

const player = {
  id: {
    type: String,
    required: true
  },
  hand: {
    cards: [card],
    sent: [
      {
        type: String
      }
    ]
  }
};

export default player;

import card from './Card';

const player = {
  tag: {
    type: String,
    required: true
  },
  hand: { cards: [card], sent: [] }
};

export default player;

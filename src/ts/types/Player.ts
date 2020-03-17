import card from './Card';

const player = {
  tag: {
    type: String,
    required: true
  },
  hand: [card]
};

export default player;

import { Review } from '../types/review';

export const reviews: Review[] = [
  {
    id: '1',
    comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
    date: '2019-04-24',
    rating: 4,
    user: {
      name: 'Max',
      avatarUrl: 'img/avatar-max.jpg',
      isPro: false,
    },
  },
  {
    id: '2',
    comment: 'Beautiful space, fantastic location and atmosphere, really a wonderful place to spend a few days. Will be back.',
    date: '2019-05-08',
    rating: 5,
    user: {
      name: 'Angelina',
      avatarUrl: 'img/avatar-angelina.jpg',
      isPro: true,
    },
  },
  {
    id: '3',
    comment: 'Home is amazing. It\'s like staying in a museum. The rooms, furnishings and artworks are incredible. The views of Amsterdam are breathtaking.',
    date: '2019-05-15',
    rating: 5,
    user: {
      name: 'John',
      avatarUrl: 'img/avatar-max.jpg',
      isPro: false,
    },
  },
];

export const BASE_URL =
  'https://us-central1-alpineventsbackend.cloudfunctions.net/app/';

export const TIPURI_EVENIMENTE = [
  {tip: 'Nuntă', image: '../../assets/nunta.jpg'},
  {tip: 'Majorat', image: '../../assets/majorat.jpg'},
  {tip: 'Onomastică', image: '../../assets/onomastica.jpg'},
  {tip: 'Petrecere Privată', image: '../../assets/petrecere.jpg'},
];

interface Meniu {
  nume: string;
  pret: number;
}

export const TIPURI_MENIU: Meniu[] = [
  {
    nume: 'Premium',
    pret: 220,
  },
  {
    nume: 'Clasic',
    pret: 200,
  },
  {
    nume: 'Buget Redus',
    pret: 150,
  },
];

export const COLORS = {
  white: '#fff',
  black: '#000',
  blue: '#5D5FEE',
  grey: '#BABBC3',
  light: '#F3F4FB',
  darkBlue: '#7978B5',
  red: 'red',
};

export const MONTHS = [
  'Ianuarie',
  'Febroarie',
  'Martie',
  'Aprilie',
  'Mai',
  'Iunie',
  'Iulie',
  'August',
  'Septembrie',
  'Octombrie',
  'Noiembrie',
  'Decembrie',
];

export const DAYS = [
  'Duminică',
  'Luni',
  'Marți',
  'Miercuri',
  'Joi',
  'Vineri',
  'Sâmbătă',
];

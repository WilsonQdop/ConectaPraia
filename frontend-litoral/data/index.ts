import { EventItem, ServiceItem, Review } from '../types';

export const ASSETS = {
  // User avatars
  userProfile1: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
  userProfile2: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
  userProfile3: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
  userProfileHeader: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
  
  // Business avatars
  barracaCeuAzulProfile: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=200',
  
  // Map images
  mapSearchBackground: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
  mapDetailSurf: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=800',
  mapDetailPeixada: 'https://images.unsplash.com/photo-1577219491135-ce391fb6af41?w=800',
  
  // Icons
  fishIcon: 'https://cdn-icons-png.flaticon.com/512/3119/3119328.png',
  moquecaIcon: 'https://cdn-icons-png.flaticon.com/512/1046/1046784.png',
  drinkIcon: 'https://cdn-icons-png.flaticon.com/512/3108/3108046.png',
  caldinhoIcon: 'https://cdn-icons-png.flaticon.com/512/2695/2695466.png',
  
  // Hero images
  heroWelcome: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
  googleLogo: 'https://cdn-icons-png.flaticon.com/512/281/281764.png',
};

export const INITIAL_EVENTS: EventItem[] = [
  {
    id: 'e1',
    title: 'Aula de Surf',
    icon: 'surfing',
    date: '25/05 - 05h',
    location: 'Gaibu',
    organizer: 'Surf estilo de vida',
    price: 'R$ 80 (aula + prancha)',
    rating: 4.8,
    reviewsCount: 230,
    image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=600',
    category: 'Surf',
    description: 'Venha aproveitar essa grande oportunidade de conhecer seu novo estilo de vida com a Surf estilo de vida. Aqui te garantimos um modo divertido e seguro de aprender surf, com instrutores certificados e o melhor cenário das praias de Porto de Galinhas.'
  },
  {
    id: 'e2',
    title: 'Festival de Música',
    icon: 'music_note',
    date: '15 a 20/05 - 17h',
    location: 'Porto de Galinhas',
    organizer: 'Prefeitura Municipal',
    price: 'Entrada gratuita',
    rating: 4.9,
    reviewsCount: 2500,
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600',
    category: 'Música',
    description: 'Participe do grandioso Festival de Música de Porto de Galinhas! Com dezenas de atrações locais, nacionais e de praia se encontrando no coração da nossa areia.'
  },
  {
    id: 'e3',
    title: 'Trilha em Gaibu',
    icon: 'directions_walk',
    date: '30/05 - 05h',
    location: 'Gaibu',
    organizer: 'Ponto de encontro: Arcomix',
    price: 'Guia R$15',
    rating: 4.91,
    reviewsCount: 128,
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=600',
    category: 'Caminhada',
    description: 'Caminhada matinal guiada pelas falésias e vistas deslumbrantes da Enseada de Gaibu. Venha descobrir a flora local de forma saudável e revigorante!'
  }
];

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 's1',
    title: 'Peixada do Nê',
    icon: 'set_meal',
    date: '10/04 - 05h',
    timeRange: '10/04 - 05h',
    location: 'Gaibu',
    organizer: 'Barraca Céu Azul',
    price: '15% de desconto na primeira compra',
    rating: 4.8,
    reviewsCount: 230,
    image: ASSETS.fishIcon,
    category: 'Restaurantes',
    description: 'Venha aproveitar a maravilhosa peixada da Barraca Céu Azul. Estamos com uma promoção incrível em comemoração do aniversário do Nê, o fundador da nossa barraca. Só amanhã, a partir das 05h, 15% de desconto na primeira compra da sua peixada. VEM!!!'
  },
  {
    id: 's2',
    title: 'Muqueca Baiana',
    icon: 'restaurant',
    date: '18:00h às 02:00h',
    location: 'Porto de Galinhas',
    organizer: 'OrlaBar',
    price: 'Aniversário do bar - 15% OFF',
    rating: 4.85,
    reviewsCount: 230,
    image: ASSETS.moquecaIcon,
    category: 'Restaurantes',
    description: 'Uma deliciosa Moqueca Baiana servida na panelinha de barro preta. Sabor autêntico com leite de coco fresco, tucupi e azeite de dendê. O clássico tempero da orla.'
  },
  {
    id: 's3',
    title: 'Caipiroska Carnavalesca',
    icon: 'local_bar',
    date: '30/05 - 05h',
    location: 'Gaibu',
    organizer: 'Nininho Drinks Tropicais',
    price: '20% OFF na Caipiroska',
    rating: 4.91,
    reviewsCount: 128,
    image: ASSETS.drinkIcon,
    category: 'Bares',
    description: 'Refrescante coquetel de limão com gelo e frutas tropicais em copo alto estruturado. O acompanhamento perfeito para o pôr do sol à beira mar.'
  },
  {
    id: 's4',
    title: 'Caldinho Rabo de Galo',
    icon: 'soup_kitchen',
    date: '23/05 - 08h',
    location: 'Orla de Boa viagem',
    organizer: 'Caldinho do Esquerdinha',
    price: '15% de desconto se for seu aniversário',
    rating: 4.95,
    reviewsCount: 98,
    image: ASSETS.caldinhoIcon,
    category: 'Autônomos',
    description: 'Copo quentinho e rico de caldo encorpado temperado com cheiro verde e croutons salgados. A melhor entrada do litoral.'
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'r1',
    userName: 'Wagner Moura',
    rating: 5,
    comment: 'Adorei de coração essa peixada, e com essa promoção ficou melhor ainda hahaha!',
    targetId: 's1',
    targetType: 'service',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'r2',
    userName: 'José de Alencar',
    rating: 4,
    comment: 'A peixada e o ambiente é muito bom. Só achei o atendimento um pouco demorado.',
    targetId: 's1',
    targetType: 'service',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'r3',
    userName: 'Chico Buarque',
    rating: 5,
    comment: 'Eu não sou muito fã de peixe, mas essa peixada mudou meu pensamento. Nota 10!!!!',
    targetId: 's1',
    targetType: 'service',
    createdAt: new Date().toISOString(),
  }
];
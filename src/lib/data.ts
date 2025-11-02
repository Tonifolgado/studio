export type Tree = {
  id: number;
  slug: string;
  name: string;
  scientificName: string;
  family: string;
  images: string[]; // ids from placeholder-images.json
  characteristics: string;
  facts: string[];
  rangeMapImage: string; // id from placeholder-images.json
};

export const trees: Tree[] = [
  {
    id: 1,
    slug: 'quercus-robur',
    name: 'English Oak',
    scientificName: 'Quercus robur',
    family: 'Fagaceae',
    images: ['oak-leaf', 'oak-bark', 'oak-tree'],
    characteristics: 'Recognizable by its distinctive lobed leaves, which are 4-10 cm long. The bark is grey and deeply fissured, becoming rougher with age. It produces acorns, which are nuts borne in a cup-like structure.',
    facts: [
      'Can live for over 1,000 years, supporting vast ecosystems.',
      'Historically, its timber was the primary material for building ships for the Royal Navy.',
      'In many cultures, the oak is a symbol of strength, endurance, and wisdom.'
    ],
    rangeMapImage: 'oak-range-map'
  },
  {
    id: 2,
    slug: 'acer-saccharum',
    name: 'Sugar Maple',
    scientificName: 'Acer saccharum',
    family: 'Sapindaceae',
    images: ['maple-leaf', 'maple-bark', 'maple-tree'],
    characteristics: 'Features five-lobed leaves that turn brilliant shades of red, orange, and yellow in autumn. The bark on young trees is smooth and gray, becoming furrowed with age. It is the primary source of maple syrup.',
    facts: [
      'The leaf of the Sugar Maple is the national symbol of Canada.',
      'It can take up to 40 gallons of sap to produce one gallon of maple syrup.',
      'The wood is highly valued for furniture, flooring, and musical instruments, known for its hardness.'
    ],
    rangeMapImage: 'maple-range-map'
  },
  {
    id: 3,
    slug: 'pinus-sylvestris',
    name: 'Scots Pine',
    scientificName: 'Pinus sylvestris',
    family: 'Pinaceae',
    images: ['pine-needles', 'pine-bark', 'pine-tree'],
    characteristics: 'An evergreen conifer with blue-green needles in pairs of two, typically 4-5 cm long. The upper bark is a distinctive orange-brown and flaky. It produces small, conical cones.',
    facts: [
      'It is the only pine native to Great Britain.',
      'The tree is a pioneer species, one of the first to colonize open, disturbed ground.',
      'Its resin has been used for centuries to make turpentine and waterproof boats.'
    ],
    rangeMapImage: 'pine-range-map'
  }
];

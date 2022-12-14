// array of 100 difficult words to spell

const difficultWords = [
  'calendar',
  'noticeable',
  'acquire',
  'breathe',
  'license',
  'February',
  'accommodate',
  'optimistic',
  'foreign',
  'recommend',
  'restaurant',
  'experience',
  'vengeance',
  'millennial',
  'recollection',
  'tendency',
  'separate',
  'Wednesday',
  'indispensable',
  'definitely',
  'jealous',
  'consensus',
  'independent',
  'appearance',
  'hypocrite',
  'category',
  'maintenance',
  'interrupt',
  'chronological',
  'acknowledgement',
  'persistent',
  'lacrosse',
  'relevant',
  'genuine',
  'unforeseen',
  'absence',
  'receive',
  'committee',
  'underrate',
  'copyright',
  'colleague',
  'privilege',
  'glamorous',
  'successful',
  'bureaucracy',
  'rhythm',
  'cathedral',
  'champagne',
  'fisticuffs',
  'unnecessary',
  'conscience',
  'masseuse',
  'siege',
  'incandescent',
  'curio',
  'arcane',
  'unanimous',
  'liquefy',
  'pronunciation',
  'supremacy',
  'apparent',
  'Pterodactyl',
  'flimsy',
  'coincidence',
  'fracas',
  'broccoli',
  'villain',
  'embarrass',
  'mezzanine',
  'enormous',
  'ordinance',
  'disembowel',
  'weird',
  'squadron',
  'parallel',
  'javelin',
  'handkerchief',
  'chivalry',
  'acceptable',
  'dilemma',
  'extracurricular',
  'pragmatic',
  'mastodon',
  'nauseous',
  'maneuver',
  'occurrence',
  'deductible',
  'solitaire',
  'cayenne',
  'vacuum',
  'Neapolitan',
  'abominable',
  'stirrups',
  'curiosity',
  'misspell',
  'orangutan',
  'kaleidoscope',
  'bizarre',
  'persuasive',
  'gruesome',
  'withhold',
  'papyrus',
  'vacancy',
  'quarantine',
  'ballistic',
  'acoustic',
  'assassination',
  'tomahawk',
  'Triceratops',
  'fluorescent',
  'confiscate',
  'chlorophyll',
  'salivate',
  'kindergarten',
  'necessary',
  'ferocious',
  'unfortunately',
  'knowledge',
  'colossal',
  'eczema',
  'anonymity',
  'January',
  'questionnaire',
  'Chihuahua',
  'truly',
  'croissant',
  'publicly',
  'cemetery',
  'phlegm',
  'bologna',
  'nostalgia',
  'molasses',
  'limousine',
  'reckless',
  'conceit',
  'subliminal',
  'ensemble',
];

const difficultRandomWords = ({ time, numWords }) => {
  let limit = time * numWords;
  const randomWordArray = [];
  for (let i = 0; i < limit; i++) {
    randomWordArray.push(difficultWords[Math.floor(Math.random() * difficultWords.length)]);
  }
  // must return an array, other functions use the index to get the word
  return randomWordArray;
};

export default difficultRandomWords;

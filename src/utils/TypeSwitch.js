const TypeSwitch = (type) => {
  switch (type) {
    case 'grass':
      return '0, 171, 20';
    case 'normal':
      return '153, 146, 145';
    case 'fighting':
      return '143, 0, 14';
    case 'flying':
      return '189, 249, 255';
    case 'poison':
      return '129, 2, 171';
    case 'ground':
      return '122, 47, 24';
    case 'rock':
      return '140, 138, 137';
    case 'bug':
      return '60, 201, 60';
    case 'ghost':
      return '107, 10, 171';
    case 'steel':
      return '64, 64, 64';
    case 'fire':
      return '255, 25, 25';
    case 'water':
      return '56, 129, 255';
    case 'electric':
      return '255, 240, 110';
    case 'psychic':
      return '188, 99, 247';
    case 'ice':
      return '186, 213, 232';
    case 'dragon':
      return '117, 72, 57';
    case 'dark':
      return '102, 80, 117';
    case 'fairy':
      return '247, 240, 171';
    case 'shadow':
      return '38, 33, 41';
    default:
      return null;
  }
};

export default TypeSwitch;

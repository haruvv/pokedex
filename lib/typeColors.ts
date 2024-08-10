export const typeColors: { [key: string]: { background: string; text: string } } = {
  normal: { background: '#A8A878', text: '#FFFFFF' },
  fire: { background: '#F08030', text: '#FFFFFF' },
  water: { background: '#6890F0', text: '#FFFFFF' },
  electric: { background: '#F8D030', text: '#000000' },
  grass: { background: '#78C850', text: '#FFFFFF' },
  ice: { background: '#98D8D8', text: '#000000' },
  fighting: { background: '#C03028', text: '#FFFFFF' },
  poison: { background: '#A040A0', text: '#FFFFFF' },
  ground: { background: '#E0C068', text: '#000000' },
  flying: { background: '#A890F0', text: '#000000' },
  psychic: { background: '#F85888', text: '#FFFFFF' },
  bug: { background: '#A8B820', text: '#FFFFFF' },
  rock: { background: '#B8A038', text: '#FFFFFF' },
  ghost: { background: '#705898', text: '#FFFFFF' },
  dragon: { background: '#7038F8', text: '#FFFFFF' },
  dark: { background: '#705848', text: '#FFFFFF' },
  steel: { background: '#B8B8D0', text: '#000000' },
  fairy: { background: '#EE99AC', text: '#000000' },
};

export function getTypeColor(type: string): { background: string; text: string } {
  return typeColors[type.toLowerCase()] || { background: '#68A090', text: '#FFFFFF' };
}

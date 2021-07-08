import { SearchArea } from '../styles/searchBarStyles';
import _ from 'lodash';
const SearchBar = ({
  setSearchText,
  setOffsets,
  setActiveType,
  activeType,
  searchText,
}) => {
  const typesList = [
    'grass',
    'normal',
    'fighting',
    'flying',
    'poison',
    'ground',
    'rock',
    'bug',
    'ghost',
    'steel',
    'fire',
    'water',
    'electric',
    'psychic',
    'ice',
    'dragon',
    'dark',
    'fairy',
    'shadow',
  ];
  const onSearch = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <SearchArea>
      Generation:
      <div>
        <button
          onClick={() => {
            setOffsets({ offset: 0, limit: 151 });
          }}
        >
          I
        </button>
        <button
          onClick={() => {
            setOffsets({ offset: 152, limit: 99 });
          }}
        >
          II
        </button>
        <button
          onClick={() => {
            setOffsets({ offset: 251, limit: 135 });
          }}
        >
          III
        </button>
        <button
          onClick={() => {
            setOffsets({ offset: 386, limit: 107 });
          }}
        >
          IV
        </button>
        <button
          onClick={() => {
            setOffsets({ offset: 493, limit: 156 });
          }}
        >
          V
        </button>
        <button
          onClick={() => {
            setOffsets({ offset: 649, limit: 72 });
          }}
        >
          VI
        </button>
        <button
          onClick={() => {
            setOffsets({ offset: 721, limit: 88 });
          }}
        >
          VII
        </button>
        <button
          onClick={() => {
            setOffsets({ offset: 809, limit: 88 });
          }}
        >
          VIII
        </button>
      </div>
      <div>Search:</div>
      <input type="text" value={searchText} onChange={(e) => onSearch(e)} />
      <div>Select Type:</div>
      <select
        onChange={(e) => setActiveType(e.target.value)}
        value={activeType}
      >
        <option value="">All Types</option>
        {typesList.map((type) => (
          <option value={type} key={type}>
            {_.upperFirst(type)}
          </option>
        ))}
      </select>
    </SearchArea>
  );
};

export default SearchBar;

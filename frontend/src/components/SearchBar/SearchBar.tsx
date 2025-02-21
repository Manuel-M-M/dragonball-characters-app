import React from 'react';
import { useCharacterListStore } from '../../store/CharactersListStore/CharactersListStore';
import { FaSearch } from 'react-icons/fa';
import styled from 'styled-components';

interface SearchBarProps {
  resultsCount: number;
}

const SearchContainer = styled.div`
  width: 100%;
  max-width: 1416px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-left: 48px;
  padding-right: 68px;
  margin-bottom: 16px;
`;

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  border-bottom: 1px solid black;
  padding-bottom: 8px;
`;

const SearchIcon = styled(FaSearch)`
  color: black;
  font-size: 12px;
  font-weight: 400;
  line-height: 12px;
  letter-spacing: 0;
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-family: 'roboto-condensed', sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: black;
  background-color: #ffffff;
  line-height: 18.75px;
  letter-spacing: 0;
  text-transform: uppercase;

  &::placeholder {
    color: #aaa;
  }
`;

const SearchCounter = styled.span`
  color: black;
  font-family: 'roboto-condensed', sans-serif;
  font-size: 12px;
  font-weight: 400;
  line-height: 14.06px;
  letter-spacing: 0;
`;

export const SearchBar: React.FC<SearchBarProps> = ({ resultsCount }) => {
  const { searchCharacters } = useCharacterListStore();

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toUpperCase();
    searchCharacters(value);
  };

  return (
    <SearchContainer className="SearchContainer">
      <SearchWrapper>
        <SearchIcon />
        <SearchInput type="text" placeholder="SEARCH A CHARACTER..." onChange={handleSearch} />
      </SearchWrapper>
      <SearchCounter>{resultsCount} RESULTS</SearchCounter>
    </SearchContainer>
  );
};

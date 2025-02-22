import React from 'react';
import { useCharacterListStore } from '../../store/CharactersListStore/CharactersListStore';
import { FaSearch } from 'react-icons/fa';
import styled from 'styled-components';

interface SearchBarProps {
  resultsCount: number;
}

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 0 auto;
  margin-bottom: 16px;
  max-width: 1416px;
  padding-left: 48px;
  padding-right: 68px;
  width: 100%;
`;

const SearchWrapper = styled.div`
  align-items: center;
  border-bottom: 1px solid black;
  display: flex;
  gap: 10px;
  padding-bottom: 8px;
`;

const SearchIcon = styled(FaSearch)`
  color: black;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 12px;
`;

const SearchInput = styled.input`
  background-color: #fff;
  border: none;
  color: black;
  flex: 1;
  font-family: roboto-condensed, sans-serif;
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 18.75px;
  outline: none;
  text-transform: uppercase;

  &::placeholder {
    color: #aaa;
  }
`;

const SearchCounter = styled.span`
  color: black;
  font-family: roboto-condensed, sans-serif;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 14.06px;
`;

export const SearchBar: React.FC<SearchBarProps> = ({ resultsCount }) => {
  const { searchCharacters } = useCharacterListStore();

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toUpperCase();
    searchCharacters(value);
  };

  return (
    <SearchContainer>
      <SearchWrapper>
        <SearchIcon />
        <SearchInput type="text" placeholder="SEARCH A CHARACTER..." onChange={handleSearch} />
      </SearchWrapper>
      <SearchCounter>{resultsCount} RESULTS</SearchCounter>
    </SearchContainer>
  );
};

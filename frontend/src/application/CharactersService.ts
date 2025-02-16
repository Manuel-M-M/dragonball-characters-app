import { CharactersRepository } from '../infrastructure/CharactersRepository';

export class CharactersService {
  private charactersRepo: CharactersRepository;

  constructor(charactersRepo: CharactersRepository) {
    this.charactersRepo = charactersRepo;
  }

  async getCharacters(page = 1, limit = 10) {
    return this.charactersRepo.getCharacters(page, limit);
  }

  async getCharacterById(id: number) {
    return this.charactersRepo.getCharacterById(id);
  }
}

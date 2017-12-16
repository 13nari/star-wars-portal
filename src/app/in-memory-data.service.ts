import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 11, name: 'Mr. Nice' },
      { id: 12, name: 'Narco' },
      { id: 13, name: 'Bombasto' },
      { id: 14, name: 'Celeritas' },
      { id: 15, name: 'Magneta' },
      { id: 16, name: 'RubberMan' },
      { id: 17, name: 'Dynama' },
      { id: 18, name: 'Dr IQ' },
      { id: 19, name: 'Magma' },
      { id: 20, name: 'Tornado' }
    ];
        const starships = [
      { id: 11, name: 'Nave 1' },
      { id: 12, name: 'Nave 2' },
      { id: 13, name: 'Nave 3' },
      { id: 14, name: 'Nave 4' },
      { id: 15, name: 'Nave 5' },
      { id: 16, name: 'Nave 6' },
      { id: 17, name: 'Nave 7' },
      { id: 18, name: 'Nave 8' },
      { id: 19, name: 'Nave 9' },
      { id: 20, name: 'Nave 10' }
    ];
    return {heroes,starships};
  }
}

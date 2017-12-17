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
      { id: 21, name: 'Nave 1' },
      { id: 22, name: 'Nave 2' },
      { id: 23, name: 'Nave 3' },
      { id: 24, name: 'Nave 4' },
      { id: 25, name: 'Nave 5' },
      { id: 26, name: 'Nave 6' },
      { id: 27, name: 'Nave 7' },
      { id: 28, name: 'Nave 8' },
      { id: 29, name: 'Nave 9' },
      { id: 30, name: 'Nave 10' }
    ];
    return {heroes,starships};
  }
}

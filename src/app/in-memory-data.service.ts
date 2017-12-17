import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const characters = [
      { id: 11, name: 'Luke Skywalker' },
      { id: 12, name: 'C-3PO' },
      { id: 13, name: 'R2-D2' },
      { id: 14, name: 'Darth Vader' },
      { id: 15, name: 'Leia Organa' },
      { id: 16, name: 'Owen Lars' },
      { id: 17, name: 'Beru Whitesun lars' },
      { id: 18, name: 'R5-D4' },
      { id: 19, name: 'Biggs Darklighter' },
      { id: 20, name: 'Obi-Wan Kenobi' }
    ];
        const starships = [
      { id: 21, name: 'CR90 corvette' },
      { id: 22, name: 'Star Destroyer' },
      { id: 23, name: 'Sentinel-class landing craft' },
      { id: 24, name: 'Death Star' }
    ];
    return {characters,starships};
  }
}

import { Component, OnInit } from '@angular/core';

import { Pilot } from '../pilot';
import { PilotService } from '../pilot.service';

@Component({
  selector: 'app-pilots',
  templateUrl: './pilots.component.html',
  styleUrls: ['./pilots.component.css']
})
export class PilotsComponent implements OnInit {
  
  pilots: Pilot[];

  constructor(private pilotService: PilotService) { }

  ngOnInit() {
    this.getPilots();
  }

  getPilots(): void {
    this.pilotService.getPilots()
    .subscribe(pilots => this.pilots = pilots);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.pilotService.addPilot({ name } as Pilot)
      .subscribe(pilot => {
        this.pilots.push(pilot);
      });
  }

  delete(pilot: Pilot): void {
    this.pilots = this.pilots.filter(h => h !== pilot);
    this.pilotService.deletePilot(pilot).subscribe();
  }

}

import { Component } from '@angular/core';

@Component({
  selector: 'ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent {
  public title: string = 'Hello World';
  public description: string = 'What up!';

  sayDescription() {
    console.log(this.description);
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrl: './testing.component.css'
})
export class TestingComponent {
  m = 4
  number = 2;
  addition() {
    this.number = 2 + 2
  }

  substraction(m: any) {

    return m * m;
  }

}

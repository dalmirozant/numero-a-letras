import { Component } from '@angular/core';
import { NumANomComponent } from '../../../num-a-nom/src/lib/num-a-nom.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NumANomComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  resultado: string = '';
}

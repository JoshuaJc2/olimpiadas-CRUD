import { Component } from '@angular/core';
import { SharedModule } from '../../../../shared/shares-module';
import { SwalMessages } from '../../../../shared/swal-messages';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  swal : SwalMessages = new SwalMessages();

  constructor(){}

  ngOnInit(){}
}

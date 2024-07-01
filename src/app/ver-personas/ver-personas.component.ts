import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ver-personas',
  standalone: true,
  imports: [],
  templateUrl: './ver-personas.component.html',
  styleUrl: './ver-personas.component.css'
})
export class VerPersonasComponent {

  constructor(private router: Router) {}

  logout() {
    localStorage.clear();
    this.router.navigate(['']);
  }
}

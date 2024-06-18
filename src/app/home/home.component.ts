import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TestService } from '../service/Test.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  tests: any[] = [];

  constructor(private router: Router, private testService: TestService) {}

  ngOnInit() {
    this.testService.getTests().subscribe((data: any) => {
      this.tests = data.data;
    });
  }

  guardarTestId(testid: number) {
    localStorage.setItem('testid', testid.toString());
  }
  
  
  logout() {
    localStorage.clear();
    this.router.navigate(['']);
  }

}

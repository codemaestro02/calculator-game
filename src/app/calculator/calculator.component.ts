import {Component, OnInit} from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {CalculatorService} from "../calculator.service";

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css'
})
export class CalculatorComponent implements OnInit {
  gameForm: FormGroup;
  currentQuestion: string = '';

  constructor(private fb: FormBuilder, private calculatorService: CalculatorService, private toastr: ToastrService) {
    this.gameForm = this.fb.group({
      answer: ['']
    });
  }

  ngOnInit(): void {
    this.loadNewQuestion();
  }

  loadNewQuestion(): void {
    const question = this.calculatorService.generateQuestion();
    this.currentQuestion = question.question;
  }

  checkAnswer(): void {
    const userAnswer = +this.gameForm.get('answer')?.value;
    if (this.calculatorService.checkAnswer(userAnswer)) {
      this.toastr.success('Correct Answer!', 'Success');
    } else {
      this.toastr.error('Wrong Answer!', 'Try Again');
    }
    this.gameForm.reset();
    this.loadNewQuestion();
  }

  get correctCount(): number {
    return this.calculatorService.correctCount;
  }

  get incorrectCount(): number {
    return this.calculatorService.incorrectCount;
  }
}

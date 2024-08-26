import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  correctCount: number = 0;
  incorrectCount: number = 0;
  correctAnswer: number = 0;

  constructor() { }

  generateQuestion(): { question: string, answer: number } {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    this.correctAnswer = num1 + num2;
    return { question: `${num1} + ${num2} = ?`, answer: this.correctAnswer };
  }

  checkAnswer(userAnswer: number): boolean {
    if (userAnswer === this.correctAnswer) {
      this.correctCount++;
      return true;
    } else {
      this.incorrectCount++;
      return false;
    }
  }
}

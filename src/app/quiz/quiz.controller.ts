import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { QuizService } from './quiz.service';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Get()
  findAll() {
    return this.quizService.findAll();
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.quizService.findById(id);
  }

  @Post(':id/submit')
  submit(
    @Param('id', ParseIntPipe) quizId: number,
    @Body()
    body: {
      userId: number;
      answers: { questionId: number; answer: boolean }[];
    },
  ) {
    return this.quizService.submit(quizId, body.userId, body.answers);
  }

  @Get(':id/results')
  getResults(@Param('id', ParseIntPipe) id: number) {
    return this.quizService.getResults(id);
  }
}

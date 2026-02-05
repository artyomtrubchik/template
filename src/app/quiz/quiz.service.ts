import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '@/app/prisma/prisma.service';

interface SubmitAnswerDto {
  questionId: number;
  answer: boolean;
}

@Injectable()
export class QuizService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.quiz.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        createdAt: true,
        _count: { select: { questions: true } },
      },
    });
  }

  async findById(id: number) {
    const quiz = await this.prisma.quiz.findUnique({
      where: { id },
      include: {
        questions: {
          orderBy: { order: 'asc' },
          select: {
            id: true,
            text: true,
            order: true,
          },
        },
      },
    });

    if (!quiz) {
      throw new NotFoundException('Quiz not found');
    }

    return quiz;
  }

  async submit(quizId: number, userId: number, answers: SubmitAnswerDto[]) {
    const quiz = await this.prisma.quiz.findUnique({
      where: { id: quizId },
      include: { questions: true },
    });

    if (!quiz) {
      throw new NotFoundException('Quiz not found');
    }

    if (!answers || answers.length === 0) {
      throw new BadRequestException('Answers required');
    }

    let score = 0;
    const results = answers.map((a) => {
      const question = quiz.questions.find((q) => q.id === a.questionId);

      if (!question) {
        throw new BadRequestException(`Question ${a.questionId} not found`);
      }

      const correct = question.correctAnswer === a.answer;
      if (correct) score++;

      return {
        questionId: a.questionId,
        answer: a.answer,
        correct,
      };
    });

    await this.prisma.quizResult.create({
      data: {
        quizId,
        userId,
        score,
        total: quiz.questions.length,
        answers: results,
      },
    });

    return {
      score,
      total: quiz.questions.length,
      results,
    };
  }

  async getResults(quizId: number) {
    return this.prisma.quizResult.findMany({
      where: { quizId },
      orderBy: { score: 'desc' },
      take: 10,
      include: {
        user: {
          select: { id: true, userName: true },
        },
      },
    });
  }
}

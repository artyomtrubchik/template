import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/app/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findById(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async create(data: { userName: string; email?: string }) {
    return this.prisma.user.create({ data });
  }
}

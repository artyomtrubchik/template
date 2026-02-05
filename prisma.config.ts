import path from 'node:path';
import type { PrismaConfig } from 'prisma';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

export default {
  earlyAccess: true,
  schema: path.join('prisma', 'schema.prisma'),
} satisfies PrismaConfig<any>;

import { CheckLintExecutorSchema } from './schema';

export default async function runExecutor(
  options: CheckLintExecutorSchema,
) {
  console.log('Executor ran for CheckLint', options);
  return {
    success: true
  };
}


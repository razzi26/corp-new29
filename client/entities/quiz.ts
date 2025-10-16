export interface QuizMeta {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  skillLevel: string;
  durationMinutes: number;
  questionCount: number;
  image?: { url: string; alt?: string };
}

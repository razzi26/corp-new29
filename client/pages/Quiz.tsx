import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PageBanner } from "@/components/layout/PageBanner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { LoadingIndicator } from "@/components/ui/loading-indicator";
import { cn } from "@/lib/utils";

interface QuizOption {
  id: string;
  label: string;
}

interface QuizQuestion {
  id: string;
  prompt: string;
  options: QuizOption[];
  answerId: string;
  explanation: string;
}

interface QuizData {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  skillLevel: string;
  durationMinutes: number;
  questionCount: number;
  questions: QuizQuestion[];
}

function formatDuration(seconds: number) {
  const mins = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const secs = (seconds % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
}

export default function Quiz() {
  const { slug } = useParams();
  const [quiz, setQuiz] = useState<QuizData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (!slug) return;
    let mounted = true;
    const controller = new AbortController();

    (async () => {
      try {
        const response = await fetch("/data/quizzes.json", {
          cache: "no-store",
          credentials: "same-origin",
          headers: { Accept: "application/json" },
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error(`Failed to load quiz (${response.status})`);
        }
        const data: QuizData[] = await response.json();
        const found = data.find((item) => item.slug === slug) ?? null;
        if (!found) {
          throw new Error("Quiz not found");
        }
        if (mounted) {
          setQuiz(found);
          setError(null);
        }
      } catch (e: any) {
        if (e?.name === "AbortError") return;
        if (mounted) {
          setError(String(e));
          setQuiz(null);
        }
      }
    })();

    return () => {
      mounted = false;
      controller.abort();
    };
  }, [slug]);

  useEffect(() => {
    if (!quiz || isFinished) return;
    const id = window.setInterval(() => {
      setSecondsElapsed((prev) => prev + 1);
    }, 1000);
    return () => window.clearInterval(id);
  }, [quiz, isFinished]);

  useEffect(() => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setHasAnswered(false);
    setIsCorrect(null);
    setScore(0);
    setSecondsElapsed(0);
    setIsFinished(false);
  }, [quiz?.slug]);

  const currentQuestion = useMemo(() => {
    if (!quiz) return null;
    return quiz.questions[currentIndex] ?? null;
  }, [quiz, currentIndex]);

  const progressValue = useMemo(() => {
    if (!quiz) return 0;
    return ((currentIndex) / quiz.questions.length) * 100;
  }, [quiz, currentIndex]);

  const totalQuestions = quiz?.questions.length ?? 0;
  const isLastQuestion = currentIndex === totalQuestions - 1;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!quiz || !currentQuestion || !selectedOption || hasAnswered) return;
    const correct = selectedOption === currentQuestion.answerId;
    setHasAnswered(true);
    setIsCorrect(correct);
    if (correct) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (!quiz) return;
    if (isLastQuestion) {
      setIsFinished(true);
      return;
    }
    setCurrentIndex((prev) => Math.min(prev + 1, quiz.questions.length - 1));
    setSelectedOption(null);
    setHasAnswered(false);
    setIsCorrect(null);
  };

  if (error) {
    return (
      <div className="bg-white text-slate-900">
        <PageBanner
          title="Quiz unavailable"
          description="We could not load this quiz. Please return to the quizzes library and try again."
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Knowledge Hub", href: "/resources" },
            { label: "Quizzes", href: "/resources/quizzes" },
          ]}
        />
        <div className="container mx-auto px-4 py-12">
          <p className="text-sm text-red-600">{error}</p>
          <Button asChild className="mt-6">
            <Link to="/resources/quizzes">Back to quizzes</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (!quiz || !currentQuestion) {
    return (
      <div className="bg-white text-slate-900">
        <PageBanner
          title="Loading quiz"
          description="Preparing your interactive assessment."
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Knowledge Hub", href: "/resources" },
            { label: "Quizzes", href: "/resources/quizzes" },
          ]}
        />
        <LoadingIndicator label="Loading quiz" />
      </div>
    );
  }

  if (isFinished && hasAnswered) {
    return (
      <div className="bg-white text-slate-900">
        <PageBanner
          title={quiz.title}
          description={quiz.subtitle}
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Knowledge Hub", href: "/resources" },
            { label: "Quizzes", href: "/resources/quizzes" },
            { label: quiz.title },
          ]}
        />
        <section className="container mx-auto px-4 py-12 md:py-16">
          <Card className="max-w-3xl">
            <CardContent className="space-y-6 p-8 text-center">
              <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
                Quiz complete
              </p>
              <h2 className="text-3xl font-semibold text-slate-900">
                You answered {score} of {totalQuestions} correctly
              </h2>
              <p className="text-slate-600">
                Total time: <span className="font-semibold text-slate-900">{formatDuration(secondsElapsed)}</span>
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  onClick={() => {
                    setCurrentIndex(0);
                    setSelectedOption(null);
                    setHasAnswered(false);
                    setIsCorrect(null);
                    setScore(0);
                    setSecondsElapsed(0);
                    setIsFinished(false);
                  }}
                  className="bg-[#003a68] hover:bg-[#003a68]/90 focus-visible:ring-[#003a68]/40"
                >
                  Retake quiz
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-[#003a68] text-[#003a68] hover:bg-[#003a68]/10 hover:text-[#003a68] focus-visible:ring-[#003a68]/40"
                >
                  <Link to="/resources/quizzes">Back to quizzes</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    );
  }

  return (
    <div className="bg-white text-slate-900">
      <PageBanner
        title={quiz.title}
        description={quiz.subtitle}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Knowledge Hub", href: "/resources" },
          { label: "Quizzes", href: "/resources/quizzes" },
          { label: quiz.title },
        ]}
      />

      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <Link
            to="/resources/quizzes"
            className="text-sm font-medium text-[#003a68] hover:underline"
          >
            ← Back to all quizzes
          </Link>
          <div className="text-sm font-medium text-slate-600">
            Time: <span className="font-semibold text-slate-900">{formatDuration(secondsElapsed)}</span>
          </div>
        </div>

        <Card className="mx-auto max-w-3xl">
          <CardContent className="space-y-8 p-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm font-medium text-slate-600">
                <span>
                  Question {currentIndex + 1} of {totalQuestions}
                </span>
                <span>
                  Score: {score}/{totalQuestions}
                </span>
              </div>
              <Progress value={progressValue} className="h-2" />
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <fieldset className="space-y-3" disabled={hasAnswered}>
                <legend className="text-xl font-semibold text-slate-900">
                  {currentQuestion.prompt}
                </legend>
                {currentQuestion.options.map((option) => {
                  const isSelected = selectedOption === option.id;
                  const isCorrectOption = hasAnswered && option.id === currentQuestion.answerId;
                  const isIncorrectSelection =
                    hasAnswered && isSelected && option.id !== currentQuestion.answerId;

                  return (
                    <label
                      key={option.id}
                      className={cn(
                        "flex cursor-pointer items-start gap-3 rounded-lg border px-4 py-3 text-slate-700 transition-colors",
                        isSelected && !hasAnswered && "border-[#003a68] bg-[#003a68]/10",
                        isCorrectOption && "border-green-500 bg-green-50",
                        isIncorrectSelection && "border-red-500 bg-red-50 text-red-700",
                      )}
                    >
                      <input
                        type="radio"
                        name="quiz-option"
                        value={option.id}
                        checked={isSelected}
                        onChange={() => setSelectedOption(option.id)}
                        className="mt-1 h-4 w-4 border-slate-300 text-[#003a68] focus:ring-[#003a68]"
                        required
                      />
                      <span className="text-base leading-6">{option.label}</span>
                    </label>
                  );
                })}
              </fieldset>

              {hasAnswered && !isCorrect && currentQuestion.explanation && (
                <div className="rounded-lg border border-amber-400 bg-amber-50 p-4 text-sm text-amber-900">
                  <span className="font-semibold">Explanation:</span> {currentQuestion.explanation}
                </div>
              )}

              <CardFooter className="flex flex-col gap-3 px-0">
                {!hasAnswered && (
                  <Button
                    type="submit"
                    disabled={!selectedOption}
                    className="w-full md:w-auto bg-[#003a68] hover:bg-[#003a68]/90 focus-visible:ring-[#003a68]/40"
                  >
                    Submit
                  </Button>
                )}
                {hasAnswered && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleNext}
                    className="w-full md:w-auto border-[#003a68] text-[#003a68] hover:bg-[#003a68]/10 hover:text-[#003a68] focus-visible:ring-[#003a68]/40"
                  >
                    {isLastQuestion ? "Finish quiz" : "Next"}
                  </Button>
                )}
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

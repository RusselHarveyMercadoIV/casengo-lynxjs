// src/utils/quiz.ts

interface Questions {
  [academicStatus: string]: {
    [subject: string]: {
      [difficulty: string]: {
        [category: string]: Array<any>; // Replace `any` with a more specific Question type if available
      };
    };
  };
}

interface FlattenedQuestion {
  id: string;
  question: string;
  choices: string[] | null;
  answer: string;
  rationale: string;
  keyPhrases: string[];
  type:
    | 'multipleChoices'
    | 'sata'
    | 'caseBased'
    | 'sequencing'
    | 'fillInTheBlank';
  subject: string;
  difficulty: 'easy' | 'medium' | 'hard';
  status: string;
}

export function flattenQuestions(
  questions: Questions,
  academicStatus: string,
): FlattenedQuestion[] {
  const level = questions[academicStatus];
  const allQuestions: FlattenedQuestion[] = [];

  Object.keys(level).forEach((subject) => {
    const subjectLevels = level[subject];
    Object.keys(subjectLevels).forEach((difficulty) => {
      const difficultyLevels = subjectLevels[difficulty];
      Object.keys(difficultyLevels).forEach((category) => {
        const questionsArray = difficultyLevels[category];
        if (Array.isArray(questionsArray)) {
          questionsArray.forEach((question) => {
            const choicesArray = question?.choices
              ? Object.values(question.choices)
              : null;
            allQuestions.push({
              id: question.id,
              question: question.question,
              choices: choicesArray as string[] | null,
              answer: question.answer,
              rationale: question.rationale,
              keyPhrases: question.keyPhrases,
              type: category as FlattenedQuestion['type'],
              subject,
              difficulty: difficulty as FlattenedQuestion['difficulty'],
              status: academicStatus,
            });
          });
        }
      });
    });
  });

  return allQuestions;
}

export function swap<T>(
  arr: T[],
  i: number,
  j: number,
  setter: (a: T[]) => void,
) {
  const newArr = [...arr];
  [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  setter(newArr);
}
export function isLetterAnswer(answer: string) {
  return /^[A-Z]$/.test(answer); // Matches a single uppercase letter A-Z
}

export type academicStatusesType = {
  Freshman: string;
  Sophomore: string;
  Junior: string;
  Senior: string;
  'Recent Graduate': string;
};

export type adNoticeType = {
  'Google Search': string;
  Facebook: string;
  Youtube: string;
  'Friends/family': string;
  Others: string;
};

export type comittmentsType = {
  '3 min / day': string;
  '10 min / day': string;
  '15 min / day': string;
  '30 min / day': string;
};

// Academic status types
export type AcademicStatus =
  | 'Freshman'
  | 'Sophomore'
  | 'Junior'
  | 'Senior'
  | 'Recent Graduate';

export type profilingDataType = {
  countryExam: 'PNLE' | 'NCLEX-RN' | 'NCLEX-PN' | '';
  appNotice: keyof adNoticeType | '';
  academicStatus: AcademicStatus | '';
  goal:
    | 'Build foundational knowledge'
    | 'Strengthen clinical skills'
    | 'Prepare for PNLE'
    | '';
  comittment: keyof comittmentsType | '';
  start: 'scratch' | 'personalized' | '';
};

// Base question structure
export type QuestionBase = {
  id: string;
  question: string;
  choices: { [key: string]: string }; // Flexible choices
};

// Specific question types
export type MultipleChoiceQuestion = QuestionBase & {
  answer: string;
};

export type CaseBasedQuestion = QuestionBase & {
  answer: string;
};

export type SequencingQuestion = QuestionBase & {
  answer: string[];
};

// Difficulty level structure
export type DifficultyLevel = {
  multipleChoices: MultipleChoiceQuestion[];
  sata: never[]; // Could be removed if unused
  caseBased: CaseBasedQuestion[];
  sequencing: SequencingQuestion[];
};

// Subject structure
export type SubjectType = {
  easy: DifficultyLevel;
  medium: DifficultyLevel;
  hard: DifficultyLevel;
};

// Define difficultyLevel
export type difficultyLevel = 'easy' | 'medium' | 'hard';

export type SelectedQuestion = {
  id: string;
  question: string;
  choices?: string[]; // Array of choice texts (e.g., ["To pump blood", "To exchange gases", ...])
  answer: string | string[]; // String for multiple-choice/case-based, array for sequencing
  rationale: string;
  keyPhrases: string[];
  type:
    | 'multipleChoices'
    | 'sata'
    | 'caseBased'
    | 'sequencing'
    | 'fillInTheBlank'; // Question category
  subject: string; // e.g., "anatomyAndPhysiology"
  difficulty: 'easy' | 'medium' | 'hard';
};

// Main quiz type
export type QuizType = {
  questions: QuestionsType;
  academicStatus: AcademicStatus;
};

export type QuestionsType = {
  Freshman: {
    anatomyAndPhysiology: SubjectType;
    microbiology: SubjectType;
    fundamentalsOfNursing: SubjectType;
    pharmacology: SubjectType;
    communityHealthNursing: SubjectType;
    maternalAndChildHealthNursing: SubjectType;
    medicalSurgicalNursing: SubjectType;
    psychiatricNursing: SubjectType;
  };
  Sophomore: Record<string, SubjectType>;
  Junior: Record<string, SubjectType>;
  Senior: Record<string, SubjectType>;
  'Recent Graduate': Record<string, SubjectType>;
};

export type RootStackParamList = {
  home: undefined;
  quiz: {
    questions: QuestionsType;
    academicStatus: AcademicStatus;
  };
  // Add other routes as needed, e.g., profile: { userId: string };
};

export type SubjectColorsType = {
  anatomyAndPhysiology: '#ed7d2d';
  microbiology: '#8353e2';
  fundamentalsOfNursing: '#1dd75b';
  pharmacology: '#676767';
  communityHealthNursing: '#379ae6';
  maternalAndChildHealthNursing: '#de3b40';
  medicalSurgicalNursing: '#00bdd6';
  psychiatricNursing: '#efb034';
};

export type SequenceItem = {
  id: string;
  text: string;
};

export type AnswerRecord = {
  question: SelectedQuestion;
  userAnswer: any;
  isCorrect: boolean;
};

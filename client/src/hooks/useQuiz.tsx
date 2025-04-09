// src/hooks/useQuiz.ts
import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { flattenQuestions, swap } from '../utils/quiz.js';
import type {
  AnswerRecord,
  SelectedQuestion,
  SequenceItem,
} from '../types/types.js';

export function useQuiz({
  questions,
  academicStatus,
  type,
}: {
  questions: any;
  academicStatus: string;
  type: string;
}) {
  const navigate = useNavigate();

  const [items, setItems] = useState<SelectedQuestion[]>([]);
  const [userAnswers, setUserAnswers] = useState<AnswerRecord[]>([]);
  const [sequence, setSequence] = useState<SequenceItem[]>([]);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [anim, setAnim] = useState<{
    direction: 'left' | 'right' | null;
    showingBack: boolean;
  } | null>(null);

  // Flatten questions on mount
  useEffect(() => {
    const all: any[] = flattenQuestions(questions, academicStatus);
    setItems(all);
  }, [questions, academicStatus]);

  const current = items[0] ?? null;

  // init sequence for sequencing questions
  useEffect(() => {
    if (current?.type === 'sequencing' && current.choices) {
      setSequence(
        current.choices.map((t, i) => ({ id: `${current.id}-${i}`, text: t })),
      );
    }
    setSelectedChoice(null);
    setSelectedId(null);
  }, [current]);

  const finish = (isCorrect: boolean, userAnswer: any) => {
    if (current) {
      setUserAnswers((a) => [
        ...a,
        { question: current, isCorrect, userAnswer },
      ]);
      setAnim({ direction: isCorrect ? 'right' : 'left', showingBack: true });
      setTimeout(() => {
        setAnim({ direction: null, showingBack: true });
        setSelectedChoice(null);
        // advance
        // setItems((qs) => {
        //   const rest = qs.slice(1);
        //   if (!rest.length && type === 'diagnostic') {
        //     navigate('/diagnostic-result', { state: { userAnswers } });
        //   }
        //   return rest;
        // });
      }, 500);
    }
  };

  const selectChoice = (choice: string, idx: number) => {
    setSelectedChoice(idx);
    // compute correctness...
    if (current) {
      setSelectedChoice(idx);

      if (Array.isArray(current.answer)) {
        setTimeout(() => {
          finish(false, null);
        }, 700);
        return;
      }

      let answer = '';
      if (current.answer.length === 1) {
        answer = current.answer[0] as string;
      }

      const isLetterAnswer = /^[A-Za-z]$/.test(answer);

      let isCorrect = false;
      let userAnswer: string;

      if (choice === "I don't know") {
        isCorrect = false;
        userAnswer = "I don't know";
      } else if (isLetterAnswer) {
        userAnswer = String.fromCharCode(65 + idx);
        isCorrect = userAnswer === answer.toUpperCase();
      } else {
        userAnswer = choice;
        isCorrect = choice === answer;
      }
      setTimeout(() => finish(isCorrect, userAnswer), 50);
    }
  };

  const confirmSequence = () => {
    if (current && current.type === 'sequencing' && current.choices !== null) {
      const currentSequence = sequence.map((item) => {
        const originalIndex = current?.choices?.findIndex(
          (choice) => choice === item.text,
        );
        return String.fromCharCode(97 + originalIndex!);
      });

      const isCorrect =
        JSON.stringify(currentSequence) === JSON.stringify(current.answer);

      finish(isCorrect, currentSequence);
    } else {
      finish(false, null);
    }
  };

  const handleCardPress = () => {
    setItems((prevItems) => {
      const remainingItems = prevItems.slice(1);
      if (remainingItems.length === 0 && type === 'diagnostic') {
        navigate('/diagnostic-result', { state: { userAnswers } });
      }
      return remainingItems;
    });
    setAnim((prev) =>
      prev ? { direction: prev.direction, showingBack: false } : null,
    );
  };

  const moveUp = (i: number) => swap(sequence, i, i - 1, setSequence);
  const moveDown = (i: number) => swap(sequence, i, i + 1, setSequence);

  const steps = useMemo(
    () => items.map((q, i) => ({ id: q.id, label: `Q${i + 1}`, data: q })),
    [items],
  );

  return {
    items,
    current,
    sequence,
    steps,
    anim,
    selectedChoice,
    selectedId,
    finish,
    selectChoice,
    confirmSequence,
    moveUp,
    moveDown,
    setSelectedId,
    handleCardPress,
  };
}

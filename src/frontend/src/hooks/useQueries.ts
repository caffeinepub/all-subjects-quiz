import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import type { Answer } from "../backend.d.ts";
import { useActor } from "./useActor";

// Auto-initialize: runs initialize() once actor is ready, then invalidates subjects
export function useAutoInitialize() {
  const { actor, isFetching } = useActor();
  const initialized = useRef(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!actor || isFetching || initialized.current) return;
    initialized.current = true;
    actor.initialize().finally(() => {
      queryClient.invalidateQueries({ queryKey: ["subjects"] });
    });
  }, [actor, isFetching, queryClient]);
}

export function useSubjects() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["subjects"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.getSubjects();
      return result ?? [];
    },
    enabled: !!actor && !isFetching,
    staleTime: 5 * 60 * 1000,
    retry: 5,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 8000),
  });
}

export function useSubjectQuizzes(subjectId: bigint | null) {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["quizzes", subjectId?.toString()],
    queryFn: async () => {
      if (!actor || subjectId === null) return [];
      return actor.getSubjectQuizzes(subjectId);
    },
    enabled: !!actor && !isFetching && subjectId !== null,
    staleTime: 10 * 60 * 1000,
    retry: 3,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 10000),
  });
}

export function useQuizQuestions(quizId: bigint | null) {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["questions", quizId?.toString()],
    queryFn: async () => {
      if (!actor || quizId === null) return [];
      return actor.getQuizQuestions(quizId);
    },
    enabled: !!actor && !isFetching && quizId !== null,
    staleTime: 10 * 60 * 1000,
    retry: 3,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 10000),
  });
}

export function useSubmitQuiz() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      quizId,
      answers,
    }: {
      quizId: bigint;
      answers: Array<Answer>;
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.submitQuizAnswers(quizId, answers);
    },
  });
}

export function useInitialize() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.initialize();
    },
  });
}

import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Quiz {
    id: bigint;
    name: string;
    subjectId: bigint;
    questions: Array<Question>;
}
export interface Answer {
    questionId: bigint;
    selectedOption: bigint;
}
export interface QuizResult {
    detailedResults: Array<DetailedResult>;
    incorrectCount: bigint;
    correctCount: bigint;
    percentage: number;
}
export interface Question {
    id: bigint;
    correctOption: bigint;
    questionText: string;
    options: Array<string>;
}
export interface DetailedResult {
    correctOption: bigint;
    isCorrect: boolean;
    questionId: bigint;
    selectedOption: bigint;
}
export interface Subject {
    id: bigint;
    name: string;
}
export interface backendInterface {
    getQuizQuestions(quizId: bigint): Promise<Array<Question>>;
    getSubjectQuizzes(subjectId: bigint): Promise<Array<Quiz>>;
    getSubjects(): Promise<Array<Subject>>;
    initialize(): Promise<void>;
    submitQuizAnswers(quizId: bigint, answers: Array<Answer>): Promise<QuizResult>;
}

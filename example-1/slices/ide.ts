import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IdeState {
    isLoading: boolean;
    syllabusIsLoading: boolean;
    questionError: string;
    isQuestionLoading: boolean;
    error: string;
    syllabusError: string;
    success: boolean;
    currentLesson: Record<string, any>;
    currentQuestion: Record<string, any>;
    syllabus: Record<string, any>[];
    currentProgress: number;
    floatingProgress: number;
    courseId: string;
    courseName: string;
    questionImgUrl?: string;
    progressError?: string;
    attemptError?: string;
    downloadMaterialError?: string;
    certificationError?: string;
    codeCheckError?: string;
    correctAnswers: number;
    quizFinished: boolean;
    answerChecking: boolean;
    timeUp?: boolean;
    htmlValue: string;
    cssValue: string;
    jsValue: Record<string, string>;
    pythonValue: Record<string, string>;
    inputValues: string[];
    readyToCertify: boolean;
    checkCertificationLoading: boolean;
    certification: Record<string, string | number>;
    codeRunning?: boolean;
    codeCheckResult: Record<string, string>;
    quizAttempts: Record<string, number>;
    frozen?: boolean;
}

const initialState: IdeState = {
    isLoading: true,
    syllabusIsLoading: true,
    isQuestionLoading: true,
    error: "",
    syllabusError: "",
    questionError: "",
    success: false,
    currentLesson: {},
    currentQuestion: {},
    syllabus: [],
    currentProgress: 1,
    floatingProgress: 1,
    courseId: "",
    courseName: "",
    correctAnswers: 0,
    quizFinished: false,
    answerChecking: false,
    htmlValue: "",
    cssValue: "",
    jsValue: {},
    pythonValue: {},
    inputValues: [],
    readyToCertify: false,
    checkCertificationLoading: true,
    certification: {},
    codeCheckResult: {},
    quizAttempts: {},
};

const ideSlice = createSlice({
    name: "ide",
    initialState,
    reducers: {
        codeCheckFail(
            state,
            action: PayloadAction<{
                error: string;
            }>
        ) {
            const {
                payload: { error },
            } = action;
            state.codeCheckError = error;
        },
        setCodeCheckResult(
            state,
            action: PayloadAction<{
                result: Record<string, string>;
            }>
        ) {
            const {
                payload: { result },
            } = action;
            state.codeCheckResult = result;
        },
        setCodeRunning(
            state,
            action: PayloadAction<{
                running: boolean;
            }>
        ) {
            const {
                payload: { running },
            } = action;
            state.codeRunning = running;
            if (running) {
                state.codeCheckResult = {};
                state.codeCheckError = undefined;
            }
        },
        setCertificationAvailable(
            state,
            action: PayloadAction<{
                cert: Record<string, string | number>;
            }>
        ) {
            const {
                payload: { cert },
            } = action;
            state.checkCertificationLoading = false;
            state.certification = cert;
        },
        setInputsFromEditor(
            state,
            action: PayloadAction<{
                index: number;
                value: string;
            }>
        ) {
            const {
                payload: { index, value },
            } = action;
            state.inputValues[index] = value;
        },
        setPythonFromEditor(
            state,
            action: PayloadAction<{
                code: string;
                name: string;
            }>
        ) {
            const {
                payload: { code, name },
            } = action;
            state.pythonValue[name] = code;
        },
        setJsFromEditor(
            state,
            action: PayloadAction<{
                code: string;
                name: string;
            }>
        ) {
            const {
                payload: { code, name },
            } = action;
            state.jsValue[name] = code;
        },
        setCssFromEditor(
            state,
            action: PayloadAction<{
                cssValue: string;
            }>
        ) {
            const {
                payload: { cssValue },
            } = action;
            state.cssValue = cssValue;
        },
        setHtmlFromEditor(
            state,
            action: PayloadAction<{
                htmlValue: string;
            }>
        ) {
            const {
                payload: { htmlValue },
            } = action;
            state.htmlValue = htmlValue;
        },
        setAnswerChecking(
            state,
            action: PayloadAction<{
                answerChecking: boolean;
            }>
        ) {
            const {
                payload: { answerChecking },
            } = action;
            state.answerChecking = answerChecking;
        },
        setQuizTimeIsUp(state) {
            state.quizFinished = true;
            state.timeUp = true;
        },
        setQuizFinished(
            state,
            action: PayloadAction<{
                quizFinished: boolean;
            }>
        ) {
            const {
                payload: { quizFinished },
            } = action;
            state.quizFinished = quizFinished;
        },
        setCorrectAnswer(
            state,
            action: PayloadAction<{
                correctAnswers: number;
            }>
        ) {
            const {
                payload: { correctAnswers },
            } = action;
            state.correctAnswers = correctAnswers;
        },
        getQuestionImgUrl(
            state,
            action: PayloadAction<{
                questionImgUrl: string;
            }>
        ) {
            const {
                payload: { questionImgUrl },
            } = action;
            state.questionImgUrl = questionImgUrl;
        },
        setCurrentCourse(
            state,
            action: PayloadAction<{
                courseId: string;
                courseName: string;
                frozen: boolean | undefined;
            }>
        ) {
            const {
                payload: { courseId, courseName, frozen },
            } = action;
            state.courseId = courseId;
            state.courseName = courseName;
            state.frozen = frozen;
        },
        setFloatingProgress(
            state,
            action: PayloadAction<{
                floatingProgress: number;
            }>
        ) {
            const {
                payload: { floatingProgress },
            } = action;
            state.floatingProgress = floatingProgress;
        },
        updateCurrentProgress(
            state,
            action: PayloadAction<{
                currentProgress: number;
            }>
        ) {
            const {
                payload: { currentProgress },
            } = action;
            state.currentProgress = currentProgress;
        },
        setCurrentProgress(
            state,
            action: PayloadAction<{
                currentProgress: number;
            }>
        ) {
            const {
                payload: { currentProgress },
            } = action;
            state.currentProgress = currentProgress;
        },
        getLessonPending(state) {
            state.isLoading = true;
        },
        getLessonSuccess(
            state,
            action: PayloadAction<{
                currentLesson: Record<string, any>;
            }>
        ) {
            const {
                payload: { currentLesson },
            } = action;
            state.isLoading = false;
            state.currentLesson = currentLesson;
            state.floatingProgress = currentLesson.position;
            state.quizFinished = false;
            state.error = "";
            state.success = true;
            state.pythonValue = {};
            state.jsValue = {};
            state.htmlValue = "";
            state.cssValue = "";
            state.inputValues = [];
            state.certification = {};
            state.checkCertificationLoading = true;
            state.codeCheckResult = {};
        },
        getLessonFail(
            state,
            action: PayloadAction<{
                error: string;
            }>
        ) {
            const {
                payload: { error },
            } = action;
            state.isLoading = false;
            state.error = error;
            state.success = false;
        },
        getSyllabusPending(state) {
            state.syllabusIsLoading = true;
        },
        getSyllabusSuccess(
            state,
            action: PayloadAction<{
                syllabus: Record<string, any>[];
            }>
        ) {
            const {
                payload: { syllabus },
            } = action;
            state.syllabusIsLoading = false;
            state.syllabus = syllabus;
            state.syllabusError = "";
            state.success = true;
        },
        getSyllabusFail(
            state,
            action: PayloadAction<{
                error: string;
            }>
        ) {
            const {
                payload: { error },
            } = action;
            state.syllabusIsLoading = false;
            state.syllabusError = error;
            state.success = false;
        },
        getQuestionPending(state) {
            state.isQuestionLoading = true;
            state.questionImgUrl = undefined;
        },
        getQuestionSuccess(
            state,
            action: PayloadAction<{
                currentQuestion: Record<string, any>;
            }>
        ) {
            const {
                payload: { currentQuestion },
            } = action;
            state.isQuestionLoading = false;
            state.currentQuestion = currentQuestion;
            state.questionError = "";
            state.success = true;
        },
        getQuestionFail(
            state,
            action: PayloadAction<{
                error: string;
            }>
        ) {
            const {
                payload: { error },
            } = action;
            state.isQuestionLoading = false;
            state.questionError = error;
            state.success = false;
        },
        updateCurrentProgressFail(
            state,
            action: PayloadAction<{
                error: string;
            }>
        ) {
            const {
                payload: { error },
            } = action;
            state.progressError = error;
        },
        addQuizAttemptFail(
            state,
            action: PayloadAction<{
                error: string;
            }>
        ) {
            const {
                payload: { error },
            } = action;
            state.attemptError = error;
        },
        downloadMaterialFail(
            state,
            action: PayloadAction<{
                error: string;
            }>
        ) {
            const {
                payload: { error },
            } = action;
            state.downloadMaterialError = error;
        },
        updateCertificationFail(
            state,
            action: PayloadAction<{
                error: string;
            }>
        ) {
            const {
                payload: { error },
            } = action;
            state.certificationError = error;
            state.checkCertificationLoading = false;
        },
        setQuizAttempts(
            state,
            action: PayloadAction<{
                quizAttempts: Record<string, number>;
            }>
        ) {
            const {
                payload: { quizAttempts },
            } = action;
            state.quizAttempts = quizAttempts;
        },
        setQuizAttempt(
            state,
            action: PayloadAction<{
                currentAttempt: number;
                lesson: string;
            }>
        ) {
            const {
                payload: { currentAttempt, lesson },
            } = action;
            state.quizAttempts[lesson] = currentAttempt + 1;
            state.correctAnswers = 0;
        },
        setReadyToCertify(
            state,
            action: PayloadAction<{
                ready: boolean;
            }>
        ) {
            const {
                payload: { ready },
            } = action;
            state.readyToCertify = ready;
        },
    },
});

export const {
    setQuizAttempts,
    codeCheckFail,
    setCodeCheckResult,
    setCodeRunning,
    setCertificationAvailable,
    setReadyToCertify,
    setInputsFromEditor,
    setJsFromEditor,
    setPythonFromEditor,
    setCssFromEditor,
    setHtmlFromEditor,
    setQuizTimeIsUp,
    setAnswerChecking,
    updateCurrentProgressFail,
    updateCurrentProgress,
    setQuizFinished,
    setCorrectAnswer,
    getQuestionImgUrl,
    setFloatingProgress,
    setCurrentCourse,
    setCurrentProgress,
    getLessonPending,
    getLessonSuccess,
    getLessonFail,
    getSyllabusPending,
    getSyllabusSuccess,
    getSyllabusFail,
    getQuestionPending,
    getQuestionSuccess,
    getQuestionFail,
    addQuizAttemptFail,
    setQuizAttempt,
    updateCertificationFail,
    downloadMaterialFail,
} = ideSlice.actions;

export default ideSlice.reducer;

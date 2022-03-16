import {
    getQuestionImgUrl,
    getLessonPending,
    getLessonSuccess,
    getLessonFail,
    getSyllabusPending,
    getSyllabusSuccess,
    getSyllabusFail,
    getQuestionPending,
    getQuestionSuccess,
    getQuestionFail,
    updateCurrentProgressFail,
    updateCurrentProgress,
    addQuizAttemptFail,
    updateCertificationFail,
    setCertificationAvailable,
    setReadyToCertify,
    downloadMaterialFail,
    setCodeRunning,
    setCodeCheckResult,
    codeCheckFail,
} from "../slices/ide";

import { freezeCourseProgress } from "../slices/profile";

import {
    getCurrentLesson,
    getSyllabus,
    getQuestion,
    getImgUrl,
    getMaterialUrl,
    changeCurrentProgress,
    addQuizAttempt,
    updateCertification,
    loadCertification,
    createCertification,
    checkCode,
} from "../../api/ide";

import type { AppDispatch } from "../store";

export const CurrentLesson =
    (course_id: string, lesson: string) =>
    async (dispatch: AppDispatch): Promise<void> => {
        try {
            dispatch(getLessonPending());
            await getCurrentLesson(course_id, lesson).then(
                (result) => {
                    const currentLesson = result as Record<string, any>;
                    dispatch(getLessonSuccess({ currentLesson }));
                },
                (error) => {
                    dispatch(getLessonFail({ error: error.message }));
                }
            );
        } catch (error) {
            dispatch(getLessonFail({ error: error.message }));
        }
    };

export const Syllabus =
    (course_id: string) =>
    async (dispatch: AppDispatch): Promise<void> => {
        try {
            dispatch(getSyllabusPending());
            await getSyllabus(course_id).then(
                (result) => {
                    const syllabus = result as Record<string, any>[];
                    dispatch(getSyllabusSuccess({ syllabus }));
                },
                (error) => {
                    dispatch(getSyllabusFail({ error: error.message }));
                }
            );
        } catch (error) {
            dispatch(getSyllabusFail({ error: error.message }));
        }
    };

export const CurrentQuestion =
    (course_id: string, lesson: string, question: string) =>
    async (dispatch: AppDispatch): Promise<void> => {
        try {
            dispatch(getQuestionPending());
            await getQuestion(course_id, lesson, question).then(
                async (result) => {
                    const currentQuestion = result as Record<string, any>;
                    if (currentQuestion.img) {
                        const res: Record<string, any> = await getImgUrl(
                            currentQuestion.img
                        );
                        if (res.status === "success") {
                            dispatch(
                                getQuestionImgUrl({ questionImgUrl: res.url })
                            );
                        }
                    }
                    dispatch(getQuestionSuccess({ currentQuestion }));
                },
                (error) => {
                    dispatch(getQuestionFail({ error: error.message }));
                }
            );
        } catch (error) {
            dispatch(getQuestionFail({ error: error.message }));
        }
    };

export const DownloadMaterial =
    (link: string) =>
    async (dispatch: AppDispatch): Promise<void> => {
        try {
            // dispatch(getQuestionPending());

            const res: Record<string, any> = await getMaterialUrl(link);
            if (res.status === "success") {
                const l = document.createElement("a");
                if (l.download !== undefined) {
                    l.setAttribute("href", res.url);
                    l.setAttribute("target", "_blank");
                    l.style.visibility = "hidden";
                    document.body.appendChild(l);
                    l.click();
                    document.body.removeChild(l);
                }
            }
        } catch (error) {
            console.log(error);
            dispatch(downloadMaterialFail({ error: error.message }));
        }
    };

export const UpdateCurrentProgress =
    (
        courseName: string,
        uid: string,
        data: Record<string, string | number>,
        position: number
    ) =>
    async (dispatch: AppDispatch): Promise<void> => {
        try {
            await changeCurrentProgress(courseName, uid, data).then(
                (result) => {
                    const res: Record<string, any> = result as any;
                    if (res.status === "frozen") {
                        dispatch(
                            freezeCourseProgress({
                                courseName,
                                progress: res.progress,
                            })
                        );
                    } else {
                        dispatch(
                            updateCurrentProgress({
                                currentProgress: position + 1,
                            })
                        );
                    }
                },
                (error) => {
                    dispatch(
                        updateCurrentProgressFail({ error: error.message })
                    );
                }
            );
        } catch (error) {
            dispatch(updateCurrentProgressFail({ error: error.message }));
        }
    };

export const QuizAttempt =
    (
        uid: string,
        result: number,
        attempt: number,
        lesson: string,
        quizzes: Record<string, number>,
        courseName: string,
        group: string
    ) =>
    async (dispatch: AppDispatch): Promise<void> => {
        try {
            await addQuizAttempt(
                uid,
                result,
                attempt,
                lesson,
                quizzes,
                courseName,
                group
            ).then(
                () => {
                    return true;
                },
                (error) => {
                    dispatch(addQuizAttemptFail({ error: error.message }));
                }
            );
        } catch (error) {
            dispatch(addQuizAttemptFail({ error: error.message }));
        }
    };

export const UpdateCertification =
    (uid: string, certification: Record<string, any>) =>
    async (dispatch: AppDispatch): Promise<void> => {
        try {
            await updateCertification(uid, certification).then(
                () => {
                    return true;
                },
                (error) => {
                    dispatch(updateCertificationFail({ error: error.message }));
                }
            );
        } catch (error) {
            dispatch(updateCertificationFail({ error: error.message }));
        }
    };

export const CreateCertification =
    (certification: Record<string, any>) =>
    async (dispatch: AppDispatch): Promise<void> => {
        try {
            await createCertification(certification).then(
                (result) => {
                    const cert = result as Record<string, string | number>;
                    dispatch(setReadyToCertify({ ready: true }));
                    dispatch(
                        setCertificationAvailable({ cert: { id: cert.id } })
                    );
                },
                (error) => {
                    dispatch(updateCertificationFail({ error: error.message }));
                }
            );
        } catch (error) {
            dispatch(updateCertificationFail({ error: error.message }));
        }
    };

export const LoadCertification =
    (uid: string, courseId: string) =>
    async (dispatch: AppDispatch): Promise<void> => {
        try {
            await loadCertification(uid, courseId).then(
                (result) => {
                    const cert = result as Record<string, string | number>;
                    dispatch(setCertificationAvailable({ cert }));
                },
                (error) => {
                    dispatch(updateCertificationFail({ error: error.message }));
                }
            );
        } catch (error) {
            dispatch(updateCertificationFail({ error: error.message }));
        }
    };

export const SkipTask =
    (
        courseName: string,
        syllabus: Record<string, any>[],
        uid: string,
        position: number
    ) =>
    async (dispatch: AppDispatch) => {
        const updatedData: Record<string, string | number> = {};

        updatedData[`progresses.${courseName}.lesson`] = syllabus[position].id;
        updatedData[`progresses.${courseName}.position`] = position + 1;

        await dispatch(
            UpdateCurrentProgress(courseName, uid, updatedData, position)
        );
    };

export const CheckCode =
    (
        passedLessonBefore: boolean,
        answered: boolean,
        data: Record<string, any> | undefined,
        courseId: string,
        courseName: string,
        syllabus: Record<string, any>[],
        uid: string,
        progress: Record<string, any>[],
        position: number
    ) =>
    async (dispatch: AppDispatch) => {
        try {
            dispatch(setCodeRunning({ running: true }));
            const res: Record<string, any> = await checkCode(data);
            console.log(res);
            if (res.status === "success") {
                dispatch(setCodeRunning({ running: false }));
                if (!answered && !passedLessonBefore) {
                    const result: Record<string, string> = { ...res.data };
                    dispatch(setCodeCheckResult({ result }));

                    if (result.status === "Correct") {
                        const updatedData: Record<string, string | number> = {};

                        updatedData[`progresses.${courseName}.lesson`] =
                            syllabus[position].id;
                        updatedData[`progresses.${courseName}.position`] =
                            position + 1;

                        return await dispatch(
                            UpdateCurrentProgress(
                                courseName,
                                uid,
                                updatedData,
                                position
                            )
                        );
                    }
                    return null;
                }

                const result: Record<string, string> = { ...res.data };
                dispatch(setCodeCheckResult({ result }));
                return null;
            }
            dispatch(setCodeRunning({ running: false }));
            dispatch(codeCheckFail({ error: res.error }));
            return null;
        } catch (error) {
            dispatch(setCodeRunning({ running: false }));
            dispatch(codeCheckFail({ error: error.message }));
            return null;
            // dispatch(downloadMaterialFail({ error: error.message }));
        }
    };

import { careerSuccess, careerFail } from "../slices/career";
import {
    coursesSuccess,
    coursesFail,
    coursesFiltered,
    filterApplied,
} from "../slices/courses";
import {
    recentCoursesSuccess,
    recentCoursesFail,
} from "../slices/recentCourses";

import {
    getCareerPaths,
    getRecentCourses,
    getCourses,
} from "../../api/courses";

import type { AppDispatch } from "../store";

export const CareerPaths = () => async (dispatch: AppDispatch) => {
    try {
        await getCareerPaths().then(
            (result) => {
                const careers = result as any;
                dispatch(careerSuccess({ careers }));
            },
            (error) => {
                console.error(error); // Stacktrace
                dispatch(careerFail({ error: error.message }));
            }
        );
    } catch (error) {
        dispatch(careerFail({ error: error.message }));
    }
};

export const RecentCourses = () => async (dispatch: AppDispatch) => {
    try {
        await getRecentCourses().then(
            (result) => {
                const courses = result as any;
                dispatch(recentCoursesSuccess({ courses }));
            },
            (error) => {
                console.error(error); // Stacktrace
                dispatch(recentCoursesFail({ error: error.message }));
            }
        );
    } catch (error) {
        dispatch(recentCoursesFail({ error: error.message }));
    }
};

export const Courses = () => async (dispatch: AppDispatch) => {
    try {
        await getCourses().then(
            (result) => {
                const courses = result as any;
                dispatch(coursesSuccess({ courses }));
            },
            (error) => {
                console.error(error); // Stacktrace
                dispatch(coursesFail({ error: error.message }));
            }
        );
    } catch (error) {
        dispatch(coursesFail({ error: error.message }));
    }
};

// TODO Refactor code
export const FilterCourses =
    (
        allCoursesCopy: any[],
        filter: string,
        subject: string,
        search?: boolean
    ) =>
    (dispatch: AppDispatch) => {
        // Filter out courses by subject and filter
        let filteredCourses;
        if (subject === "all") {
            switch (filter) {
                case "all":
                    dispatch(coursesFiltered({ courses: allCoursesCopy }));
                    if (search) {
                        dispatch(filterApplied({ filtered: true }));
                    } else {
                        dispatch(filterApplied({ filtered: false }));
                    }
                    break;
                case "free":
                    filteredCourses = allCoursesCopy.filter(
                        (course) => course.data.price === 0
                    );
                    dispatch(coursesFiltered({ courses: filteredCourses }));
                    dispatch(filterApplied({ filtered: true }));
                    break;
                case "recents":
                    filteredCourses = allCoursesCopy.sort((a, b) => {
                        return b.data.created - a.data.created;
                    });

                    dispatch(
                        coursesFiltered({
                            courses: filteredCourses.slice(0, 8),
                        })
                    );
                    dispatch(filterApplied({ filtered: true }));
                    break;
                default:
                    break;
            }
        } else {
            dispatch(filterApplied({ filtered: true }));
            switch (filter) {
                case "all":
                    filteredCourses = allCoursesCopy.filter((course) => {
                        return course.data.subjects.includes(subject);
                    });
                    dispatch(coursesFiltered({ courses: filteredCourses }));
                    break;
                case "free":
                    filteredCourses = allCoursesCopy.filter((course) => {
                        return (
                            course.data.price === 0 &&
                            course.data.subjects.includes(subject)
                        );
                    });
                    dispatch(coursesFiltered({ courses: filteredCourses }));
                    break;
                case "recents":
                    filteredCourses = allCoursesCopy
                        .filter((course) => {
                            return course.data.subjects.includes(subject);
                        })
                        .sort((a, b) => {
                            return a.data.created - b.data.created;
                        });

                    dispatch(
                        coursesFiltered({
                            courses: filteredCourses.slice(0, 8),
                        })
                    );
                    break;
                default:
                    filteredCourses = allCoursesCopy.filter((course) => {
                        return course.data.subjects.includes(subject);
                    });
                    dispatch(coursesFiltered({ courses: filteredCourses }));
            }
        }
    };

export default interface PointWeights{
    lk: number, // The weight of a Leistungskurs
    bk: number, // The weight of a Basiskurs
    finalExams: {
        oral: number, // The weight of an oral final exam (Abitursprüfung)
        written: number // The weight of a written final exam (Abitursprüfung)
    },
    writtenExmCourseWeight: number, // The weight of a course in which a written exam is taken
    oralExmCourseWeight: number, // The weight of a course in which an oral exam is taken
}
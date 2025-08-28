import CountryState from "../interfaces/CountryState";
import Course from "../interfaces/Course";
import Exam from "../interfaces/Exam";
import { ManagedCourse } from "./ManagedCourse";

class BW implements CountryState{
    mandatoryCourses: readonly Course[] = [];
    mandatoryNumberOfCourses: number = 42;

    lowPointsTip: string[] = [
        "Du kannst in einem Leistungskurs eine zusätzliche mündliche Prüfung ablegen.",
        "Prüfe, ob du die Kursstufe oder das Abitur freiwillig wiederholen kannst und kläre vorher Auswirkungen auf BAföG und Versicherungen.",
        "Bewirb dich parallel auf duale Studienplätze; hier zählen Unternehmensvertrag und Eignung statt NC.",
        "Starte eine Ausbildung im Wunschbereich und nutze spätere Anrechnungsmöglichkeiten für das Studium."
    ];

    totalPoints(exams: Exam[]): number {
        // Temp
        throw new Error("Method not implemented.");
    };

    nextCourses(currenCourses: ManagedCourse[]): ManagedCourse[] {
        throw new Error("Method not implemented.");
    };

    // change return type to struct pls
    PPE(grade: number): number[] {
        // Temp
        throw new Error("Method not implemented.");
    };
}
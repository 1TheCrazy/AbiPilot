import Course from "../interfaces/Course";
import Exam from "../interfaces/Exam";
import UserCourse from "../interfaces/UserCourse";

export type Field = 'I' | 'II' | 'III' | 'Sports';

export abstract class ManagedCourse implements UserCourse {
    protected _course: Course;
    protected _isLK: boolean;
    protected _isOralExamCourse: boolean;
    protected _writtenWeightPercantage: number;
    protected _exams: Exam[];
    protected _takesPartInQuarters: boolean[];
    protected _field: Field;

    // Access flags (because we don't trust User to do remember that by themself)
    // We could include more (like oral exam restrictions), but those were not included by choice
    public canUserChange = {
        // Reference outer values
        outer: this,

        // We can only change the quarters in which we take part in this course if it's not an LK and not an oral exam course
        get takesPartInQuarters(): boolean { return !this.outer._isLK && !this.outer._isOralExamCourse; },
        // We can never change this, but we show this for full information
        get isWrittenExamCourse(): boolean { return false; },
    }

    constructor(course: Course, isLK: boolean, isOralExamCourse: boolean, takesPartInQuarters: boolean[], exams: Exam[], writtenWeightPerc: number, field: Field){
        this._course = course;
        this._isLK = isLK;
        this._isOralExamCourse = isOralExamCourse;
        this._writtenWeightPercantage = writtenWeightPerc;
        this._exams = exams;
        this._takesPartInQuarters = takesPartInQuarters;
        this._field = field;
    }

    static newObjFrom(from: ManagedCourse): ManagedCourse{
        class tmpImpl extends ManagedCourse {};
        
        return new tmpImpl(from._course, from._isLK, from._isOralExamCourse, from._takesPartInQuarters, from._exams, from._writtenWeightPercantage, from._field);
    }

    // ----------- Fully Managed Methods (because we don't trust User to do ts by themself) -----------
    set isLK(isLK: boolean){
        if(isLK){
            this._isLK = true;
            this._takesPartInQuarters = [true, true, true, true];
        }
        else{
            this._isLK = false;
        }
    }
    get isLK() : boolean { return this._isLK}

    set takesPartInQuarters(quarters: boolean[]){
        //  If we don't take part in all 4 quarters
        if(!(quarters[0] && quarters[1] && quarters[2] && quarters[3])){
            // This should be partially reduntant since the user shouldn't be able to change some this if the values weren't already as set below (enforced by the protection rules -> canUserChange)
            this._isLK = false;
            this._isOralExamCourse = false;
            
            this._takesPartInQuarters = quarters;
        }
        else{
            this._takesPartInQuarters = quarters
        }
    }
    get takesPartInQuarters(): boolean[] { return this._takesPartInQuarters}

    set isOralExamCourse(is: boolean){
        this._isOralExamCourse = is;
        this._takesPartInQuarters = [true, true, true, true]
    }
    get isOralExamCourse(): boolean { return this._isOralExamCourse}

    set writtenWeightPercantage(value: number){
        this._writtenWeightPercantage = value;
    }
    get writtenWeightPercantage(): number { return this._writtenWeightPercantage}

    get isWrittenExamCourse(): boolean { return this._isLK}

    set field(bereich: Field){
        this._field = bereich;
    }
    get field(): Field { return this._field}

    set exams(exams: Exam[]){
        this._exams = exams;
    }
    get exams(): Exam[] { return this._exams}

    // No setter since this can be only set in constructor (it's not that deep...)
    get course(): Course { return this._course}

    // Overwrite toJson for custom serialization
    toJSON() {
        return {
            course: this._course,
            isLK: this._isLK,
            isOralExamCourse: this._isOralExamCourse,
            writtenWeightPercantage: this._writtenWeightPercantage,
            exams: this._exams,
            takesPartInQuarters: this._takesPartInQuarters,
            field: this._field,
        };
    }

    static fromJSON(json: any): ManagedCourse {
        class TmpImpl extends ManagedCourse {}
        
        return new TmpImpl(
            json.course as Course,
            json.isLK,
            json.isOralExamCourse,
            json.writtenWeightPercantage,
            json.exams,
            json.takesPartInQuarters,
            json.field
        );
    }
}
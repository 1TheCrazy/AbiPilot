import ManagedCourse from "../app/client/static/implemented/ManagedCourse"

describe('ManagedCourse', () => {
    const testImplClass = class extends ManagedCourse { };

    test("cannot set takesPartInQuarters when isLK is equal to true", () => {
        const obj = new testImplClass({displayName: "Test 🧪", id: "test"}, true, false, [true, true, true , true])
        
        expect(obj.canUserChange.takesPartInQuarters).toBe(false);
    });

    test("cannot set takesPartInQuarters when isOralExamCourse is equal to true", () => {
        const obj = new testImplClass({displayName: "Test 🧪", id: "test"}, false, true, [true, true, true , true])
        
        expect(obj.canUserChange.takesPartInQuarters).toBe(false);
    });

    test("state adapts when isLK is set to true (previous false)", () => {
        const obj = new testImplClass({displayName: "Test 🧪", id: "test"}, false, false, [false, false, true , true])
        
        obj.isLK = true;

        expect(obj.canUserChange.takesPartInQuarters).toBe(false);
        expect(obj.takesPartInQuarters).toEqual([true, true, true, true]);
        expect(obj.isOralExamCourse).toBe(false);
        expect(obj.isWrittenExamCourse).toBe(true);
    });

    test("state adapts when isOralExamCourse is set to true (previous false)", () => {
        const obj = new testImplClass({displayName: "Test 🧪", id: "test"}, false, false, [true, true, false , false])
        
        obj.isOralExamCourse = true;

        expect(obj.canUserChange.takesPartInQuarters).toBe(false);
        expect(obj.takesPartInQuarters).toEqual([true, true, true, true]);
        expect(obj.isOralExamCourse).toBe(true);
        expect(obj.isWrittenExamCourse).toBe(false);
    });

    test("state adapts when isOralExamCourse is set to true (previous false) and isLK was true", () => {
        const obj = new testImplClass({displayName: "Test 🧪", id: "test"}, true, false, [true, true, true , true])
        
        obj.isOralExamCourse = true;

        expect(obj.canUserChange.takesPartInQuarters).toBe(false);
        expect(obj.takesPartInQuarters).toEqual([true, true, true, true]);
        expect(obj.isOralExamCourse).toBe(true);
        expect(obj.isWrittenExamCourse).toBe(false);
    });
})

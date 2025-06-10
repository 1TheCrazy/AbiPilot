import  { GradeToPoints15, GradeToPoints900, PointsToGrade15, PointsToGrade900 }  from "../app/client/static/AbiturMaths";

describe('GradeToPoints15()', () => {
    test('test for good grades', () => {
        expect(GradeToPoints15(0.7)).toBe(15);
    });

    test('test for good grades', () => {
        expect(GradeToPoints15(2)).toBe(11);
    });

    test('test for mid grades', () => {
        expect(GradeToPoints15(3)).toBe(8);
    });

    test('test for mid grades', () => {
        expect(GradeToPoints15(3.3)).toBe(7);
    });

    test('test for bad grades', () => {
        expect(GradeToPoints15(4.7)).toBe(3);
    });

    test('test for bad grades', () => {
        expect(GradeToPoints15(4)).toBe(5);
    });
})

describe('GradeToPoints900()', () => {
    test('tests for good grades', () => {
        expect(GradeToPoints900(1)).toBeGreaterThanOrEqual(823);
    });

    test('tests for good grades', () => {
        expect(GradeToPoints900(2.2)).toBeGreaterThanOrEqual(607);
    });

    test('tests for mid grades', () => {
        expect(GradeToPoints900(3.1)).toBeGreaterThanOrEqual(409);
    });

    test('tests for mid grades', () => {
        expect(GradeToPoints900(2.9)).toBeGreaterThanOrEqual(481);
    });

    test('tests for bad grades', () => {
        expect(GradeToPoints900(4)).toBeGreaterThanOrEqual(300);
    });

    test('tests for bad grades', () => {
        expect(GradeToPoints900(3.6)).toBeGreaterThanOrEqual(355);
    });
})

describe('PointsToGrade15()', () => {
    test('tests for good grades', () => {
        expect(PointsToGrade15(13)).toBe(1.3);
    });

    test('tests for good grades', () => {
        expect(PointsToGrade15(15)).toBe(0.7);
    });

    test('tests for mid grades', () => {
        expect(PointsToGrade15(10)).toBe(2.3);
    });

    test('tests for mid grades', () => {
        expect(PointsToGrade15(9)).toBe(2.7);
    });

    test('tests for bad grades', () => {
        expect(PointsToGrade15(0)).toBe(6);
    });

    test('tests for bad grades', () => {
        expect(PointsToGrade15(5)).toBe(4);
    });
})

describe('PointsToGrade900()', () => {
    test('tests for good grades', () => {
        expect(PointsToGrade900(810)).toBeCloseTo(1.1);
    });

    test('tests for good grades', () => {
        expect(PointsToGrade900(500)).toBeCloseTo(2.8);
    });

    test('tests for good grades', () => {
        expect(PointsToGrade900(538)).toBeCloseTo(2.6);
    });

    test('tests for good grades', () => {
        expect(PointsToGrade900(617)).toBeCloseTo(2.2);
    });

    test('tests for mid grades', () => {
        expect(PointsToGrade900(415)).toBeCloseTo(3.3);
    });

    test('tests for mid grades', () => {
        expect(PointsToGrade900(399)).toBeCloseTo(3.4);
    });

    test('tests for bad grades', () => {
        expect(PointsToGrade900(345)).toBeCloseTo(3.7);
    });

    test('tests for bad grades', () => {
        expect(PointsToGrade900(453)).toBeCloseTo(3.1);
    });
})
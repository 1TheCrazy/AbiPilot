import React, { useEffect, useState } from 'react';

import { SwipableBottomSheet } from './SwipableBottomSheet';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../ThemeProvider';
import { EditableHeading } from './EditableHeading';
import { GradeWeightSlider } from './GradeWeightSlider';
import Togglebox from './Togglebox';
import ManagedCourse from '../../client/static/implemented/ManagedCourse';
import Checkbox from './Checkbox';

const CourseSettings: React.FC<{course: ManagedCourse}> = ({course}) => {
    const { colors } = useTheme();

    const [courseState, setCourseState] = useState(course);

    const closeCallback = () => {
        // Handle closing here
        // Save changed settings
    }

    const styles = StyleSheet.create({
        mediumText: {
            color: colors.fontColor,
            fontSize: 16,
            padding: 0,
            margin: 0,
            includeFontPadding: false,
            paddingRight: 10,
            height: 20
        },
        inlineContainer: {
            display: 'flex',
            flexDirection: 'row',
        },
        verticalStackContainer: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
        },
        textTransform: {
            // Checkbox/Toggle Height / 2 - Text Height / 2
            transform: [{translateY: 34 / 2 - 20 / 2}]
        },
        centeredFlex: {
            justifyContent: 'center',
            alignContent: 'center',
        },
        gap: {
            gap: 10
        },
        padding: {
            marginTop: 30,
        },
        lowPadding: {
            marginTop: 10,
        },
    });

    return(
        <SwipableBottomSheet viewHeight={600} closeCallback={closeCallback}>
            <EditableHeading text={courseState.course.displayName} setText={(value) => courseState.course.displayName = value}/>
            <GradeWeightSlider course={courseState} onWeightChangeCallback={(value) => {
                courseState.writtenWeightPercantage = value
                setCourseState(ManagedCourse.newObjFrom(courseState));
            }}/>
            <View style={[styles.inlineContainer, styles.padding]}>
                <Text style={[styles.mediumText, styles.textTransform]}>Ist dieser Kurs ein LK?</Text>
                <Togglebox state={courseState.isLK} setState={(value) => {
                        courseState.isLK = value;
                        setCourseState(ManagedCourse.newObjFrom(courseState));
                    }}/>
            </View>
            <View style={styles.verticalStackContainer}>
                <View style={[styles.inlineContainer, styles.padding]}>
                    <Text style={[styles.mediumText, styles.textTransform]}>Mündliche Prüfung? </Text>
                    <Checkbox inactive={false} state={courseState.isOralExamCourse} setState={(value) => {
                        courseState.isOralExamCourse = value
                        setCourseState(ManagedCourse.newObjFrom(courseState));
                    }}/>
                </View>
                <View style={[styles.inlineContainer, styles.lowPadding]}>
                    <Text style={[styles.mediumText, styles.textTransform]}>Schriftliche Prüfung?</Text>
                    <Checkbox state={courseState.isLK} setState={() => { /*  Dummy method since this can never be changed (only via isLK update) */}} inactive={!courseState.canUserChange.isWrittenExamCourse}/>
                </View>
            </View>
            <View style={[styles.verticalStackContainer, styles.padding]}>
                <Text style={styles.mediumText}>In welchen Halbjahren findet der Kurs statt?</Text>
                <View style={[styles.inlineContainer, styles.centeredFlex, styles.gap]}>
                    <View style={[styles.verticalStackContainer, styles.lowPadding]}>
                        <Text style={styles.mediumText}>11.1</Text>
                        <Checkbox 
                            state={courseState.takesPartInQuarters[0]} 
                            setState={() => {
                                courseState.takesPartInQuarters = courseState.takesPartInQuarters.map((value, i) => (i === 0 ? !value : value));
                                setCourseState(ManagedCourse.newObjFrom(courseState));
                            }} 
                            inactive={!courseState.canUserChange.takesPartInQuarters}/>
                    </View>
                    <View style={[styles.verticalStackContainer, styles.lowPadding]}>
                        <Text style={styles.mediumText}>11.2</Text>
                        <Checkbox state={courseState.takesPartInQuarters[1]} 
                            setState={() => {
                                courseState.takesPartInQuarters = courseState.takesPartInQuarters.map((value, i) => (i === 1 ? !value : value));
                                setCourseState(ManagedCourse.newObjFrom(courseState));
                            }}  
                            inactive={!courseState.canUserChange.takesPartInQuarters}/>
                    </View>
                    <View style={[styles.verticalStackContainer, styles.lowPadding]}>
                        <Text style={styles.mediumText}>12.1</Text>
                        <Checkbox 
                            state={courseState.takesPartInQuarters[2]} 
                            setState={() => {
                                courseState.takesPartInQuarters = courseState.takesPartInQuarters.map((value, i) => (i === 2 ? !value : value));
                                setCourseState(ManagedCourse.newObjFrom(courseState));
                            }}  
                            inactive={!courseState.canUserChange.takesPartInQuarters}/>
                    </View>
                    <View style={[styles.verticalStackContainer, styles.lowPadding]}>
                        <Text style={styles.mediumText}>12.2</Text>
                        <Checkbox 
                            state={courseState.takesPartInQuarters[3]} 
                            setState={() => {
                                courseState.takesPartInQuarters = courseState.takesPartInQuarters.map((value, i) => (i === 3 ? !value : value));
                                setCourseState(ManagedCourse.newObjFrom(courseState));
                            }} 
                            inactive={!courseState.canUserChange.takesPartInQuarters}/>
                    </View>
                </View>
            </View>
            {
                /*
                Exams--- (List of all non-virtual exams)
                */
            }
        </SwipableBottomSheet>
    );
}

export default CourseSettings;
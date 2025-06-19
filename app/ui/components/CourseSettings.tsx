import React from 'react';

import { SwipableBottomSheet } from './SwipableBottomSheet';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../ThemeProvider';
import { EditableHeading } from './EditableHeading';
import { GradeWeightSlider } from './GradeWeightSlider';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Togglebox from './Togglebox';
import ManagedCourse from '../../client/static/implemented/ManagedCourse';
import Checkbox from './Checkbox';

const CourseSettings: React.FC<{course: ManagedCourse}> = ({course}) => {
    const { colors } = useTheme();

    const closeCallback = () => {
        // Handle closing here
        // Save changed settings
    }

    const onRenameCallback = (input: string) => {
        // Handle course Rename here
    }

    const onWeightChangeCallback = (value: number) => {
        // Handle Weight change here
    }

    const onLkStatusChange = (value: boolean) => {
        // Handle LK status change here
    }

    const onOralExamStatusChange = (value: boolean) => {
        // Handle oral exam status change here
    }

    const styles = StyleSheet.create({
        mediumText: {
            color: colors.fontColor,
            fontSize: 16,
            paddingRight: 10
        },
        inlineContainer: {
            display: 'flex',
            flexDirection: 'row',
            paddingTop: 30,
        },
        verticalStackContainer: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingTop: 30,
        }
    });

    return(
        <SwipableBottomSheet viewHeight={600} closeCallback={closeCallback}>
            <EditableHeading text={course.course.displayName} onRenameCallback={onRenameCallback}/>
            <GradeWeightSlider course={course} onWeightChangeCallback={onWeightChangeCallback}/>
            <View style={styles.inlineContainer}>
                {/*translateY: toggleHeight - textHeight * 2 + 3 (3 looks visually in the middle :shrug:)*/}
                <Text style={[styles.mediumText, {transform: [{translateY: 34 - 16 * 2 + 3}]}]}>Ist dieser Kurs ein LK?</Text>
                <Togglebox onChangeCallback={onLkStatusChange} initialValue={course.isLK}/>
            </View>
            <View style={styles.verticalStackContainer}>
                <View style={styles.inlineContainer}>
                    <Text style={[styles.mediumText, {transform: [{translateY: 34 - 16 * 2 + 3}]}]}>Mündliche Prüfung? </Text>
                    <Checkbox onChangeCallback={onOralExamStatusChange} inactive={false} initialValue={course.isLK}/>
                </View>
                <View style={[styles.inlineContainer, {paddingTop: 10}]}>
                    <Text style={[styles.mediumText, {transform: [{translateY: 34 - 16 * 2 + 3}]}]}>Schriftliche Prüfung?</Text>
                    <Checkbox onChangeCallback={() => { /*  Dummy method since this can never be changed (only via isLK update) */}} inactive={!course.canUserChange.isWrittenExamCourse} initialValue={course.isLK}/>
                </View>
            </View>

            {
                /*
                isWrittenExam / isOralExam
                edit in which years the user participates in this course

                Exams--- (List of all non-virtual exams)
                */
            }
        </SwipableBottomSheet>
    );
}

export default CourseSettings;
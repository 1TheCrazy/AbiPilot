import React, { useRef, useState } from 'react';
import { Dimensions, Text, Button, StyleSheet, Pressable, View, TextInput, Keyboard  } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp, NativeStackNavigatorProps } from '@react-navigation/native-stack';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';

import { Routes } from '../StartUpScreen';
import { useTheme } from '../ThemeProvider';
import CountryState from '../../client/static/interfaces/CountryState';
import ImplementedCourses from '../../client/static/implemented/ImlementedCourses';
import { CourseCard } from '../components/CourseCard';
import { ScrollView } from 'react-native-gesture-handler';
import CreateCourseButton from '../components/CreateCourseButton';
import QuestionCard from '../components/QuestionCard';
import { ManagedCourse } from '../../client/static/implemented/ManagedCourse';
import CourseSettings from '../components/CourseSettings';
import { Client } from '../../client/SaveSystem';
import { FiveCharUUID } from '../../util/Randoms';

type SetupNav = NativeStackNavigationProp<Routes, 'chooseCourses'>;
type chooseState = 'lk' | 'oralExam' | 'baseCourse' | 'done';

const CourseChooser: React.FC<{ state: CountryState}> = ({state}) => {
    const { colors } = useTheme();
    const screenHeight = Dimensions.get('screen').height;
    const navigation = useNavigation<SetupNav>();
    
    const [courseChooseState, setChooseState] = useState<chooseState>('lk');
    const [searchText, setSearchText] = useState('');
    const [createNewCourseOpen, setCreateNewCourseOpen] = useState<boolean>(false);
    // Course that is currently being chosen (by clicking on a Course Card)
    const [choosingCourse, setChoosingCourse] = useState<ManagedCourse | undefined>(undefined);
    // Search Bar
    const ref = useRef<TextInput>(null);

    const styles = StyleSheet.create({
        heading: {
            fontSize: 30,
            alignSelf: 'flex-start',
            marginTop: 10,
            color: colors.fontColor
        },
        smallText: {
            fontSize: 15,
            marginTop: 10,
            color: colors.lightFontColor
        },
        boldSmallText: {
            fontSize: 15,
            marginTop: 10,
            color: colors.lightFontColor,
            fontWeight: 800,
        },
        button: {
            borderWidth: 4,
            justifyContent: 'center',
            padding: 4,
            borderRadius: 15,
            borderColor: colors.highlightBlue
        },
        choseCourseButton: {
            borderWidth: 4,
            justifyContent: 'center',
            padding: 4,
            borderRadius: 15,
            marginHorizontal: 30,
            borderColor: colors.highlightBlue,
            marginTop: 40,
        },
        buttonText: {
            fontSize: 22,
            alignSelf: 'center',
            color: colors.highlightBlue
        },
        choseCourseButtonText: {
            fontSize: 18,
            alignSelf: 'center',
            color: colors.highlightBlue
        },
        searchContainer: {
            display: 'flex',
            marginTop: 60,
            height: 'auto',
            width: 'auto',
            borderRadius: 15,
            borderColor: colors.hrColor,
            borderWidth: 2,
            flexDirection: 'row',
        },
        searchBar: {
            fontSize: 15,
            color: colors.fontColor,
            paddingHorizontal: 10,
            paddingVertical: 0,
            marginVertical: 0,
            flex: 1,
        },
        icon: {
            color: colors.fontColor,
            alignSelf: 'flex-start',
            marginLeft: 10,
            marginVertical: 5
        },
        courseContainer: {
            marginTop: 20,
            display:'flex', 
            flexDirection: 'row',
            flexWrap: 'wrap',
        },
        createCourseContainer:{
            display: 'flex',
            alignContent: 'center',
            marginTop: 30
        }
    });

    const courseCreatedCallback = (course: ManagedCourse | undefined) =>{
        // Add to use course list from saveSystem
        if(course && !ImplementedCourses.isEqualToTemplate(course)) {
            // Fix id
            course.course.id = 
                "user_course_" +
                course.course.displayName
                    .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // strip accents
                    .toLowerCase()
                    .replace(/\s+/g, "_") // all spaces to _
                    .replace(/[^a-z0-9_]/g, "") + // keep safe chars only
                "_" + FiveCharUUID(); 

            Client.customCourses.push(course);
        }

        setCreateNewCourseOpen(false);
    }

    // called when a course is chosen
    const courseChosenCallback = (course: ManagedCourse) =>{
        
    }

    // called when a CourseCard is clicked
    const prepareChoosingCourse = (course: ManagedCourse) =>{
        // Prepare course type for the current choosing state
        course.isLK = courseChooseState == 'lk' ? true : false;
        course.isOralExamCourse = courseChooseState == 'oralExam' ? true : false;
        
        setChoosingCourse(course);
    }

    return (
        <SafeAreaView style={{
                backgroundColor: colors.backgroundColor,
                padding: 16,
                minHeight: screenHeight
            }}>

                <Pressable style={[styles.button, {position: 'absolute'}]} onPress={() => navigation.navigate('finishSetup')}>
                    <Text style={styles.buttonText}>Debug: Skip</Text>
                </Pressable>

            <View style={{flex: 1}}>
                { /* Headings */}
                <Text style={styles.heading}>Wähle deine Kurse aus...</Text>
                <Text style={styles.smallText}>Wähle deine <Text style={styles.boldSmallText}>{courseChooseState == 'lk' ? 'Leistungskurse' : courseChooseState == 'oralExam' ? 'müdlichen Prüfungsfächer' : 'Basiskurse'}</Text></Text>
                
                { /* Search Bar */}
                <Pressable style={styles.searchContainer}
                    onPress={() => { 
                        // Blur if keyboard wasn't visible, since we may have focus, but keyboard is not visible  
                        Keyboard.isVisible() ? {} : ref.current?.blur();
                        ref.current?.focus();
                    }}>
                    <FontAwesome6 style={ styles.icon } name="magnifying-glass" size={20} iconStyle='solid'/>
                    <TextInput 
                        style={styles.searchBar} 
                        onChangeText={setSearchText}
                        ref={ref}
                        multiline={false}
                        maxLength={50}
                        selectionColor={colors.fontColor}
                        placeholder='Suche nach Kursen...'
                    />
                </Pressable>

                { /* Courses */}
                <ScrollView>
                    <View style={styles.courseContainer}>
                        { /* Implemented Courses */}
                        {
                            ImplementedCourses.Implementations.map(course => {
                                if(searchText === '' || course.course.displayName.toLowerCase().includes(searchText.toLowerCase()))
                                    return (<CourseCard onPress={() => prepareChoosingCourse(course)} name={course.course.displayName} style={{marginVertical: 5, marginHorizontal: 2}} key={course.course.id}></CourseCard>)
                                else
                                    return (<></>);  
                            })
                        }

                        { /* User-Defined Courses */}
                        {
                            Client.customCourses
                            .filter(Boolean)
                            .map(course => {
                                if(searchText === '' || course.course.displayName.toLowerCase().includes(searchText.toLowerCase()))
                                    return (<CourseCard onPress={() => prepareChoosingCourse(course)} name={course.course.displayName} style={{marginVertical: 5, marginHorizontal: 2}} key={course.course.id}></CourseCard>)
                                else
                                    return (<></>);  
                            })
                        }
                    </View>
                    
                    { /* Add Course*/}
                    <View style={styles.createCourseContainer}>
                        <QuestionCard text="Dein Kurs ist nicht dabei? Erstelle ihn dir<br>selber!"/>
                        <CreateCourseButton creationSheetOpenStateSetter={setCreateNewCourseOpen}/>
                    </View>
                </ScrollView>
        

                { /* ONLY SHOW THIS BUTTON IF THE SETUP IS DONE */}
                {/*
                <Pressable style={styles.button} onPress={() => navigation.navigate('finishSetup')}>
                    <Text style={styles.buttonText}>Setup Beginnen</Text>
                </Pressable>
                */}
            </View>

            { /* Show BottomSheet for creating a custom Course if it's open */}
            { createNewCourseOpen && (
                <CourseSettings course={ImplementedCourses.getNewTemplate()} onClose={courseCreatedCallback}/>
            )}

            { /* Show BottomSheet for choosing a Course if it's open */}
            { choosingCourse && (
                <CourseSettings height={720} course={choosingCourse} onClose={() => setChoosingCourse(undefined)} userConfigurable={false}>
                    <Pressable style={styles.choseCourseButton} onPress={() => courseChosenCallback(choosingCourse)}>
                        <Text style={styles.choseCourseButtonText}>Als {courseChooseState == 'lk' ? 'Leistungskurs' : courseChooseState == 'oralExam' ? 'müdliches Prüfungsfach' : 'Basiskurs'} wählen</Text>
                    </Pressable>
                </CourseSettings>
            )}
        </SafeAreaView>
    );
}

export default CourseChooser;
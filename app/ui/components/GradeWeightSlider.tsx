import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
// Actually expected better slider than this, kinda disappointed (can't even controll thickness of slider)
import Slider from '@react-native-community/slider';

import { useTheme } from '../ThemeProvider';
import { PanGestureContext } from './SwipableBottomSheet';
import ManagedCourse from '../../client/static/implemented/ManagedCourse';

export const GradeWeightSlider: React.FC<{course: ManagedCourse, onWeightChangeCallback: (value: number) => void }> = ({course, onWeightChangeCallback}) => {
    const { colors } = useTheme();
    const [ value, setValue ] = useState(course.writtenWeightPercantage);
    const { setEnabled } = useContext(PanGestureContext);

    const styles = StyleSheet.create({
        slider: {
            flexGrow: 1
        },
        textLabel: {
            color: colors.fontColor
        },
        numberLabel: {
            color: colors.lightFontColor
        },
        container: {
            display: 'flex',
            flexDirection: 'row',
            paddingTop: 5
        },
        infoText: {
            color: colors.fontColor,
            fontSize: 16,
        },
        textContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }
    });

    return(
        <>
        <Text style={styles.infoText}>Zusammensetzung der Note in diesem Kurs:</Text>
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.textLabel}>Schriftlich</Text>
                <Text style={styles.numberLabel}>{value}%</Text>
            </View>
            <Slider
                onTouchStart={() => { setEnabled(false) }}
                onTouchEnd={() => { setEnabled(true) }}
                onValueChange={(val) => setValue(val)}
                style={styles.slider}
                minimumValue={0}
                maximumValue={100}
                step={1}
                value={value}
                onSlidingComplete={ (val) => onWeightChangeCallback(val)}
                minimumTrackTintColor='rgb(86, 192, 0)'
                maximumTrackTintColor='rgb(132, 0, 255)'
                thumbTintColor={colors.fontColor}
            />
            <View style={styles.textContainer}>
                <Text style={styles.textLabel}>Mündlich</Text>
                <Text style={styles.numberLabel}>{100 - value}%</Text>
            </View>
            
        </View>
        </>
    )
}
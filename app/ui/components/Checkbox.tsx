import React, { useEffect, useState } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';

const Checkbox: React.FC<{ initialValue: boolean, inactive: boolean, onChangeCallback: (value: boolean) => void }> = ({ initialValue, inactive, onChangeCallback }) => {
    const [value, setValue] = useState(initialValue);
    const DIMENSIONS = 30;
    const xTransform = useSharedValue(0);
    const animationProgress = useSharedValue(0);

    // Listen for changes on value
    useEffect(() => {
        const springConfig = {
            damping: 25,
            stiffness: 80,
            mass: 1,
        }

        animationProgress.value = withSpring(value ? 1 : 0, springConfig)  
    }, [value]);


    // Color animation for background
    const switchAnimationStyle = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(
            animationProgress.value,
            [0, 1],
            ['rgba(0, 0, 0, 0.25)', 'rgba(140, 215, 245, 0.77)']
        );

        return {backgroundColor};
    })

    const styles = StyleSheet.create({
        container: {
            width: DIMENSIONS + 4, // width + 2 * borderWidth
            height: 34, // 30 + 2 * borderWidth
            padding: 2,
            borderRadius: 15,
            borderColor: 'rgba(0, 0, 0, 0.5)',
            borderWidth: 2,
            opacity: (!inactive ? 1 : 0.6),
            justifyContent: 'center',
            elevation: 2, // Dropshadow on android
            // -- Dropshadow on iOS --
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.2,
            shadowRadius: 1.41,
        },
        icon: {
            color: ( value ? 'rgb(255, 255, 255)' : 'rgba(0, 0, 0, 0)'),
            alignSelf: 'center',
        },
        pressable: {
            alignSelf: 'flex-start',
            padding: 4
        }
    });

    return(
        <Pressable style={styles.pressable} onPress={() => { !inactive ? setValue(!value) : {}; }}>
            <Animated.View style={[styles.container, switchAnimationStyle]}>
                <FontAwesome6  style={styles.icon} name="check" size={22} iconStyle='solid'/>
            </Animated.View>
        </Pressable>
    )
}

export default Checkbox;
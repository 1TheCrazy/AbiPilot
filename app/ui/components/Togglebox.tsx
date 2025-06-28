import React, { useEffect, useState } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useTheme } from '../ThemeProvider';

const Togglebox: React.FC<{ state: boolean, setState: (value: boolean) => void}> = ({ state, setState }) => {
    const SWITCH_WIDTH = 70;
    const xTransform = useSharedValue(0);
    const animationProgress = useSharedValue(0);

    // Listen for changes on value
    useEffect(() => {
        const springConfig = {
            damping: 25,
            stiffness: 80,
            mass: 1,
        }

        animationProgress.value = withSpring(state ? 1 : 0, springConfig);
    }, [state]);

    // Transofrm animation for handle
    const handleAnimationStyle = useAnimatedStyle(() => ({
        transform: [{translateX: (SWITCH_WIDTH - 25 - 3) * animationProgress.value}]
    }))

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
        switch: {
            width: SWITCH_WIDTH + 4, // width + 2 * borderWidth
            height: 34, // 30 + 2 * borderWidth
            padding: 2,
            borderRadius: 15,
            borderColor: 'rgba(0, 0, 0, 0.5)',
            borderWidth: 2,
            elevation: 2, // Dropshadow on android
            // -- Dropshadow on iOS --
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.2,
            shadowRadius: 1.41,
        },
        handle: {
            width: 25,
            height: 25,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            borderRadius: 12.5,
        },
        pressable: {
            alignSelf: 'flex-start'
        }
    });

    return(
        <Pressable style={styles.pressable} onPress={() => { setState(!state); }}>
            <Animated.View style={[styles.switch, switchAnimationStyle]}>
                <Animated.View style={[styles.handle, handleAnimationStyle]}/>
            </Animated.View>
        </Pressable>
    )
}

export default Togglebox;
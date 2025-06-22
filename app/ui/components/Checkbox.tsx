import React, { useEffect, useState } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';

const Checkbox: React.FC<{ state: boolean, setState: (value: boolean) => void, inactive: boolean}> = ({ state, setState, inactive }) => {
    const DIMENSIONS = 30;
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


    // Color animation for background
    const switchAnimationStyle = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(
            animationProgress.value,
            [0, 1],
            ['rgb(77, 77, 77)', 'rgba(140, 215, 245, 0.77)']
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
            opacity: (!inactive ? 1 : 0.4),
            justifyContent: 'center',
        },
        icon: {
            color: ( state ? 'rgb(255, 255, 255)' : 'rgba(0, 0, 0, 0)'),
            alignSelf: 'center',
        },
        pressable: {
            alignSelf: 'flex-start',
         },
        shadow: {
            borderRadius: 15,
            elevation: 2, // Dropshadow on android
            // -- Dropshadow on iOS --
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.2,
            shadowRadius: 1.41,
        }
    });

    return(
        <Pressable style={styles.pressable} onPress={() => { !inactive ? setState(!state) : {}; }}>
            <View style={styles.shadow}>
                <Animated.View style={[styles.container, switchAnimationStyle]}>
                    <FontAwesome6  style={styles.icon} name="check" size={22} iconStyle='solid'/>
                </Animated.View>
            </View>
        </Pressable>
    )
}

export default Checkbox;
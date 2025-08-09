import React, { createContext, useContext, useEffect, useState } from 'react';
import { Dimensions, Modal, StyleSheet, View, } from 'react-native';
import { useTheme } from '../ThemeProvider';
import { Gesture, GestureDetector, GestureHandlerRootView, } from 'react-native-gesture-handler';
import Animated, { cancelAnimation, runOnJS, useAnimatedReaction, useAnimatedStyle, useSharedValue, withDecay, withSpring } from 'react-native-reanimated';

import Backdrop from './Backdrop';

// Didn't know there were fucking managed bottom sheets like @gorhom/bottom-sheet, so I spent hours writing this
export const SwipableBottomSheet: React.FC<{ children: React.ReactNode, viewHeight: number, closeCallback: () => void }> = ({ children, viewHeight, closeCallback }) => {
    const { colors } = useTheme();
    const screenWidth = Dimensions.get('screen').width;

    const MAX_PAN = viewHeight;
    const OPEN = viewHeight * 0.6;
    const CLOSE = 0;
    const yPan = useSharedValue(OPEN);
    const endLastGesture = useSharedValue(yPan.value);
    const callbackCalled = useSharedValue(false);

    // For PanGestureProvider
    const [enabled, setEnabled] = useState(true);

    const closeAnim = () => {
        yPan.value = withSpring(-10, {
            damping: 30,
            stiffness: 300,
            mass: 1,
            overshootClamping: true,
        });
    };

    // Handle Bounds of yPan
    useAnimatedReaction(
        () => yPan.value, 
        (newValue, _) => {
            // If we are below close point, call closeCallback
            if (newValue <= CLOSE && !callbackCalled.value) {
                runOnJS(closeCallback)();
                callbackCalled.value = true;
            }
            // If we are higher than maxPan, apply some easing
            else if (newValue >= MAX_PAN) {
                yPan.value = MAX_PAN + Math.pow(newValue - MAX_PAN, 1 / 1.3);
            }
        }
    );

    const pan = Gesture.Pan()
    .onBegin(() => {
        // Cancle any ongoing animations when user graps pan
        cancelAnimation(yPan);
        cancelAnimation(endLastGesture);
    })
    .onUpdate((event) => {
        // Up is negative so we extract here and flip sign for convinience
        const yPanEventValue = -event.translationY;

        yPan.value = endLastGesture.value + yPanEventValue;
        
    })
    .onEnd((event) => {
        const handleBounds = () => {
            // If we panned to high go back to maxPan
            if(yPan.value > MAX_PAN){
                const anim = () => withSpring(MAX_PAN, {
                    damping: 25,
                    stiffness: 80,
                    mass: 1,
                })

                yPan.value = anim();
                endLastGesture.value = anim();
            }

            // Save where last gesture left off in order to make yPan persistent through multiple gestures
            endLastGesture.value = yPan.value;
        };

        const velocity = -event.velocityY;

        // Continue Movement with momentum
        if(Math.abs(velocity) > 500 && yPan.value < MAX_PAN){
            const withMomentum = () => withDecay({
                    // Make it easier to close the sheet than to fully open it
                    velocity: velocity > 0 ? velocity * 0.3 : velocity * 0.4,
                    deceleration: velocity > 0 ? 0.98: 0.999,
                },
                // Handle bounds when animation is finished and withCallback = true
                () => {
                    handleBounds()
                }
            );

            yPan.value = withMomentum();
            // Also animte this if the user grabs pan during animation
            endLastGesture.value = withMomentum();
        }
        // No animations will be applied anymore so we can handle bounds
        else{
            handleBounds();
            // Save where last gesture left off in order to make yPan persistent through multiple gestures
            endLastGesture.value = yPan.value;
        }
    })
    .enabled(enabled)
    ;

    const panStyle = useAnimatedStyle(() => ({
        transform: [{translateY: -yPan.value}]
    }));

    const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        borderRadius: 10,
        padding: 10,
        backgroundColor: colors.bottomSheetColor,
        width: screenWidth - 8 * 2, // Smaller padding 
        height: viewHeight,
        position: 'absolute',
        bottom: -viewHeight,
        justifyContent: 'flex-start',
    },
    bar: {
        height: 2,
        borderRadius: 10,
        width: 30,
        alignSelf: 'center',
        backgroundColor: colors.hrColor
    }
});
    return(
        <>
            { /* Make Pan gesture available to children, in order to disable it when interacting with components that need it disabled */}
            <PanGestureContext.Provider value={{enabled, setEnabled}}>
                <Backdrop closeCallback={() => closeAnim()}/>
                <GestureDetector gesture={pan}>
                    <Animated.View style={[styles.container, panStyle]}>
                        <View style={styles.bar}></View>
                        { children }
                    </Animated.View>
                </GestureDetector>
            </PanGestureContext.Provider>
        </>
    )
}

export const PanGestureContext = createContext({enabled: true, setEnabled: (val: boolean) => {}});
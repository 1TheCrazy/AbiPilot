import React from 'react';
import { Dimensions, Modal, StyleSheet, View, } from 'react-native';
import { useTheme } from '../ThemeProvider';
import { Gesture, GestureDetector, GestureHandlerRootView, } from 'react-native-gesture-handler';
import Animated, { cancelAnimation, runOnJS, useAnimatedStyle, useSharedValue, withDecay, withSpring } from 'react-native-reanimated';
import Backdrop from './Backdrop';

// Didn't know there were fucking managed bottom sheets like @gorhom/bottom-sheet, so I spent hours writing this
const SwipableBottomSheet: React.FC<{ children: React.ReactNode, viewHeight: number, closeCallback: any }> = ({ children, viewHeight, closeCallback }) => {
    const { colors } = useTheme();
    const screenWidth = Dimensions.get('screen').width;

    const maxPan = viewHeight;
    const open = viewHeight * 0.6;
    const close = 10;
    const yPan = useSharedValue(open);
    const endLastGesture = useSharedValue(yPan.value); 

    const closeAnim = () => {
        yPan.value = withSpring(-100, {
                damping: 25,
                stiffness: 80,
                mass: 1,
        }, () => {
            // Call closeCallback when animation is finished
            runOnJS(closeCallback)();
        });
    };

    const pan = Gesture.Pan()
    .onBegin(() => {
        // Cancle any ongoing animations when user graps pan
        cancelAnimation(yPan);
        cancelAnimation(endLastGesture);
    })
    .onUpdate((event) => {
        // Up is negative so we extract here and flip sign for convinience
        const yPanEventValue = -event.translationY;

        // If we reached max and still try to pan higher
        if(yPan.value > maxPan){
            // Damp if we pan to high
            yPan.value = maxPan + Math.pow(yPanEventValue, 1 / 1.4);
        }
        // Normal pan
        else{
            yPan.value = endLastGesture.value + yPanEventValue;
        }
    })
    .onEnd((event) => {
        const handleBounds = () => {
            // Close the Tab if we reached close point
            if(yPan.value < close && yPan.value > -50 ){
                closeAnim();
            }
            // If we panned to high go back to maxPan
            else if(yPan.value > maxPan){
                const anim = () => withSpring(maxPan,{
                    damping: 25,
                    stiffness: 80,
                    mass: 1,
                })

                yPan.value = anim();
                endLastGesture.value = anim();
            }
            // BottomSheet not visible before applying disappear anim
            else if(yPan.value < -50){
                runOnJS(closeCallback)();
            }

            // Save where last gesture left off in order to make yPan persistent through multiple gestures
            endLastGesture.value = Math.min(yPan.value, maxPan);
        };

        const velocity = -event.velocityY;

        // Continue with momentum
        if(Math.abs(velocity) > 500){
            const anim = (withCallback: boolean) => withDecay({
                    // Make it easier to close the sheet than to fully open it
                    velocity: velocity > 0 ? velocity * 0.3 : velocity * 0.4,
                    deceleration: velocity > 0 ? 0.98: 0.999,
                },
                // Handle bounds when animation is finished and withCallback = true
                () => {
                    withCallback ? handleBounds() : () => {};
                }
            );

            yPan.value = anim(true);
            // Also animte this if the user grabs pan during animation
            endLastGesture.value = anim(false);
        }
        // No animations will be applied anymore so we can handle bounds
        else{
            handleBounds();
            // Save where last gesture left off in order to make yPan persistent through multiple gestures
            endLastGesture.value = Math.min(yPan.value, maxPan);
        }
    })
    ;

    const panStyle = useAnimatedStyle(() => ({
        transform: [{translateY: -yPan.value}]
    }));

    const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        borderRadius: 10,
        padding: 10,
        backgroundColor: 'white', /*add real color to theme provider*/
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
        backgroundColor: 'black'/*use real color (like hr)*/
    }
});
    return(
        <>
            <Backdrop closeCallback={() => closeAnim()}/>
            <GestureDetector gesture={pan}>
                <Animated.View style={[styles.container, panStyle]}>
                    <View style={styles.bar}></View>
                    { children }
                </Animated.View>
            </GestureDetector>
        </>
    )
}

export default SwipableBottomSheet;
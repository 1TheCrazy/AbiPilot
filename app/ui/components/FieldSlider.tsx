import { useEffect, useState } from "react";
import { useTheme } from "../ThemeProvider";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { Pressable, StyleProp, StyleSheet, Text, useWindowDimensions, View, ViewStyle } from "react-native";
import { Field } from "../../client/static/implemented/ManagedCourse";

const FieldSlider:  React.FC<{ field: Field, changedCallback: (field: Field) => void, style?: StyleProp<ViewStyle>}> = ({ field, changedCallback, style }) => {
    const { colors } = useTheme();
    const [ stateField, setStateField] = useState<Field>(field);
    const translateX = useSharedValue(0); 
    const { width } = useWindowDimensions();
    
    let CONTAINER_WIDTH = width - 16 * 2; // Padding on 
    
    const indicatorTransform = useAnimatedStyle(() => {
        return {
            transform: [{translateX: translateX.value}],
        };
    });
    
    useEffect(() => {
        const springConfig = {
            damping: 25,
            stiffness: 80,
            mass: 1,
        }
    
        if (stateField === 'I') {
            translateX.value = withSpring((CONTAINER_WIDTH / 4) * 0, springConfig);
        } else if (stateField === 'II') {
            translateX.value = withSpring((CONTAINER_WIDTH / 4) * 1, springConfig);
        } else if (stateField === 'III') {
            translateX.value = withSpring((CONTAINER_WIDTH / 4) * 2, springConfig);
        } else if (stateField === 'Sports'){
            translateX.value = withSpring((CONTAINER_WIDTH / 4) * 3, springConfig);
        }

        changedCallback(stateField);
    }, [stateField]);
    
    const styles = StyleSheet.create({
        button: {
            alignItems: 'center',
            justifyContent: 'center',
            width: CONTAINER_WIDTH / 4
        },
        indicator: {
            ...StyleSheet.absoluteFillObject,
            height: 30,
            top: 5,
            borderRadius: 10,
            width: CONTAINER_WIDTH / 4,
            backgroundColor: colors.transparentAccent
        },
        background: {
            borderRadius: 10,
            padding: 5,
            flexDirection: 'row',
            justifyContent: 'center',
            height: 40,
            backgroundColor: colors.transparentAccent
        },
        text: {
            fontWeight: 600,
            fontSize: 15,
            color: colors.fontColor
        }
    });

    return(
        <View style={[styles.background, style]}>
            <Animated.View style={[styles.indicator, indicatorTransform]}/>
            <Pressable 
                style={styles.button}
                onPress={ () => setStateField('I')}>
                <Text style={styles.text}>I</Text>
            </Pressable>
            <Pressable 
                style={styles.button}
                onPress={ () => setStateField('II')}>
                <Text style={styles.text}>II</Text>
            </Pressable>
            <Pressable 
                style={styles.button}
                onPress={ () => setStateField('III')}>
                <Text style={styles.text}>III</Text>
            </Pressable>
            <Pressable 
                style={styles.button}
                onPress={ () => setStateField('Sports')}>
                <Text style={styles.text}>Sport</Text>
            </Pressable>
        </View>
    )
}

export default FieldSlider;
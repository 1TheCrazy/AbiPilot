import React, { useRef, useState } from 'react';
import { View, TextInput, StyleSheet, TextInputComponent, Pressable } from 'react-native';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';

import { useTheme } from '../ThemeProvider';

interface HeadingProps {
    text: string,
    onRenameCallback: (input: string) => void
}

export const EditableHeading: React.FC<HeadingProps> = ({text, onRenameCallback}) => {
    const { colors } = useTheme();
    const [stateText, setText] = useState(text);
    const ref = useRef<TextInput>(null);

    const styles = StyleSheet.create({
    text:{
        fontSize: 20,
        fontWeight: 600,
        color: colors.fontColor,
        margin: 0,
        borderWidth: 0,
        flex: 1
    },
    hr: {
        borderBottomWidth: 1,
        marginTop: 5,
        marginBottom: 10,
        borderBottomColor: colors.hrColor
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        color: colors.fontColor,
        alignSelf: 'center',
        marginLeft: 10
    }
    });
  
  return (
    <View style={{paddingVertical: 10}}>
        <View style={styles.inputContainer}>
            <Pressable onPress={
                () => {
                    ref.current?.focus();
                }}>
                <FontAwesome6 style={ styles.icon } name="pen-to-square" size={20} iconStyle='solid'/>
            </Pressable>
            <TextInput 
                style={styles.text} 
                value={stateText} 
                onChangeText={setText}
                onEndEditing={() => onRenameCallback(stateText)}
                ref={ref}
                multiline={false}
                maxLength={50}
                />
        </View>
        <View style={styles.hr}></View>
    </View>
  );
}



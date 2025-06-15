import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../ThemeProvider';

interface HeadingProps {
    text: string
}

export const CenteredHeading: React.FC<HeadingProps> = ({text}) => {
  const { colors } = useTheme();

  return (
    <View style={{paddingVertical: 10}}>
        <Text style={[styles.text, { color: colors.fontColor }]}>{text}</Text>
        <View style={[styles.hr, { borderBottomColor: colors.hrColor }]}></View>
    </View>
  );
}

const styles = StyleSheet.create({
    text:{
        fontSize: 20,
        fontWeight: 600,
        alignSelf: 'center'
    },
    hr: {
        borderBottomWidth: 1,
        marginTop: 5,
        marginBottom: 10,
    }
});

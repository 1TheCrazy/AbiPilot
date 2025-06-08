import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../ThemeProvider';

interface HeadingProps {
    text: string
}

export const Heading: React.FC<HeadingProps> = ({text}) => {
  const { colors } = useTheme();

  return (
    <View>
        <Text style={[styles.text, { color: colors.fontColor }]}>{text}</Text>
        <View style={[styles.hr, { borderBottomColor: colors.hrColor }]}></View>
    </View>
  );
}

const styles = StyleSheet.create({
    text:{
        fontSize: 20,
        fontWeight: 600
    },
    hr: {
        borderBottomWidth: 1,
        marginTop: 5,
        marginBottom: 10,
    }
});

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useTheme } from '../ThemeProvider';

const QuestionCard: React.FC<{text: string}> = ({ text }) => {
    const { colors } = useTheme();

    return(
        <View style={[ styles.container ]}>
            <Text style={[styles.infoIcon, { color: colors.questionBlue }]}>?</Text><Text style={[ styles.infoText, { color: colors.lightFontColor}]}>{text.replace("<br>", "\n")}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    infoText: {
        fontSize: 15,
        paddingLeft: 5,
    },
    infoIcon: {
        fontSize: 30,
        fontWeight: 600,
    },
    container: {
        flexDirection: 'row', 
        paddingHorizontal: 8,
        paddingVertical: 15,
        alignItems: 'center'
    }
});

export default QuestionCard;
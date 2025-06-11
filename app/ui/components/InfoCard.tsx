import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useTheme } from '../ThemeProvider';

const InfoCard: React.FC<{text: string}> = ({ text }) => {
    const { colors } = useTheme();

    return(
        <View style={[ styles.container ]}>
            <Text style={[styles.infoIcon, { color: colors.infoYellow }]}>ⓘ</Text><Text style={[ styles.infoText, { color: colors.lightFontColor}]}>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    infoText: {
        fontSize: 15,
        paddingLeft: 5,
    },
    infoIcon: {
        fontWeight: 600 
    },
    container: {
        flexDirection: 'row', 
        paddingHorizontal: 8,
        paddingVertical: 15,
    }
});

export default InfoCard;
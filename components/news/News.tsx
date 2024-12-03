import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export type NewProps = {
    header: string;
    description: string;
};

export default function News({header,description}:NewProps){

    return(
        <View style={styles.box}>
            <Text style={styles.header}>{header}</Text>
            <Text style={styles.description}>{description}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    box: {
        backgroundColor: 'white',
        alignItems: 'center',
        padding: 20,
        margin: 20,
        borderRadius: 5,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 10,
    },
});
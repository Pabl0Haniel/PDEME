import React from 'react';
import { Text, View, StyleSheet,Modal, TextInput, ViewBase, TouchableOpacity } from 'react-native';
import { useState } from 'react';

export type NewModalProps = {
    visible: boolean;
    onAdd: (header: string, description: string)=> void;
    onCancel: () => void;
};

export default function NewModal({visible,onAdd,onCancel}:NewModalProps){
    const [header, setHeader] = useState('');
    const [description, setDescription] = useState('');

    return (
        <Modal visible={visible} animationType='fade' transparent={true} onRequestClose={() => {}}>
            <View style={styles.container}>
                <View style={styles.boxContainer}>
                    <TextInput
                        style={styles.boxInput}
                        placeholder='Header'
                        value={header}
                        onChangeText={text=>setHeader(text)}
                        autoFocus
                    />

                    <TextInput
                        style={styles.boxInput}
                        placeholder='Description'
                        value={description}
                        onChangeText={text=>setDescription(text)}
                    />

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.buttonAdd} onPress={() => onAdd(header,description)}>
                            <Text style={styles.buttonText}>
                                Add
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.buttonCancel} onPress={() => onCancel()}>
                            <Text style={styles.buttonText}>
                                Cancel
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );

};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        alignContent: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    boxContainer:{
        backgroundColor: '#FFF',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        margin : 20,
    },
    buttonText:{
        fontWeight: 'bold',
        color: '#FFF',
    },
    buttonAdd: {
        backgroundColor: 'green',
        borderRadius: 5,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        padding: 20,
    },
    buttonCancel: {
        backgroundColor: 'red',
        borderRadius: 5,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        padding: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 10,
        height: 70,
    },
    boxInput: {
        alignSelf: 'stretch',
        height: 40,
        borderRadius: 5,
        backgroundColor: '#DDD',
        margin: 5,
    },
})

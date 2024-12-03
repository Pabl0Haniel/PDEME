import React, {useEffect} from 'react';
import { Text, View, StyleSheet,Modal, TextInput, ViewBase, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { ISport } from '@/interfaces/ISport';

export type SportModalProps = {
    visible: boolean;
    onAdd: (title: string, subTitle: string, id: number)=> void;
    onCancel: () => void;
    onDelete: (id: number) => void;
    sport?: ISport;
};

export default function SportModal({visible,onAdd,onCancel,onDelete, sport}:SportModalProps){
    const [title, setTitle] = useState('');
    const [subTitle, setSubTitle] = useState('');
    const [id, setId] = useState<number>(0);

    useEffect(()=>{
        if(sport){
            setTitle(sport.name);
            setSubTitle(sport.description);
            setId(sport.id);
        }else{
            setTitle('');
            setSubTitle('');
            setId(0);
        }
    },[sport])

    return (
        <Modal visible={visible} animationType='fade' transparent={true} onRequestClose={() => {}}>
            <View style={styles.container}>
                <View style={styles.boxContainer}>
                    <TextInput
                        style={styles.boxInput}
                        placeholder='Title'
                        value={title}
                        onChangeText={text=>setTitle(text)}
                        autoFocus
                    />

                    <TextInput
                        style={styles.boxInput}
                        placeholder='SubTitle'
                        value={subTitle}
                        onChangeText={text=>setSubTitle(text)}
                    />

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.buttonAdd} onPress={() => onAdd(title,subTitle,id)}>
                            <Text style={styles.buttonText}>
                                Add
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.buttonCancel} onPress={() => onCancel()}>
                            <Text style={styles.buttonText}>
                                Cancel
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.buttonDelete} onPress={() => onDelete(id)} disabled={id<=0}>
                            <Text style={styles.buttonText}>
                                Delete
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
        backgroundColor: 'orange',
        borderRadius: 5,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        padding: 20,
    },
    buttonDelete: {
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

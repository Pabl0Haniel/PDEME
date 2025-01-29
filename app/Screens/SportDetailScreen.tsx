import React, {useEffect, useState} from 'react';
import { StyleSheet,Text, TouchableOpacity,View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ISport } from '@/interfaces/ISport';
import { ThemedView } from '@/components/ThemedView';
import { router } from 'expo-router';

export default function SportDetailScreen(){
    const {sportId} = useLocalSearchParams();
    const [sportForDetail,setSportForDetail] = useState<ISport>();
    const [sports, setSports] = useState<ISport[]>([]);
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    useEffect(()=> {
        async function getData() {
            try {
                const data = await AsyncStorage.getItem("@SportApp:sports");
                const sportsData: ISport[] = data != null ? JSON.parse(data):[];
                setSports(sportsData)

                sportsData.forEach((element)=>{
                    if(element.id.toString()==sportId){
                        setSportForDetail(element);
                    }
                });
            } catch (e) {
            }
        }

        getData()
    }, [])

    const onDelete = () => {
        if(sportForDetail){
            const newSports: Array<ISport> = [];

            for (let index = 0; index < sports.length;index++) {
                const sport = sports[index];

                if(sport.id != sportForDetail!.id){
                    newSports.push(sport);
                }
            }

            setSports(newSports);
            AsyncStorage.setItem("SportsApp:sports",JSON.stringify(newSports))
        }

        router.replace("/SportsListScreen")
    };

    return(
        <View>
            <ThemedView style={styles.headerContainer}>
                <TouchableOpacity onPress={()=>onDelete}>
                    <Text style={styles.headerButton}>X</Text>
                </TouchableOpacity>
            </ThemedView>

            <View style={styles.box}>
                <Text style={styles.title}>{sportForDetail?sportForDetail.name : ''}</Text>
                <Text style={styles.subTitle}>{sportForDetail?sportForDetail.description : ''}</Text>
            </View>
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
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    subTitle: {
        fontSize: 10,
    },
    headerButton: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingHorizontal: 20,
    },
    headerContainer: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    }
});
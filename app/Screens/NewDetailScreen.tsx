import React, {useEffect, useState} from 'react';
import { StyleSheet,Text, TouchableOpacity,View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { INews } from '@/interfaces/INews';
import { ThemedView } from '@/components/ThemedView';
import { router } from 'expo-router';

export default function SportDetailScreen(){
    const {newId} = useLocalSearchParams();
    const [newForDetail,setNewForDetail] = useState<INews>();
    const [news, setNews] = useState<INews[]>([]);
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    useEffect(()=> {
        async function getData() {
            try {
                const data = await AsyncStorage.getItem("@NewApp:News");
                const newsData: INews[] = data != null ? JSON.parse(data):[];
                setNews(newsData)

                newsData.forEach((element)=>{
                    if(element.id.toString()==newId){
                        setNewForDetail(element);
                    }
                });
            } catch (e) {
            }
        }

        getData()
    }, [])

    const onDelete = () => {
        if(newForDetail){
            const newNews: Array<INews> = [];

            for (let index = 0; index < news.length;index++) {
                const New = news[index];

                if(New.id != newForDetail!.id){
                    newNews.push(New);
                }
            }

            setNews(newNews);
            AsyncStorage.setItem("NewApp:News",JSON.stringify(newNews))
        }

        router.replace("/NewListScreen")
    };

    return(
        <View>
            <ThemedView style={styles.headerContainer}>
                <TouchableOpacity onPress={()=>{onDelete}}>
                    <Text style={styles.headerButton}>X</Text>
                </TouchableOpacity>
            </ThemedView>

            <View style={styles.box}>
                <Text style={styles.title}>{newForDetail?newForDetail.header : ''}</Text>
                <Text style={styles.subTitle}>{newForDetail?newForDetail.description : ''}</Text>
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
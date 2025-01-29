import { StyleSheet,TouchableOpacity, Text } from "react-native";

import { ThemedView } from "@/components/ThemedView";
import MyScrollView from "@/components/MyScrollView";
import {useState,useEffect} from 'react';
import { INews } from "@/interfaces/INews";
import NewModal from "@/components/modals/NewModal";
import News from "@/components/news/News";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import {router} from 'expo-router';

export default function NewsListScreen(){
    const [news, setNews] = useState<INews[]>([]);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [selectedNew, setSelectedNew] = useState<INews>();

    const [location, setLocation] = useState({});
    const [errorMsg, setErrorMsg] = useState('')

    useEffect(()=>{
        async function getData() {
            try{
                const data = await AsyncStorage.getItem('@NewApp:News');
                const newsData = data != null?JSON.parse(data) : [];
                setNews(newsData)
            } catch (e){
            }
        }

        getData()
    }, [])

    useEffect(()=>{
        (async () => {

            let {status} = await Location.requestForegroundPermissionsAsync();
            if (status!=='granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location= await Location.getCurrentPositionAsync({});
            setLocation(location)
        })();
    },[]);

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    }else if (location){
        text = JSON.stringify(location);
    }

    const onAdd = async ( header:string, description: string, id?: number) => {
   
        if(!id || id <= 0){
            const newNews: INews = {
                id: Math.random() * 1000,
                header: header,
                description: description
            };

            const newsPlus: INews[] = [
                ...news,
                newNews
            ];

        setNews(newsPlus);
        AsyncStorage.setItem('@NewApp:News', JSON.stringify(newsPlus))
    }else{
        news.forEach(New=> {
            if(New.id==id){
                New.header = header;
                New.description = description
            }
        });

        AsyncStorage.setItem('@NewApp:News', JSON.stringify(news))
    }
        setModalVisible(false)
    };

    const onDelete = (id:number) => {
        const newNews: Array<INews> = [];

        for (let index=0; index < news.length; index++){
            const New = news[index];

            if(New.id != id){
                newNews.push(New);
            }
        }

        setNews(newNews);
        AsyncStorage.setItem('@NewApp:News', JSON.stringify(newNews))
        setModalVisible(false);
    }

    const openModal = () => {
        setSelectedNew(undefined)
        setModalVisible(true);
    };

    const openEditModal = (selectedNew: INews) => {
        setSelectedNew(selectedNew)
        setModalVisible(true)
    };

     const navigateToDetails = (selectedNew: INews) => {
            router.push({pathname: '/Screens/NewDetailScreen', params: {newId: selectedNew.id}})
        };

    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <MyScrollView
        headerBackgroundColor={{light: '#A1CEDC',dark: '#1D3D47'}}>
            <ThemedView style = { styles.headerContainer}>
                <TouchableOpacity onPress={()=>openModal()}>
                    <Text style={styles.headerButton}>+</Text>
                </TouchableOpacity>
                <Text style={styles.headerButton}>{text}</Text>
            </ThemedView>
            <ThemedView style={styles.container}>

            {news.map(New=>
             <TouchableOpacity onPress={()=> navigateToDetails(New)}>
                <News key = {New.id} header={New.header} description={New.description} />
             </TouchableOpacity>
            
            )}
            </ThemedView>

            <NewModal
                visible={modalVisible}
                onCancel={closeModal}
                onAdd={onAdd}
                onDelete={onDelete}
                news={selectedNew}
            />
        </MyScrollView>
    );

}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    stepContainer: {
        gap:8,
        marginBottom: 8,
    },
    reactLogo: {
        bottom: 0,
        left: 0,
    },
    container: {
        flex: 1,
        backgroundColor: 'gray',
    },
    headerContainer: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerButton: {
        fontWeight: 'bold',
        fontSize: 20,
        paddingHorizontal: 20,
    },
});
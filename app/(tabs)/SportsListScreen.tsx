import { StyleSheet,TouchableOpacity, Text } from "react-native";

import { ThemedView } from "@/components/ThemedView";
import Sport from "@/components/sport/Sport";
import MyScrollView from "@/components/MyScrollView";
import {useEffect, useState} from 'react';
import { ISport } from "@/interfaces/ISport";
import SportModal from "@/components/modals/SportModal";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';

export default function SportsListScreen(){
    const [sports, setSports] = useState<ISport[]>([]);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [selectedSport, setSelectedSport] = useState<ISport>();

    const [location, setLocation] = useState({});
    const [errorMsg, setErrorMsg] = useState('')

    useEffect(()=>{
        async function getData() {
            try{
                const data = await AsyncStorage.getItem('@SportApp:sports');
                const sportsData = data != null?JSON.parse(data) : [];
                setSports(sportsData)
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

    const onAdd = async ( name:string, description: string, id?: number) => {
   
        if(!id || id <= 0){
            const newSport: ISport = {
                id: Math.random() * 1000,
                name: name,
                description: description
            };

            const sportPlus: ISport[] = [
                ...sports,
                newSport
            ];

        setSports(sportPlus);
        AsyncStorage.setItem('@SportApp:sports', JSON.stringify(sportPlus))
    }else{
        sports.forEach(sport=> {
            if(sport.id==id){
                sport.name = name;
                sport.description = description
            }
        });

        AsyncStorage.setItem('@SportApp:sports', JSON.stringify(sports))
    }
    
        setModalVisible(false)
    };

    const onDelete = (id:number) => {
        const newSports: Array<ISport> = [];

        for (let index=0; index < sports.length; index++){
            const sport = sports[index];

            if(sport.id != id){
                newSports.push(sport);
            }
        }

        setSports(newSports);
        AsyncStorage.setItem('@SportApp:sports', JSON.stringify(newSports))
        setModalVisible(false);
    }

    const openModal = () => {
        setSelectedSport(undefined)
        setModalVisible(true);
    };

    const openEditModal = (selectedSport: ISport) => {
        setSelectedSport(selectedSport)
        setModalVisible(true)
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

            {sports.map(sport=>
             <TouchableOpacity onPress={()=> openEditModal(sport)}>
                <Sport key = {sport.id} title={sport.name} subTitle={sport.description} />
             </TouchableOpacity>
            
            )}
            </ThemedView>

            <SportModal
                visible={modalVisible}
                onCancel={closeModal}
                onAdd={onAdd}
                onDelete={onDelete}
                sport={selectedSport}
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
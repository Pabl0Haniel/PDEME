import { StyleSheet,TouchableOpacity, Text } from "react-native";

import { ThemedView } from "@/components/ThemedView";
import New from "@/components/news/News";
import MyScrollView from "@/components/MyScrollView";
import {useState} from 'react';
import { INews } from "@/interfaces/INews";
import NewModal from "@/components/modals/NewModal";

export default function NewsListScreen(){
    const [news, setNews] = useState<INews[]>([]);
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const onAdd = ( header:string, description: string) => {
        const newNew: INews = {
            id: Math.random() * 1000,
            header: header,
            description: description
        };

        const newPlus: INews[] = [
            ...news,
            newNew
        ];

        setNews(newPlus);
        setModalVisible(false)
    };

    const openModal = () => {
        setModalVisible(true);
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
            </ThemedView>
            <ThemedView style={styles.container}>

            {news.map(news=> <New key = {news.id} header={news.header} description={news.description} />)}

            </ThemedView>

            <NewModal
                visible={modalVisible}
                onCancel={closeModal}
                onAdd={onAdd}
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
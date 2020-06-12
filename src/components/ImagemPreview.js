import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

import Colors from '../constants/Colors';

const AvatarImagem = ({ imagem_url, size }) => {

    const renderImagem = () => {
        if (imagem_url.includes('null')) {
            return <Feather name="image" size={42} color="#fff" />
        }
        else {
            return <Image source={{ uri: imagem_url }} style={styles.image} />
        }
    }

    return (
        <View style={styles.imageContainer}>
            {renderImagem()}
        </View>
    )

}

const styles = StyleSheet.create({
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 150,
        height: 150,
        backgroundColor: Colors.grayBackground,
        borderRadius: 125,
        marginRight: 10,
    },
    image: {
        width: 150, 
        height: 150,
        borderRadius: 125,
    }
});

export default AvatarImagem;
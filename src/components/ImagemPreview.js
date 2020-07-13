import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

import Colors from '../constants/Colors';

const AvatarImagem = ({ imagem_url, size }) => {

    const renderImagem = () => {
        if (!imagem_url) {
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
        width: 120,
        height: 120,
        backgroundColor: Colors.grayBackground,
        borderRadius: 125,
        marginRight: 10,
    },
    image: {
        width: 120, 
        height: 120,
        borderRadius: 125,
    }
});

export default AvatarImagem;
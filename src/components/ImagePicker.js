import React from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';

import { DefaultText } from './StyledComponents';

import Colors from '../constants/Colors';

const ImagePicker = (props) => {

    const pickImageHandler = () => {

    }

    return (
        <View style={styles.imagePicker}>
            <View style={styles.imagePreview}>
                <DefaultText>Nenhuma imagem importada ainda.</DefaultText>
                <Image style={styles.image} />
            </View>
            <Button 
                title="Selecionar imagem" 
                color={Colors.pinkText}
                onPress={pickImageHandler}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    imagePicker: {

    },
    imagePreview: {

    },
    image: {

    }
});

export default ImagePicker;
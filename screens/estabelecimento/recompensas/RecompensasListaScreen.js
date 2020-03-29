import React, { useState } from 'react';
import {
    Text,
    TextInput,
    View,
    StyleSheet,
    Platform,
    Animated,
    ScrollView
} from 'react-native';

import { FormInput, DefaultButton } from '../../../components/StyledComponents';

import Page from '../../../components/Page';
import Colors from '../../../constants/Colors';

const RecompensasListaScreen = props => {
    return (
        <Page title='Recompensas'>
            {/* <Text>pagina recompensas</Text>
            <FormInput placeholder="default input2" />
            <DefaultButton title="Cadastrar" backgroundColor={Colors.bgBtnSuccess} /> */}
        </Page>
    );
}

export default RecompensasListaScreen;
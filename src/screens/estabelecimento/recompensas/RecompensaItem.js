import React from 'react';
import {
    TouchableOpacity,
} from 'react-native';

import { ItemLista, ListText, InfoText } from '../../../components/StyledComponents';

const RecompensaItem = ({ item, onPress }) => {
    return (
        <ItemLista
            onPress={onPress}>
            <ListText>{item.descricao}</ListText>
            <InfoText>{item.qtd_pontos} pts</InfoText>
        </ItemLista>
    )
}

export default RecompensaItem;
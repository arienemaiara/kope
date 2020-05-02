import React from 'react';
import {
    TouchableOpacity,
} from 'react-native';

import { ItemLista, ListText, InfoText } from '../../../components/StyledComponents';

const RecompensaItem = ({ item }) => {
    return (
        <ItemLista>
            <ListText>{item.descricao}</ListText>
            <InfoText>{item.qtd_pontos} pts</InfoText>
        </ItemLista>
    )
}

export default RecompensaItem;
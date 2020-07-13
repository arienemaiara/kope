import React from 'react';
import PropTypes from 'prop-types';

import { ItemLista, ListText, InfoText, Row, Column } from './StyledComponents';

import AvatarImagem from './AvatarImagem';

const RecompensaItem = ({ item, onPress }) => {

    return (
        <ItemLista
            onPress={onPress}>
            <Row>
                <AvatarImagem imagem_url={item.imagem_path} />
                <Column>
                    <ListText>{item.descricao}</ListText>
                    <InfoText>{item.qtd_pontos} pts</InfoText>
                </Column>
            </Row>
        </ItemLista>
    )
}


RecompensaItem.propsTypes = {
    item: PropTypes.object.isRequired,
    onPress: PropTypes.func
}

export default RecompensaItem;
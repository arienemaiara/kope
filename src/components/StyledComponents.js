import React from 'react';
import styled from 'styled-components/native';

import Colors from '../constants/Colors';

//------------------- TEXTS ----------------------
export const DefaultText = styled.Text`
    font-family: 'circular-std';
    font-size: ${props => props.fontSize ? props.fontSize+'px' : '14px'};
    color: ${Colors.defaultText};
    margin: 2px;
`;

export const Label = styled(DefaultText)`
    text-transform: uppercase;
    margin: 10px 0;
`;

export const InfoText = styled(DefaultText)`
    font-size: 14px;
    color: ${Colors.grayText};
`;

export const Title = styled(DefaultText)`
    text-align: center;
    font-size: 24px;
    color: white;
    width: 80%;
`;

export const ListText = styled(DefaultText)`
    font-size: 20px;
`;


//------------------- BUTTONS ----------------------
export const ButtonContainer = styled.TouchableOpacity`
    background-color: ${props => props.backgroundColor};
    border-radius: 8px; 
    padding: 15px;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.27);
`;

const ButtonText = styled.Text`
    font-size: 18px;
    font-family: 'circular-std';
    text-transform: uppercase;
    color: white;
    text-align: center;
`;

export const DefaultButton = props => (
    <ButtonContainer 
        onPress={props.onPress}
        backgroundColor={props.backgroundColor}
        style={props.style}>
        <ButtonText>{props.title}</ButtonText>
    </ButtonContainer>
);

//------------------- INPUTS ----------------------
export const DefaultInput = styled.TextInput`
    font-size: 16px;
    color: ${Colors.inputText};
    padding: 12px 15px;
    border: 1px solid;
    border-color: ${Colors.inputBorder};
    border-radius: 8px;
`;
  
export const FormInput = styled(DefaultInput)`
    border-bottom-color: ${Colors.inputBorderBottom};
    border-bottom-width: 4px;
    margin-bottom: 5px;
`;

//------------------- VIEWS ----------------------
export const ItemLista = styled.TouchableOpacity`
    padding: 15px;
    border-bottom-width: 1px;
    border-bottom-color: ${Colors.inputBorder};
    /* border-top-width: 1px;
    border-top-color: ${Colors.inputBorder}; */
    flex-direction: ${props => props.flexRow ? 'row' : 'column'};
    align-items: flex-start;
`;
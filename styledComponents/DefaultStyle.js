import React from 'react';
import styled from 'styled-components/native';

import Colors from '../constants/Colors';

//------------------- TEXTS ----------------------
export const DefaultText = styled.Text`
    font-family: 'circular-std';
    font-size: 14px;
    color: ${Colors.defaultText};
`;

export const Label = styled(DefaultText)`
    font-size: 16px;
    text-transform: uppercase;
`;

export const InfoText = styled(DefaultText)`
    font-size: 14px;
    color: ${Colors.grayText};
`;

export const Title = styled(DefaultText)`
    font-size: 24px;
    color: white;
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
        backgroundColor={props.backgroundColor}>
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
`;
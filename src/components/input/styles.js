import styled from 'styled-components/native';

import Colors from '../constants/Colors';

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
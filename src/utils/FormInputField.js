class FormInputField {
    constructor({
        name,
        label,
        placeholder,
        maskedInput,
        maskedType,
        inputRef,
        keyboardType,
        returnKeyType
    }) {
        this.name = name;
        this.label = label;
        this.placeholder = placeholder;
        this.maskedInput = maskedInput || false;
        this.maskedType = maskedType;
        this.inputRef = inputRef;
        this.keyboardType = keyboardType || 'default'
        this.returnKeyType = returnKeyType || 'default'
    }
}

export default FormInputField;
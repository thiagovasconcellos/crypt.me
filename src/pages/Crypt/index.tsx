import React, { useCallback, useRef, useState } from 'react';
import { Alert } from 'react-native';
import { FormHandles } from '@unform/core';
import Clipboard from '@react-native-community/clipboard';
import * as Yup from 'yup';
import AwesomeAlert from 'react-native-awesome-alerts';

import logo from '../../assets/logo.png';

import RandomMessage from '../../components/MessageRandom';
import Input from '../../components/Input';
import LargeInput from '../../components/LargeInput';
import Button from '../../components/Button';


import I18n from '../../utils/i18n';
import Crypter from '../../utils/crypter';
import getValidationErrors from '../../utils/getValidationErrors';

import { Container, Form, Image } from './styles';

interface DataInterface {
  secret: string;
  text: string;
}

const Crypt: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [showAlert, setShowAlert] = useState(false);

  const handleCrypt = useCallback(async (data: DataInterface) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        secret: Yup.string()
          .required(I18n.t('validationErrorSecretKey')),
        text: Yup.string()
          .required(I18n.t('validationErrorMessage')),
      });

      await schema.validate(data, { 
        abortEarly: false
      });

      const crypter = new Crypter();
      const cipherText = crypter.crypt(data.secret, data.text);
      Clipboard.setString(cipherText);
      setShowAlert(true);
      formRef.current?.clearField('text');
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error);
        formRef.current?.setErrors(errors);
        return;
      }
      Alert.alert(I18n.t('unhandledErrorAlertTitle'), I18n.t('unhandledErrorAlertMessage'));
    }
    
  }, []);
  return (
    <Container>
      <Image source={logo} resizeMode="contain" />
      <RandomMessage />
      <Form ref={formRef} onSubmit={handleCrypt}>
        <Input
          name="secret"
          icon="key" 
          placeholder={I18n.t('placeHolderCryptSecretKey')}
          autoCapitalize='none'
          autoCorrect={false}
        />
        <LargeInput 
          name="text"
          placeholder={I18n.t('placeHolderCryptInputMessage')}
          placeholderTextColor="#666360"
          keyboardAppearance="dark"
          multiline={true}
          numberOfLines={11}
          returnKeyType="send"
          autoCorrect={false}
          autoCapitalize='sentences'
          onSubmitEditing={() => {formRef.current?.submitForm()}}
        />
      </Form>
      <Button 
        onPress={() => {
          formRef.current?.submitForm();
        }}
      >
        {I18n.t("btnCrypt")}
      </Button>
      <AwesomeAlert 
        show={showAlert}
        showProgress={true}
        title={I18n.t('alertTitle')}
        message={I18n.t('alertMessage')}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        showConfirmButton={true}
        confirmText={'OK'}
        confirmButtonColor="#003509"
        onConfirmPressed={() => {
          setShowAlert(!showAlert);
        }}
      />
    </Container>
  );
}

export default Crypt;
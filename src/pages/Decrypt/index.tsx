import React, { useCallback, useRef, useState } from 'react';
import { Alert } from 'react-native';
import Input from '../../components/Input';
import LargeInput from '../../components/LargeInput';
import Button from '../../components/Button';
import { FormHandles } from '@unform/core';
import Clipboard from '@react-native-community/clipboard';
import * as Yup from 'yup';
import AwesomeAlert from 'react-native-awesome-alerts';

import I18n from '../../utils/i18n';
import Crypter from '../../utils/crypter';
import getValidationErrors from '../../utils/getValidationErrors';
import RandomMessage from '../../components/MessageRandom';

import logo from '../../assets/logo.png';

import { Container, Form, Image } from './styles';

interface DataInterface {
  secret: string;
  encryptedText: string;
}

const Decrypt: React.FC = () => {
  const [clipboard, setClipboard] = useState('');
  const [decryptedMessage, setDecryptedMessage] = useState<string>('');
  const [showAlert, setShowAlert] = useState(false);
  const formRef = useRef<FormHandles>(null);

  
  const handleDecrypt = useCallback(async (data: DataInterface) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        secret: Yup.string()
          .required(I18n.t('validationErrorSecretKey')),
          encryptedText: Yup.string()
          .required(I18n.t('validationErrorMessage')),
      });

      await schema.validate(data, { 
        abortEarly: false
      });

      const crypter = new Crypter();
      const cipherText = crypter.decrypt(data.secret, data.encryptedText);
      setDecryptedMessage(cipherText); 
      formRef.current?.clearField('encryptedText');
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error);
        formRef.current?.setErrors(errors);
        return;
      }
      Alert.alert(I18n.t('unhandledErrorAlertTitle'), I18n.t('unhandledErrorAlertMessage'));
    }
  }, []);
  
  const handleInputClickedWithClipboard = useCallback(async () => {
    if (Clipboard.hasString()) {
      const content = await Clipboard.getString();
      setClipboard(content);
      setShowAlert(true);
    }
  },[]);
  
  return (
    <Container>
      <Image source={logo} resizeMode="contain" />
      <RandomMessage />
      <Form ref={formRef} onSubmit={handleDecrypt}>
        <Input 
          name="secret"
          icon="key" 
          placeholder={I18n.t('placeHolderDecryptSecretKey')}
          autoCapitalize='none'
          autoCorrect={false}
        />
        <Input
          name="encryptedText"
          icon="chatbox-sharp"
          placeholder={I18n.t('placeHolderDecryptPastMessage')}
          placeholderTextColor="#666360"
          keyboardAppearance="dark"
          onFocus={handleInputClickedWithClipboard}
        />
        <LargeInput 
          name="decryptedText"
          placeholder={I18n.t('placeHolderDecryptedMessage')}
          placeholderTextColor="#666360"
          keyboardAppearance="dark"
          multiline={true}
          value={decryptedMessage}
          numberOfLines={11}
          editable={true}
          scrollEnabled={true}
        />
      </Form>
      <Button onPress={() => {
          formRef.current?.submitForm();
        }}>{I18n.t("btnDecrypt")}
      </Button>
      <AwesomeAlert 
        show={showAlert}
        showProgress={true}
        title={I18n.t('alertDecryptPasteFromClipboardTitle')}
        message={I18n.t('alertDecryptPasteFromClipboardMessage')}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText={I18n.t('alertDecryptPasteFromClipboardCancel')}
        confirmText={I18n.t('alertDecryptPasteFromClipboardConfirm')}
        confirmButtonColor="#003509"
        cancelButtonColor="#c53030"
        onConfirmPressed={() => {
          formRef.current?.setFieldValue('encryptedText', clipboard);
          setShowAlert(!showAlert);
        }}
        onCancelPressed={() => {
          setShowAlert(!showAlert);
        }}
      />
    </Container>
  );
}

export default Decrypt;
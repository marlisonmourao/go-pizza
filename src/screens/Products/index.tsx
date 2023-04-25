import { useState } from 'react'
import { Platform, TouchableOpacity, ScrollView } from 'react-native'
import * as ImagePicker from 'expo-image-picker'

import {
  Container,
  DeleteLabel,
  Form,
  Header,
  InputGroup,
  InputGroupHeader,
  Label,
  MaxCaracters,
  PickImageButton,
  Title,
  Upload,
} from './styles'

import { ButtonBack } from '@components/ButtonBack'
import { Photo } from '@components/Photo'
import { InputPrice } from '@components/InputPrice'
import { Input } from '@components/Input'
import { Button } from '@components/Button'

export function Products() {
  const [image, setImage] = useState('')

  async function handlePickerImage() {
    const { status } = await ImagePicker.requestCameraPermissionsAsync()

    if (status === 'granted') {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 4],
      })

      if (!result.canceled) {
        setImage(result.assets[0].uri)
      }
    }
  }

  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header>
          <ButtonBack />
          <Title>Cadastrar</Title>
          <TouchableOpacity>
            <DeleteLabel>Deletar</DeleteLabel>
          </TouchableOpacity>
        </Header>

        <Upload>
          <Photo uri={image} />

          <PickImageButton
            title="Carregar"
            type="secondary"
            onPress={handlePickerImage}
          />
        </Upload>

        <Form>
          <InputGroup>
            <Label>Nome</Label>
            <Input />
          </InputGroup>

          <InputGroup>
            <InputGroupHeader>
              <Label>Descrição</Label>
              <MaxCaracters>0 de 60 caracteres</MaxCaracters>
            </InputGroupHeader>

            <Input multiline maxLength={60} style={{ height: 80 }} />
          </InputGroup>

          <InputGroup>
            <Label>Tamanhos e preços</Label>
            <InputPrice size="P" />
            <InputPrice size="M" />
            <InputPrice size="G" />
          </InputGroup>

          <Button title="Cadastrar pizza" />
        </Form>
      </ScrollView>
    </Container>
  )
}

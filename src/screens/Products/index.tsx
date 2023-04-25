import { useState } from 'react'
import { Platform, TouchableOpacity } from 'react-native'
import * as ImagePicker from 'expo-image-picker'

import {
  Container,
  DeleteLabel,
  Header,
  PickImageButton,
  Title,
  Upload,
} from './styles'

import { ButtonBack } from '@components/ButtonBack'
import { Photo } from '@components/Photo'

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
    </Container>
  )
}

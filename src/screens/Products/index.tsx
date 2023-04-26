import { useState } from 'react'
import { Platform, TouchableOpacity, ScrollView, Alert } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'

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
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [priceSizesP, setPriceSizesP] = useState('')
  const [priceSizesM, setPriceSizesM] = useState('')
  const [priceSizesG, setPriceSizesG] = useState('')
  const [isLoading, setIsLoading] = useState(false)
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

  async function handleAdd() {
    if (!name.trim()) {
      return Alert.alert('Cadastro', 'Preencha o nome da pizza')
    }

    if (!description.trim()) {
      return Alert.alert('Cadastro', 'Preencha a descrição')
    }

    if (!image.trim()) {
      return Alert.alert('Cadastro', 'Selecione a imagem da pizza.')
    }

    if (!priceSizesP.trim() || !priceSizesM.trim() || !priceSizesG.trim()) {
      return Alert.alert(
        'Cadastro',
        'Informe o preço de todos os tamanhos da pizza.',
      )
    }

    setIsLoading(true)

    const fileName = new Date().getTime()
    const reference = storage().ref(`/pizzas/${fileName}.png`)

    await reference.putFile(image)
    const photo_url = await reference.getDownloadURL()

    firestore()
      .collection('pizzas')
      .add({
        name,
        name_insensitive: name.toLowerCase().trim(),
        description,
        price_sizes: {
          p: priceSizesP,
          m: priceSizesM,
          g: priceSizesG,
        },
        photo_url,
        photo_path: reference.fullPath,
      })
      .then(() => Alert.alert('Cadastro', 'Pizza cadastrada com sucesso.'))
      .catch(() => Alert.alert('Cadastro', 'Erro ao cadastrar pizza.'))

    setIsLoading(false)
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
            <Input onChangeText={setName} value={name} />
          </InputGroup>

          <InputGroup>
            <InputGroupHeader>
              <Label>Descrição</Label>
              <MaxCaracters>0 de 60 caracteres</MaxCaracters>
            </InputGroupHeader>

            <Input
              multiline
              maxLength={60}
              style={{ height: 80 }}
              onChangeText={setDescription}
              value={description}
            />
          </InputGroup>

          <InputGroup>
            <Label>Tamanhos e preços</Label>
            <InputPrice
              size="P"
              onChangeText={setPriceSizesP}
              value={priceSizesP}
            />
            <InputPrice
              size="M"
              onChangeText={setPriceSizesM}
              value={priceSizesM}
            />
            <InputPrice
              size="G"
              onChangeText={setPriceSizesG}
              value={priceSizesG}
            />
          </InputGroup>

          <Button
            title="Cadastrar pizza"
            isLoading={isLoading}
            onPress={handleAdd}
          />
        </Form>
      </ScrollView>
    </Container>
  )
}

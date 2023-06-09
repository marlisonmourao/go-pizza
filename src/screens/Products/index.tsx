import { useEffect, useState } from 'react'
import {
  Platform,
  TouchableOpacity,
  ScrollView,
  Alert,
  View,
} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'

import { useRoute, useNavigation } from '@react-navigation/native'

import { ProductNavigationProps } from 'src/@types/navigation'

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
import { ProductProps } from '@dtos/productDTO'

type PizzaResponse = ProductProps & {
  photo_path: string
  price_sizes: {
    p: string
    m: string
    g: string
  }
}

export function Products() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [priceSizesP, setPriceSizesP] = useState('')
  const [priceSizesM, setPriceSizesM] = useState('')
  const [priceSizesG, setPriceSizesG] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [image, setImage] = useState('')
  const [photoPath, setPhotoPath] = useState('')

  const navigation = useNavigation()
  const route = useRoute()
  const { id } = route.params as ProductNavigationProps

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
      .then(() => {
        navigation.navigate('home')
      })
      .catch(() => {
        setIsLoading(false)
        Alert.alert('Cadastro', 'Erro ao cadastrar pizza.')
      })

    setIsLoading(false)
  }

  function handleGoBack() {
    navigation.goBack()
  }

  function handleDelete() {
    firestore()
      .collection('pizzas')
      .doc(id)
      .delete()
      .then(() => {
        storage()
          .ref(photoPath)
          .delete()
          .then(() => navigation.navigate('home'))
      })
  }

  useEffect(() => {
    if (id) {
      firestore()
        .collection('pizzas')
        .doc(id)
        .get()
        .then((response) => {
          const product = response.data() as PizzaResponse

          setName(product.name)
          setImage(product.photo_url)
          setPhotoPath(product.photo_path)
          setDescription(product.description)
          setPriceSizesP(product.price_sizes.p)
          setPriceSizesM(product.price_sizes.m)
          setPriceSizesG(product.price_sizes.g)
        })
    }
  }, [id])

  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header>
          <ButtonBack onPress={handleGoBack} />
          {!id ? <Title>Cadastrar</Title> : <Title>{name}</Title>}
          {id ? (
            <TouchableOpacity onPress={handleDelete}>
              <DeleteLabel>Deletar</DeleteLabel>
            </TouchableOpacity>
          ) : (
            <View style={{ width: 20 }} />
          )}
        </Header>

        <Upload>
          <Photo uri={image} />

          {!id && (
            <PickImageButton
              title="Carregar"
              type="secondary"
              onPress={handlePickerImage}
            />
          )}
        </Upload>

        <Form>
          <InputGroup>
            <Label>Nome</Label>
            <Input onChangeText={setName} value={name} />
          </InputGroup>

          <InputGroup>
            <InputGroupHeader>
              <Label>Descrição</Label>
              <MaxCaracters>{description.length} de 60 caracteres</MaxCaracters>
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

          {!id && (
            <Button
              title="Cadastrar Pizza"
              isLoading={isLoading}
              onPress={handleAdd}
            />
          )}
        </Form>
      </ScrollView>
    </Container>
  )
}

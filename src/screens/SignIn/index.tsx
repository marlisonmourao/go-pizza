import { KeyboardAvoidingView, Platform } from 'react-native'

import {
  Container,
  Content,
  Title,
  Brand,
  ForgotPasswordButton,
  ForgotPasswordText,
} from './styles'

import { Input } from '@components/Input'
import { Button } from '@components/Button'

import brandImg from '@assets/brand.png'

export function SignIn() {
  return (
    <Container>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Content>
          <Brand source={brandImg} />

          <Title>Login</Title>

          <Input
            placeholder="E-mail"
            type="secondary"
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <Input placeholder="Senha" type="secondary" secureTextEntry />

          <ForgotPasswordButton>
            <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
          </ForgotPasswordButton>

          <Button title="Entrar" type="secondary" />
        </Content>
      </KeyboardAvoidingView>
    </Container>
  )
}

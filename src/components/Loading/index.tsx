import { Container, LoadingIndicator } from './styles'

export function Loading() {
  return (
    <Container>
      <LoadingIndicator size={20} color="red" />
    </Container>
  )
}

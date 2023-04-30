import { Container, Notifications, Quantity, Title } from './styles'

type Props = {
  title: string
  color: string
  notifications?: string | undefined
}

export function BottomMenu({ color, notifications, title }: Props) {
  const noNotification = notifications === '0'

  return (
    <Container>
      <Title color={color}>{title}</Title>

      {notifications && (
        <Notifications noNotnotifications={noNotification}>
          <Quantity noNotnotifications={noNotification}>
            {notifications}
          </Quantity>
        </Notifications>
      )}
    </Container>
  )
}

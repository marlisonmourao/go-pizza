import styled, { css } from 'styled-components/native'

type TitleProps = {
  color: string
}

type NotificationsProps = {
  noNotnotifications: boolean
}

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
`

export const Title = styled.Text<TitleProps>`
  font-size: 18px;

  ${({ theme, color }) => css`
    font-family: ${theme.FONTS.TITLE};
    color: ${color};
  `}
`

export const Notifications = styled.View<NotificationsProps>`
  height: 20px;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
  padding: 0 12px;
  margin-left: 8px;

  ${({ theme, noNotnotifications }) =>
    !noNotnotifications &&
    css`
      background-color: ${theme.COLORS.SUCCESS_900};
    `}

  ${({ theme, noNotnotifications }) =>
    noNotnotifications &&
    css`
      background-color: transparent;
      border: 1px solid ${theme.COLORS.SHAPE};
    `}
`

export const Quantity = styled.Text<NotificationsProps>`
  font-size: 12px;

  ${({ theme, noNotnotifications }) => css`
    color: ${noNotnotifications
      ? theme.COLORS.SECONDARY_500
      : theme.COLORS.TITLE};
    font-family: ${theme.FONTS.TEXT};
  `}
`

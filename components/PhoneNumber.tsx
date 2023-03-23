import React from 'react'
import styled from 'styled-components'

type Props = {
  hideReal?: Boolean,
  secured: string,
  real: string
}

const Wrapper = styled.span`
  cursor: pointer;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
`

const PhoneNumber = ({ hideReal = true, secured, real }: Props) => {
  const [hide, setHide] = React.useState<Boolean>(hideReal)

  const toggleHideUnhide = () => {
    setHide(!hide)
  }
    
  return (
    <Wrapper onClick={toggleHideUnhide}>
      {hide
        ? secured
        : real}
    </Wrapper>
  )
}

export default PhoneNumber

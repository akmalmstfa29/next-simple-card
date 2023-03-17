import Head from 'next/head'
import { ReactNode } from 'react'
import styled from 'styled-components'

type Props = {
  children?: ReactNode
  title?: string
}

const LayoutWrapper = styled.div`
  @import url("https://fonts.cdnfonts.com/css/avenir-next-lt-pro");

  * {
    font-family: "Avenir Next LT Pro";
  }
`

const Layout = ({ children, title = 'This is the default title' }: Props) => (
  <LayoutWrapper>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    {children}
  </LayoutWrapper>
)

export default Layout

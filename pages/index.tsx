import Link from 'next/link'
import Layout from '../components/Layout'
import ListingAdCard from '../components/ListingAdCard'
import { samplePropertyData } from '../utils/sample-data'

const IndexPage = () => (
  <Layout title="99 Group Sr. FrontEnd Engineer - Akmal">
    <ListingAdCard data={samplePropertyData}
    />
  </Layout>
)

export default IndexPage

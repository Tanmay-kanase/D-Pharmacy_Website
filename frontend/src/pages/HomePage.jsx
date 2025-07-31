import { Helmet } from "react-helmet"
import Layout from "../components/layout/Layout"
import Hero from "../components/home/Hero"
import Highlights from "../components/home/Highlights"
import RecentNotices from "../components/home/RecentNotices"

const HomePage = () => {
  return (
    <Layout>
      <Helmet>
        <title>Home - D. Pharmacy College</title>
        <meta
          name="description"
          content="Welcome to D. Pharmacy College - Premier pharmaceutical education with modern facilities and experienced faculty."
        />
      </Helmet>
      <Hero />
      <Highlights />
      <RecentNotices />
    </Layout>
  )
}

export default HomePage

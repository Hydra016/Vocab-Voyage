import Navbar from '@/components/shared/Navbar'
import React from 'react'
import { 
    Container,
    SlideFade,
} from '@chakra-ui/react'
import InitialComponent from '@/components/shared/InitialComponent'

const index = () => {

  return (
    <SlideFade offsetY='20px' in={true}>
    <Container overflow="hidden" maxW="100%" height="100vh" p={5}>
        <Navbar />
        <InitialComponent />
    </Container>
    </SlideFade>

  )
}

export default index
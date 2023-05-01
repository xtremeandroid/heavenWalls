import {HStack, Text, Heading} from '@chakra-ui/react'
import React from 'react'

const PageHeading = ({pageDetail}) => {
  return <HStack p={"5"} shadow={"base"} bgColor={'blackAlpha.900'} justifyContent={"center"}>
  <Heading fontSize={'3xl'} color={"white"}>{pageDetail}</Heading>
</HStack>
}

export default PageHeading
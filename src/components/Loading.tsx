import { CircularProgress, Flex } from "@chakra-ui/react"

const Loading = () => {
    return (
        <Flex justifyContent='center' alignItems='center' width='full' background='whiteAlpha.800' position='absolute' zIndex={99}>
            <CircularProgress size='xs' isIndeterminate />
        </Flex>
    )
}

export default Loading
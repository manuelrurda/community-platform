import { Flex, Box, Text } from 'theme-ui'
import { Button } from '../Button/Button'
import { InternalLink } from '../InternalLink/InternalLink'

export interface BlockedRouteProps {
  children: React.ReactNode
}

export const BlockedRoute = (props: BlockedRouteProps) => {
  return (
    <Flex
      sx={{ justifyContent: 'center', flexDirection: 'column', mt: 8 }}
      data-cy="BlockedRoute"
    >
      <Text sx={{ width: '100%', textAlign: 'center' }}>{props.children}</Text>
      <Box sx={{ textAlign: 'center', mt: 2 }}>
        <InternalLink to={'/'}>
          <Button variant={'subtle'} small>
            Back to home
          </Button>
        </InternalLink>
      </Box>
    </Flex>
  )
}

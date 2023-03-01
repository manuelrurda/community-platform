import { inject, observer } from 'mobx-react'
import React from 'react'
import type { RouteComponentProps } from 'react-router'
import { Loader } from 'oa-components'
import { Text } from 'theme-ui'
import type { IHowtoDB, IUserPP } from 'src/models'
import { ProfileType } from 'src/modules/profile/types'
import type { ThemeStore } from 'src/stores/Theme/theme.store'
import type { UserStore } from 'src/stores/User/user.store'
import { MemberProfile } from './MemberProfile'
import { SpaceProfile } from './SpaceProfile'
import type { HowtoStore } from 'src/stores/Howto/howto.store'
import type { AggregationsStore } from 'src/stores/Aggregations/aggregations.store'

interface IRouterCustomParams {
  id: string
}

interface InjectedProps extends RouteComponentProps<IRouterCustomParams> {
  userStore: UserStore
  themeStore: ThemeStore
  howtoStore: HowtoStore
  aggregationsStore: AggregationsStore
}

interface IState {
  user?: IUserPP
  isLoading: boolean
  howtos: IHowtoDB[]
  aggregations: any
}

interface IProps {}

// TODO: Replace this logic with a simpler mobx-react hook: https://mobx-react.js.org/recipes-migration
@inject(
  'userStore',
  'themeStore',
  'howtoStore',
  'aggregationsStore',
)
@observer
export class UserPage extends React.Component<
  RouteComponentProps<IRouterCustomParams>,
  IState,
  IProps
> {
  constructor(props: any) {
    super(props)
    props.howtoStore.init()
    this.state = {
      user: undefined,
      isLoading: true,
      howtos: [],
      aggregations: null,
    }
  }

  get injected() {
    return this.props as InjectedProps
  }

  /* eslint-disable @typescript-eslint/naming-convention*/
  async UNSAFE_componentWillMount() {
    const userid = this.props.match.params.id
    const userData = await this.injected.userStore.getUserProfile(userid)
    const howtos = this.injected.howtoStore.getHowtosByUserId(userid)
    this.injected.aggregationsStore!.updateAggregation(
      'users_votedUsefulHowtos',
    )
    const aggregations = await this.injected.aggregationsStore.aggregations
    this.setState({
      user: userData || null,
      isLoading: false,
      howtos,
      aggregations,
    })
  }

  render() {
    const { user, isLoading, howtos } = this.state

    // Get all howto ids associated with this user
    let usefulCount = 0
    howtos
      .map(({ _id }) => _id)
      .forEach((id) => {
        usefulCount += this.state.aggregations.users_votedUsefulHowtos?.[id] || 0
      })

    if (isLoading) {
      return <Loader />
    }
    if (!user) {
      return (
        <Text
          sx={{
            width: '100%',
            textAlign: 'center',
            display: 'block',
            marginTop: 10,
          }}
        >
          User not found
        </Text>
      )
    }
    return (
      <>
        {user.profileType === ProfileType.MEMBER ||
        user.profileType === undefined ? (
          <>
            <h1>{usefulCount}</h1>
            <MemberProfile data-cy="memberProfile" user={user} />
          </>
        ) : (
          <SpaceProfile data-cy="spaceProfile" user={user} />
        )}
      </>
    )
  }
}

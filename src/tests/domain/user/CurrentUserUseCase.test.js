import {Pajarito} from '../../domain'

let domain
describe('CurrentUserUseCase#execute', () => {
  beforeEach(() => {
    domain = new Pajarito()
  })

  afterEach(() => {
    domain = null
  })
  it('Happy path', async () => {
    const logout = await domain.get('logoutUserUseCase').execute()

    expect(logout.status).toEqual(true)
  })
})

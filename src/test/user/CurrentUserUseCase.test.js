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
    const [error, logout] = await domain.get('logoutUserUseCase').execute()

    expect(error).toEqual(null)
    expect(logout.status).toEqual(true)
  })
})

import {TrinoRepository} from './TrinoRepository'
import {TrinoEntity} from '../Entities/TrinoEntity'

const EMPTY_DB = JSON.stringify({trinos: []})
const TRINOS_KEY = 'trinos'

export class LocalStorageTrinoRepository extends TrinoRepository {
  #trinosListValueFactory
  #trinoEntityFactory
  #localStorage

  constructor({localStorage, trinoEntityFactory, trinosListValueFactory}) {
    super()
    this.#localStorage = localStorage
    this.#trinoEntityFactory = trinoEntityFactory
    this.#trinosListValueFactory = trinosListValueFactory
  }

  all() {
    const trinosJSON = this.#localStorage.getItem(TRINOS_KEY) || EMPTY_DB
    const trinosDB = JSON.parse(trinosJSON)

    const trinos = trinosDB.trinos.map(this.#trinoEntityFactory)

    return this.#trinosListValueFactory({
      trinos: trinos.map(trino => trino.toJSON())
    })
  }

  create({body, user}) {
    const id = TrinoEntity.generateUUID()
    const trinosJSON = this.#localStorage.getItem(TRINOS_KEY) || EMPTY_DB
    const trinosDB = JSON.parse(trinosJSON)

    const newTrino = this.#trinoEntityFactory({
      id,
      timestamp: Date.now(),
      user: user.toJSON(),
      body: body.toJSON()
    })

    const nextTrinosDB = {
      trinos: [newTrino.toJSON(), ...trinosDB.trinos]
    }

    this.#localStorage.setItem(TRINOS_KEY, JSON.stringify(nextTrinosDB))

    return newTrino
  }
}

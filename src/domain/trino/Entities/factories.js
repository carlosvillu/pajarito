import {UserEntitiesFactory} from '../../user/Entities/factories'
import {TrinoValueObjectsFactory} from '../ValueObjects/factories'

import {TrinoEntity} from './TrinoEntity'

export class TrinoEntitiesFactory {
  static trinoEntity({body, id, user, timestamp}) {
    const bodyValueObject = TrinoValueObjectsFactory.bodyValueObject(body)
    const userEntity = UserEntitiesFactory.userEntity(user)

    TrinoEntity.validate({
      id,
      timestamp,
      body: bodyValueObject,
      user: userEntity
    })

    return new TrinoEntity({
      body: bodyValueObject,
      id,
      user: userEntity,
      timestamp
    })
  }
}

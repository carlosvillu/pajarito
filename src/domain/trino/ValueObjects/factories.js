import {TrinoEntitiesFactory} from '../Entities/factories'

import {BodyValueObject} from './BodyValueObject'
import {TrinosListValueObject} from './TrinosListValueObject'

export class TrinoValueObjectsFactory {
  static bodyValueObject({body}) {
    BodyValueObject.validate({body})
    return new BodyValueObject({body})
  }

  static trinosListValueObject({trinos}) {
    const trinosEntities = trinos.map(TrinoEntitiesFactory.trinoEntity)

    TrinosListValueObject.validate({trinos: trinosEntities})

    return new TrinosListValueObject({trinos: trinosEntities})
  }
}

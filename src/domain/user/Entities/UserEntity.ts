import { Entity } from '../../common/Entity'

export class UserEntity extends Entity {
  static generateUUID() {
    let dt = new Date().getTime()
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        const r = (dt + Math.random() * 16) % 16 | 0
        dt = Math.floor(dt / 16)
        return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
      }
    )
    return uuid
  }

  static validate({ id, username }: { id: string; username: string }) {
    if (!username || !id) {
      throw new Error(
        `[UserEntity.validate] forbidden UserEntity username(${username}) id(${id})`
      )
    }
  }

  constructor(private id: string, private username: string) {
    super()
  }

  toJSON() {
    return {
      username: this.username,
      id: this.id,
    }
  }
}

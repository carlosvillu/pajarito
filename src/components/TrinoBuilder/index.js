/*eslint-disable*/


import React, {useContext} from 'react'
import {Global} from '../../context.js'

const TrinoBuilder = () => {
  const {domain} = useContext(Global)

  const handleSubmit = () => {
    const [
      [firstError, firstTrino],
      [secondError, secondTrino],
      [thirdError, thirdTrino],
    ] = Promise.all([
      domain.get('createTrinoUseCase').execute({body: 'My first trino'}),
      domain.get('createTrinoUseCase').execute({body: 'My second trino'}),
      domain.get('createTrinoUseCase').execute({body: 123}), // numbers are forbidden as bodies
    ])


    if (firstError || secondError || thirdError) return console.error(firstError || secondError || thirdError)

    console.log(firstTrino, secondTrino, thirdTrino)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="trino" />
      <button type="submit">trino</button>
    </form>
  )
}

TrinoBuilder.displayName = 'TrinoBuilder'
export default TrinoBuilder

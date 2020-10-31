import {createContext} from 'react'
import {Pajarito} from './domain'

const domain = new Pajarito()

export const Global = createContext({domain})

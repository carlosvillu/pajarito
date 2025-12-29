// Singleton domain instance for React Router 7 loaders/actions
import { Pajarito } from './domain/index.ts'

// Re-export the domain singleton
export const domain = new Pajarito()

// Also make it available as default export
export default domain

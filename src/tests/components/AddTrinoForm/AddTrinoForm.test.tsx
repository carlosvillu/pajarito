import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { AddTrinoForm } from '../../../components/AddTrinoForm/AddTrinoForm'
import { Global } from '../../../contexts/global'

const createMockDomain = (mockExecute = jest.fn()) => ({
  get: jest.fn(() => ({
    execute: mockExecute,
  })),
})

describe('AddTrinoForm', () => {
  let mockExecute
  let mockDomain

  beforeEach(() => {
    mockExecute = jest.fn().mockResolvedValue([null, { id: 'trino-123' }])
    mockDomain = createMockDomain(mockExecute)
  })

  const renderWithContext = () => {
    return render(
      <Global.Provider value={{ domain: mockDomain }}>
        <AddTrinoForm cb={jest.fn()} />
      </Global.Provider>,
    )
  }

  describe('rendering', () => {
    it('should render the form with text field', () => {
      renderWithContext()

      expect(screen.getByRole('textbox', { name: /trino text/i })).toBeVisible()
      expect(screen.getByRole('button', { name: /send/i })).toBeVisible()
    })

    it('should render camera button', () => {
      renderWithContext()

      // Camera button is the first button with an SVG icon
      const cameraButton = document.querySelector('button[type="button"]')
      expect(cameraButton).toBeVisible()
    })

    it('should render file input', () => {
      renderWithContext()

      const fileInput = document.querySelector('input[type="file"]')
      expect(fileInput).toBeInTheDocument()
      expect(fileInput).toHaveAttribute('accept', 'image/jpeg,image/png,image/gif,image/webp')
    })
  })

  describe('submit', () => {
    it('should submit form with body text', async () => {
      renderWithContext()

      const textField = screen.getByRole('textbox', { name: /trino text/i })
      fireEvent.change(textField, { target: { value: 'Hello world' } })

      const submitButton = screen.getByRole('button', { name: /send/i })
      fireEvent.click(submitButton)

      await waitFor(() => {
        expect(mockExecute).toHaveBeenCalledWith({
          body: 'Hello world',
          images: [],
        })
      })
    })

    it('should submit form with empty images array by default', async () => {
      renderWithContext()

      const textField = screen.getByRole('textbox', { name: /trino text/i })
      fireEvent.change(textField, { target: { value: 'Test' } })

      const submitButton = screen.getByRole('button', { name: /send/i })
      fireEvent.click(submitButton)

      await waitFor(() => {
        expect(mockExecute).toHaveBeenCalledWith(
          expect.objectContaining({ images: [] }),
        )
      })
    })

    it('should call callback on successful submit', async () => {
      const callback = jest.fn()
      render(
        <Global.Provider value={{ domain: mockDomain }}>
          <AddTrinoForm cb={callback} />
        </Global.Provider>,
      )

      const textField = screen.getByRole('textbox', { name: /trino text/i })
      fireEvent.change(textField, { target: { value: 'Test trino' } })

      const submitButton = screen.getByRole('button', { name: /send/i })
      fireEvent.click(submitButton)

      await waitFor(() => {
        expect(callback).toHaveBeenCalledWith({ id: 'trino-123' })
      })
    })

    it('should show alert on error', async () => {
      const mockErrorExecute = jest.fn().mockResolvedValue([new Error('Test error'), null])
      const errorDomain = createMockDomain(mockErrorExecute)
      window.alert = jest.fn()

      render(
        <Global.Provider value={{ domain: errorDomain }}>
          <AddTrinoForm cb={jest.fn()} />
        </Global.Provider>,
      )

      const textField = screen.getByRole('textbox', { name: /trino text/i })
      fireEvent.change(textField, { target: { value: 'Test' } })

      const submitButton = screen.getByRole('button', { name: /send/i })
      fireEvent.click(submitButton)

      await waitFor(() => {
        expect(window.alert).toHaveBeenCalledWith('Test error')
      })
    })
  })

  describe('form state', () => {
    it('should reset form after successful submit', async () => {
      renderWithContext()

      const textField = screen.getByRole('textbox', { name: /trino text/i })
      fireEvent.change(textField, { target: { value: 'Test' } })

      const submitButton = screen.getByRole('button', { name: /send/i })
      fireEvent.click(submitButton)

      await waitFor(() => {
        expect(textField).toHaveValue('')
      })
    })
  })
})

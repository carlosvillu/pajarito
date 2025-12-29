import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { AddTrinoForm } from '../../../components/AddTrinoForm/AddTrinoForm'
import { Global } from '../../../contexts/global'

describe('AddTrinoForm', () => {
  const renderWithContext = (cb = jest.fn()) => {
    return render(
      <Global.Provider value={{ domain: {} }}>
        <AddTrinoForm cb={cb} isTestEnv />
      </Global.Provider>
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
      expect(fileInput).toHaveAttribute(
        'accept',
        'image/jpeg,image/png,image/gif,image/webp'
      )
    })
  })

  describe('submit', () => {
    it('should call callback on submit', async () => {
      const callback = jest.fn()
      renderWithContext(callback)

      const textField = screen.getByRole('textbox', { name: /trino text/i })
      fireEvent.change(textField, { target: { value: 'Hello world' } })

      const submitButton = screen.getByRole('button', { name: /send/i })
      fireEvent.click(submitButton)

      await waitFor(() => {
        expect(callback).toHaveBeenCalled()
        // Callback should receive a trino object with an id
        const calledWith = callback.mock.calls[0][0]
        expect(calledWith).toHaveProperty('id')
        expect(calledWith.id).toMatch(/^trino-\d+$/)
      })
    })

    it('should submit form with body text in callback', async () => {
      const callback = jest.fn()
      renderWithContext(callback)

      const textField = screen.getByRole('textbox', { name: /trino text/i })
      fireEvent.change(textField, { target: { value: 'Test trino content' } })

      const submitButton = screen.getByRole('button', { name: /send/i })
      fireEvent.click(submitButton)

      await waitFor(() => {
        expect(callback).toHaveBeenCalled()
      })
    })

    it('should call callback with trino object on successful submit', async () => {
      const callback = jest.fn()
      renderWithContext(callback)

      const textField = screen.getByRole('textbox', { name: /trino text/i })
      fireEvent.change(textField, { target: { value: 'Test' } })

      const submitButton = screen.getByRole('button', { name: /send/i })
      fireEvent.click(submitButton)

      await waitFor(() => {
        expect(callback).toHaveBeenCalledWith(
          expect.objectContaining({
            id: expect.stringMatching(/^trino-\d+$/),
          })
        )
      })
    })
  })

  describe('form state', () => {
    it('should reset form after successful submit', async () => {
      const callback = jest.fn()
      renderWithContext(callback)

      const textField = screen.getByRole('textbox', { name: /trino text/i })
      fireEvent.change(textField, { target: { value: 'Test' } })

      const submitButton = screen.getByRole('button', { name: /send/i })
      fireEvent.click(submitButton)

      // Wait for the async callback to be called
      await waitFor(
        () => {
          expect(callback).toHaveBeenCalled()
        },
        { timeout: 200 }
      )

      // Check that text field is empty after submit
      await waitFor(
        () => {
          expect(textField).toHaveValue('')
        },
        { timeout: 200 }
      )
    })

    it('should show submitting state during submit', async () => {
      const callback = jest.fn()
      renderWithContext(callback)

      const textField = screen.getByRole('textbox', { name: /trino text/i })
      fireEvent.change(textField, { target: { value: 'Test' } })

      const submitButton = screen.getByRole('button', { name: /send/i })
      fireEvent.click(submitButton)

      // Button should show "Sending..." during submit
      expect(
        screen.getByRole('button', { name: /sending.../i })
      ).toBeInTheDocument()

      // Wait for submit to complete
      await waitFor(
        () => {
          expect(callback).toHaveBeenCalled()
        },
        { timeout: 200 }
      )
    })
  })
})

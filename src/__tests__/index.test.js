const mockRender = jest.fn()

jest.mock('react-dom', () => ({
  render: mockRender,
}))

describe('index.js', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    document.body.innerHTML = '<div id="app"></div>'
  })

  test('renders the App component into the #app element', () => {
    require('index')
    expect(mockRender).toHaveBeenCalledTimes(1)
    expect(mockRender.mock.calls[0][1]).toBe(document.getElementById('app'))
  })

  test('ensures the target element exists before rendering', () => {
    const appElement = document.getElementById('app')
    expect(appElement).not.toBeNull()
    expect(appElement.tagName).toBe('DIV')
  })
})
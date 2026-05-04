import { proxy } from 'valtio/vanilla'
import './style.css'
import * as yup from 'yup'
import initView from './view.js'

const state = proxy({
  feeds: [],
  form: {
    status: 'filling',
    error: null,
  },
})
const getSchema = (feeds) => {
  return yup
    .string()
    .url('Ссылка должна быть валидным URL')
    .required('Не должно быть пустым')
    .notOneOf(feeds.map((feed) => feed.url), 'RSS уже добавлен')
}

const elements = {
  form: document.querySelector('[data-form="rss"]'),
  input: document.querySelector('#rss-url'),
  feedback: document.querySelector('#rss-feedback'),
}

initView(state, elements)

elements.form.addEventListener('submit', (e) => {
  e.preventDefault()
  const url = elements.input.value.trim()
  const schema = getSchema(state.feeds)
  schema.validate(url)
    .then((validUrl) => {
      state.form.status = 'filling'
      state.form.error = null
      state.feeds.push({ url: validUrl })

      elements.form.reset()
      elements.input.focus()
    })
    .catch((err) => {
      state.form.status = 'error'
      state.form.error = err.message
    })

})
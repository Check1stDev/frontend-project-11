import { proxy } from 'valtio/vanilla'
import './style.css'
import * as yup from 'yup'
import initView from './view.js'
import i18n from 'i18next'
import resources from './locales/index.js'

i18n
  .init({
  lng: 'ru',
  resources,
  })
  .then(() => {
    
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
        .url('errors.invalidUrl')
        .required('errors.required')
        .notOneOf(feeds.map((feed) => feed.url), 'errors.duplicate')
    }

    const elements = {
      form: document.querySelector('[data-form="rss"]'),
      input: document.querySelector('#rss-url'),
      feedback: document.querySelector('#rss-feedback'),
      
      title: document.querySelector('[data-i18n="app.title"]'),
      description: document.querySelector('[data-i18n="app.description"]'),
      label: document.querySelector('[data-i18n="form.label"]'),
      placeholder: document.querySelector('[data-i18n="form.placeholder"]'),
      submit: document.querySelector('[data-i18n="form.submit"]'),
      example: document.querySelector('[data-i18n="form.example"]'),
    }

    initView(state, elements, i18n)

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
  })
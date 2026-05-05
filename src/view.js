import { snapshot, subscribe } from "valtio/vanilla";

export default (state, elements, i18n) => {
    const render = () => {
      const obj = snapshot(state)
      elements.title.textContent = i18n.t('app.title')
      elements.description.textContent = i18n.t('app.description')
      elements.label.textContent = i18n.t('form.label')
      elements.placeholder.setAttribute('placeholder', i18n.t('form.placeholder'))
      elements.submit.textContent = i18n.t('form.submit')
      elements.example.textContent = i18n.t('form.example')

      if (obj.form.status === 'error') {
        elements.form.classList.add('rss-form-invalid')
        elements.input.setAttribute('aria-invalid', 'true')
        elements.feedback.textContent = i18n.t(obj.form.error)
        return
      }
    elements.form.classList.remove('rss-form-invalid')
    elements.input.removeAttribute('aria-invalid')
    elements.feedback.textContent = ''
    }
    subscribe(state, render)
    render()
}
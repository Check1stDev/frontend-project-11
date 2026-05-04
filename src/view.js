import { snapshot, subscribe } from "valtio/vanilla";

export default (state, elements) => {
    const render = () => {
      const obj = snapshot(state)
      if (obj.form.status === 'error') {
        elements.form.classList.add('rss-form-invalid')
        elements.input.setAttribute('aria-invalid', 'true')
        elements.feedback.textContent = obj.form.error
        return
      }
    elements.form.classList.remove('rss-form-invalid')
    elements.input.removeAttribute('aria-invalid')
    elements.feedback.textContent = ''
    }
    subscribe(state, render)
}
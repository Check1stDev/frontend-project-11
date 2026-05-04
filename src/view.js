import { snapshot, subscribe } from "valtio/vanilla";

export default (state, elements) => {
    const render = () => {
      const obj = snapshot(state)
      if (obj.form.status === 'error') {
        elements.input.classList.add('is-invalid')
        elements.input.setAttribute('aria-invalid', 'true')
        elements.feedback.textContent = obj.form.error
        return
      }
    elements.input.classList.remove('is-invalid')
    elements.input.removeAttribute('aria-invalid')
    elements.feedback.textContent = ''
    }
    subscribe(state, render)
}
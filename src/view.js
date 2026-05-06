import { snapshot, subscribe } from 'valtio/vanilla'

export default (state, elements, i18n) => {
  const renderFeeds = (feeds) => {
    elements.feedsContainer.innerHTML = ''
    feeds.forEach((feed) => {
      const crLi = document.createElement('li')
      crLi.classList.add('mb-3')
      const crTitle = document.createElement('h3')
      crTitle.classList.add('feed-title')
      crTitle.textContent = feed.title
      const crDesc = document.createElement('p')
      crDesc.classList.add('text-muted', 'small', 'mb-0')
      crDesc.textContent = feed.description
      crLi.append(crTitle, crDesc)
      elements.feedsContainer.append(crLi)
    })
  }
  const renderPosts = (posts, readPosts) => {
    elements.postsContainer.innerHTML = ''
    posts.forEach((post) => {
      const crLi = document.createElement('li')
      crLi.classList.add('mb-3', 'd-flex', 'justify-content-between', 'align-items-center')
      const a = document.createElement('a')
      a.href = post.link
      a.textContent = post.title
      a.classList.add('fs-5')
      if (readPosts.includes(post.id)) {
        a.classList.add('link-secondary', 'fw-normal')
      }
      else {
        a.classList.add('text-primary', 'fw-bold')
      }
      const btn = document.createElement('button')
      btn.textContent = 'Просмотр'
      btn.classList.add('btn', 'btn-warning', 'fw-semibold', 'btn-sm')
      btn.dataset.id = post.id
      crLi.append(a, btn)
      elements.postsContainer.append(crLi)
    })
  }
  const render = () => {
    const obj = snapshot(state)
    console.log(obj.form.status)
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
      elements.feedback.classList.add('text-danger')
      return
    }

    elements.form.classList.remove('rss-form-invalid')
    elements.input.removeAttribute('aria-invalid')
    elements.feedback.textContent = ''
    if (obj.feeds.length > 0) {
      elements.feedsPostsSection.classList.remove('hidden')
      renderFeeds(obj.feeds)
      renderPosts(obj.posts, obj.readPosts)
    }
    if (obj.form.status === 'success') {
      elements.feedback.textContent = i18n.t('success.loaded')
      elements.feedback.classList.add('text-success')
      elements.feedback.classList.remove('text-danger')
    }
  }
  subscribe(state, render)
  render()
}

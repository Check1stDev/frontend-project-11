import { proxy } from 'valtio/vanilla'
import './style.css'
import * as yup from 'yup'
import initView from './view.js'
import i18n from 'i18next'
import resources from './locales/index.js'
import fetchFeed from './api.js'
import parse from './parser.js'
import { v4 as uuidv4 } from 'uuid';

i18n
  .init({
  lng: 'ru',
  resources,
  })
  .then(() => {
    
    const state = proxy({
      feeds: [],
      posts: [],
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
      //Формы в шапке
      form: document.querySelector('[data-form="rss"]'),
      input: document.querySelector('#rss-url'),
      feedback: document.querySelector('#rss-feedback'),
      title: document.querySelector('[data-i18n="app.title"]'),
      description: document.querySelector('[data-i18n="app.description"]'),
      label: document.querySelector('[data-i18n="form.label"]'),
      placeholder: document.querySelector('[data-i18n="form.placeholder"]'),
      submit: document.querySelector('[data-i18n="form.submit"]'),
      example: document.querySelector('[data-i18n="form.example"]'),
      //Вывод 
      feedsContainer: document.querySelector('[data-container="feeds"]'),
      postsContainer: document.querySelector('[data-container="posts"]'),
      feedsPostsSection: document.getElementById('feeds-posts-section'),
    }

    initView(state, elements, i18n)

    const addFeed = (url) => {
      fetchFeed(url)
      .then((xmlString) => {
        const arrFeed = parse(xmlString)
        const feed = state.feeds
        const posts = state.posts
        const countId = uuidv4()
        const feedItem = (arr) => {
          return {
          url: url,
          id: countId,
          title: arr.channel.title,
          description: arr.channel.description
          }
        }

        const postItem = (arrFeedItems) => {
          return {
          id: uuidv4(),
          feedId: countId,
          title: arrFeedItems.title,
          link: arrFeedItems.link
          }

        }
          feed.push(feedItem(arrFeed)),
          arrFeed.items.forEach((item) => {
            posts.push(postItem(item))
          })
      })
    };

    const updateFeeds = (feeds) => {
      feeds.forEach((feed) => {
      fetchFeed(feed.url)
        .then((xmlString) => {
          const arrFeed = parse(xmlString)
          const newPosts = arrFeed.items.filter((item) => {
              return !state.posts.some((post) => post.link === item.link)
          })
          const postItem = (arrFeedItems) => {
          return {
          id: uuidv4(),
          feedId: feed.id,
          title: arrFeedItems.title,
          link: arrFeedItems.link
          }
        }
          newPosts.forEach((item) => {
            state.posts.unshift(postItem(item))
          })
        })
      });
      setTimeout(() => {
        updateFeeds(feeds)
        }, 5000);
    }


    elements.form.addEventListener('submit', (e) => {
      e.preventDefault()
      const url = elements.input.value.trim()
      const schema = getSchema(state.feeds)
      schema.validate(url)
        .then((validUrl) => {
          state.form.status = 'filling'
          state.form.error = null
          addFeed(validUrl)
          updateFeeds(state.feeds)

          elements.form.reset()
          elements.input.focus()
        })
        .catch((err) => {
          state.form.status = 'error'
          state.form.error = err.message
        })

    })
  })
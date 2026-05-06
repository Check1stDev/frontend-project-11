
const parse = (xmlString) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xmlString, 'application/xml');
    if (doc.querySelector('parsererror')) {
        throw new Error('Ошибка загрузки RSS')
    }
    const channelTitle = doc.querySelector('channel title').textContent;
    const channelDescription = doc.querySelector('channel description').textContent;
    const items = Array.from(doc.querySelectorAll('item'));
    const parsedItems = items.map((item) => {
        const title = item.querySelector('title').textContent;
        const link = item.querySelector('link').textContent;
        const description = item.querySelector('description').textContent;
        return { title, link, description }
    })
    return {
        channel: {
            title: channelTitle,
            description: channelDescription,
        },
        items: parsedItems,
    }                   

}

export default parse
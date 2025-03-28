document.addEventListener("DOMContentLoaded", () => {
    const createFeed = (url, containerId, thumbnailSource = "styles/images/KTK.png") => {
        const container = document.getElementById(containerId);
        const proxyUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`;

        fetch(proxyUrl)
            .then(response => response.json())
            .then(data => {
                if (data.items && data.items.length > 0) {
                    data.items.slice(0, 7).forEach(item => {
                        const pubDate = new Date(item.pubDate).toLocaleDateString('fi-FI', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        });

                        const description = item.description.length > 160
                            ? item.description.substring(0, 157) + "..."
                            : item.description;

                        const thumbnail = item.enclosure?.link || thumbnailSource;

                        const li = document.createElement('li');
                        li.innerHTML = `
                <div class="rss-item">
                  <img src="${thumbnail}" alt="Thumbnail" class="rss-thumb" />
                  <div class="rss-content">
                    <a href="${item.link}" target="_blank" class="rss-title">${item.title}</a>
                    <p class="rss-date">${pubDate}</p>
                    <p class="rss-description">${description}</p>
                  </div>
                </div>
              `;
                        container.appendChild(li);
                    });
                } else {
                    container.innerHTML = "<li>Ei uutisia saatavilla.</li>";
                }
            })
            .catch(error => {
                container.innerHTML = "<li>Uutisten lataus epäonnistui.</li>";
                console.error(`RSS error for ${containerId}:`, error);
            });
    };

    // Load feeds
    createFeed(
        'https://www.kyberturvallisuuskeskus.fi/sites/default/files/rss/news.xml',
        'rss-ncsc',
        'styles/images/KTKncsc.png'
    );

    createFeed(
        'https://kyberturvallisuuskeskus.fi/feed/rss/fi/399',
        'rss-399',
        'styles/images/KTK.png'
    );

    createFeed(
        'https://kyberturvallisuuskeskus.fi/feed/rss/fi',
        'rss-fi',
        'styles/images/KTKfi.png'
    );
});

document.addEventListener("DOMContentLoaded", () => {
    const rssContainer = document.getElementById("rss-hackernews");
    const feedUrl = 'https://api.rss2json.com/v1/api.json?rss_url=https://feeds.feedburner.com/TheHackersNews';
  
    fetch(feedUrl)
      .then(response => response.json())
      .then(data => {
        if (data.items && data.items.length > 0) {
          data.items.slice(0, 6).forEach(item => {
            const thumbnail = item.enclosure?.link || "https://via.placeholder.com/100";
            const pubDate = new Date(item.pubDate).toLocaleDateString('fi-FI', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            });
            const description = item.description.length > 160
              ? item.description.substring(0, 157) + "..."
              : item.description;
  
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
            rssContainer.appendChild(li);
          });
        } else {
          rssContainer.innerHTML = "<li>Ei uutisia saatavilla.</li>";
        }
      })
      .catch(error => {
        rssContainer.innerHTML = "<li>Uutisten lataus epäonnistui.</li>";
        console.error("RSS error:", error);
      });
  });
  
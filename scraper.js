const jsdom = require('jsdom');
const { JSDOM } = jsdom;

class Scraper {
  constructor(config) {
    this.config = config;
    this.results = new Map();
  }

  async scrape() {
    var promises = [];

    this.config.items.forEach((item) => {
      promises.push(this._scrapeItem(item));
    });

    return await Promise.all(promises).then(() => {
      return this.output();
    });
  }

  output() {
    const out = [];
    this.results.forEach((matches, item) => {
      return matches.forEach((match) => {
        out.push(`${item.store}: ${match}`);
      });
    });

    return out;
  }

  _scrapeItem(item) {
    return axios
      .get(item.url)
      .then((res) => {
        const parsed = this._parse(item, res);
        const matched = this._search(parsed);
        this.results.set(item, matched);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  _search(results) {
    return results.filter((r) => {
      let val = false;
      this.config.searchTerms.forEach((term) => {
        if (r.includes(term)) {
          val = true;
        }
      });

      return val;
    });
  }

  _parse(item, res) {
    const dom = new JSDOM(res.data);
    const products = dom.window.document.querySelectorAll(item.pattern);
    return Array.from(products).map((p) => {
      return p.innerHTML;
    });
  }
}

// Helpers

module.exports = Scraper;

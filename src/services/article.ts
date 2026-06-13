import axios from 'axios';
import * as cheerio from 'cheerio';

interface Article {
  title: string;
  body: string;
}

export async function extractArticle(url: string): Promise<Article> {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    // NOTE: This is a generic way to get the title and body.
    // For better results, this selector logic should be customized
    // for specific news website structures (e.g., 'meta[property="og:title"]' or '.article-body').
    const title = $('head > title').text() || $('h1').first().text();
    
    // A simple heuristic to find the main content.
    // A more robust solution would analyze paragraph lengths and density.
    let body = $('article').text();
    if (body.length < 200) {
      body = $('main').text();
    }
    if (body.length < 200) {
      body = $('body').text();
    }

    // Clean up the text
    const cleanedBody = body.replace(/\s\s+/g, ' ').trim();

    return {
      title,
      body: cleanedBody,
    };
  } catch (error) {
    console.error('Error fetching or parsing the article:', error);
    throw new Error('Failed to extract the article. Please check the URL and your network connection.');
  }
}

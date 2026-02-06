// YouTube API functions (no DOM manipulation)

export const API_KEY = "AIzaSyBLzR7QyAkq44ejXRxnSekbtKAWiViykkc";

const SEARCH_BASE = "https://www.googleapis.com/youtube/v3/search";
const SUGGEST_BASE = "https://suggestqueries.google.com/complete/search";

export async function searchYouTube(query, maxResults = 25) {
  const url = `${SEARCH_BASE}?part=snippet&type=video&maxResults=${maxResults}&q=${encodeURIComponent(query)}&key=${API_KEY}`;
  const res = await fetch(url);
  const json = await res.json();
  const items = Array.isArray(json.items) ? json.items : [];
  return items.map(i => ({
    id: i.id && i.id.videoId ? i.id.videoId : null,
    title: i.snippet?.title || "",
    channel: i.snippet?.channelTitle || "",
    description: i.snippet?.description || "",
    thumb: (i.snippet?.thumbnails?.medium || i.snippet?.thumbnails?.default)?.url || ""
  })).filter(v => v.id);
}

export async function getSuggestions(query, limit = 8) {
  const url = `${SUGGEST_BASE}?client=firefox&ds=yt&q=${encodeURIComponent(query)}`;
  const res = await fetch(url);
  const json = await res.json();
  const list = Array.isArray(json) && Array.isArray(json[1]) ? json[1] : [];
  return list.slice(0, limit);
}

export async function getRelated(videoId, maxResults = 10) {
  const url = `${SEARCH_BASE}?part=snippet&type=video&maxResults=${maxResults}&relatedToVideoId=${encodeURIComponent(videoId)}&key=${API_KEY}`;
  const res = await fetch(url);
  const json = await res.json();
  const items = Array.isArray(json.items) ? json.items : [];
  return items.map(i => i.id?.videoId).filter(Boolean);
}

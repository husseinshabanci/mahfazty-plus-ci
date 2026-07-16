const Database = require('better-sqlite3');
const db = new Database('.tmp/data.db');

try {
  // Update download button text to 'Download'
  const updateLanding = db.prepare(`
    UPDATE landing_pages
    SET download_text = ?
    WHERE id = 3 OR id = 1
  `);
  updateLanding.run('Download');

  console.log("Database updated successfully. Changed download button text to 'Download'.");
} catch (err) {
  console.error("Database update failed:", err);
} finally {
  db.close();
}

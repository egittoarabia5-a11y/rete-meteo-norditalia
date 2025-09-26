// Aggiorna il JSON delle stazioni CML
async function updateCMLJSON() {
    try {
      const PROXY_BASE = 'https://corsproxy.io/?';
      const REMOTE = 'http://www.centrometeolombardo.com/Moduli/refx.php?t=all&r=1756559495232';
      const res = await fetch(PROXY_BASE + encodeURIComponent(REMOTE));
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const text = await res.text();
  
      // Estrazione coords
      const matchCoords = text.match(/var coords\s*=\s*(\[\[[\s\S]*?\]\]);/);
      if (!matchCoords) throw new Error('Coords non trovati');
      const coords = JSON.parse(matchCoords[1].replace(/'/g, '"'));
  
      // Estrazione datostazione
      const matchData = text.match(/datostazione\s*=\s*(\[\[[\s\S]*?\]\]);/);
      if (!matchData) throw new Error('Dati stazioni non trovati');
      const datostazione = JSON.parse(matchData[1].replace(/'/g, '"'));
  
      function fittizioAReale(xFittizio, yFittizio) {
        const lon = ((8260 + xFittizio / 1.18) / 1000).toFixed(3);
        const lat = ((46730 - yFittizio / 1.72) / 1000).toFixed(3);
        return { lat, lon };
      }
  
      function formatTimestamp(date) {
        const pad = n => n.toString().padStart(2, '0');
        return `${pad(date.getDate())}/${pad(date.getMonth()+1)}/${date.getFullYear()} ` +
               `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
      }
  
      const stations = coords.map((c, i) => {
        const row = datostazione[i] || [];
        const { lat, lon } = fittizioAReale(parseFloat(c[3]), parseFloat(c[4]));
        const isInactive = row[0] === '1' || row[0] === 1;
  
        const p = v => (v === null || v === undefined || v === '' ? null : parseFloat(v));
  
        return {
          S: row[0],
          N: c[1] || c[0],
          T: isInactive ? null : p(row[4]),
          TH: isInactive ? null : p(row[5]),
          TL: isInactive ? null : p(row[7]),
          D: isInactive ? null : p(row[15]),
          DH: isInactive ? null : p(row[16]),
          DL: isInactive ? null : p(row[18]),
          H: isInactive ? null : p(row[9]),
          HH: isInactive ? null : p(row[10]),
          HL: isInactive ? null : p(row[12]),
          V: isInactive ? null : p(row[28]),
          G: isInactive ? null : p(row[25]),
          GH: isInactive ? null : p(row[26]),
          WD: isInactive ? null : row[29] || null,
          R: isInactive ? null : p(row[37]),
          RR: isInactive ? null : p(row[41]),
          LAT: parseFloat(lat),
          LON: parseFloat(lon)
        };
      });
  
      const jsonData = {
        timestamp: formatTimestamp(new Date()),
        stations
      };
  
      // Stampa sul console (su StackBlitz non puoi salvare file direttamente)
      console.log(JSON.stringify(jsonData, null, 2));
  
      return jsonData;
  
    } catch (err) {
      console.error('Errore fetch dati CML:', err);
      return null;
    }
  }
  
  // Aggiorna ogni 30 secondi
  updateCMLJSON();
  setInterval(updateCMLJSON, 30000);
  
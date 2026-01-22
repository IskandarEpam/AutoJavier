interface TestResult {
  name: string;
  method: string;
  url: string;
  statusCode: number;
  statusText: string;
  responseTime: number;
  success: boolean;
  response?: unknown;
  error?: string;
}

export function generateHtmlReport(results: TestResult[]): string {
  const timestamp = new Date().toLocaleString();
  const passedCount = results.filter(r => r.success).length;
  const failedCount = results.filter(r => !r.success).length;
  const totalTime = results.reduce((sum, r) => sum + r.responseTime, 0);

  const resultRows = results
    .map(result => {
      const statusBadge = result.success 
        ? '<span class="badge PASS">PASS</span>' 
        : '<span class="badge FAIL">FAIL</span>';
      
      const responsePreview = result.response
        ? JSON.stringify(result.response, null, 2)
        : result.error || 'No response';
      
      return `
        <tr>
          <td><button class="expand-btn" onclick="toggleDetail(event)">▶</button></td>
          <td>${escapeHtml(result.name)}</td>
          <td>${result.method}</td>
          <td><code>${escapeHtml(result.url)}</code></td>
          <td>${statusBadge}</td>
          <td>${result.responseTime}ms</td>
        </tr>
        <tr class="detail-row">
          <td colspan="6">
            <div class="detail-content">
              <p><strong>Status:</strong> ${result.statusCode} ${result.statusText}</p>
              <p><strong>Response Time:</strong> ${result.responseTime}ms</p>
              <p><strong>Response:</strong></p>
              <div class="detail-msg">${escapeHtml(responsePreview)}</div>
            </div>
          </td>
        </tr>
      `;
    })
    .join('\n');

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>API Test Report</title>
    <link href="https://fonts.googleapis.com/css2?family=Anton&family=Black+Ops+One&family=Bangers&display=swap" rel="stylesheet">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Black+Ops+One&family=Bangers&display=swap');
        
        :root {
            --red: #ff0000;
            --black: #000000;
            --yellow: #ffff00;
            --white: #b8b8b8;
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Bangers', cursive;
            background: #1a1a1a;
            padding: 20px;
            min-height: 100vh;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: var(--white);
            border: 8px solid var(--black);
            box-shadow: 12px 12px 0 var(--red);
        }
        
        .header {
            background: var(--red);
            color: var(--yellow);
            padding: 50px 30px;
            text-align: center;
            border-bottom: 8px solid var(--black);
            transform: skewY(-2deg);
            margin: -5px -5px 0 -5px;
        }
        
        .header h1 {
            font-size: 5em;
            font-weight: 900;
            letter-spacing: 5px;
            text-transform: uppercase;
            font-family: 'Black Ops One', cursive;
            -webkit-text-stroke: 5px var(--black);
            paint-order: stroke fill;
            text-shadow: 6px 6px 0 var(--black);
            transform: skewY(2deg) rotate(-2deg);
            margin-bottom: 20px;
        }
        
        .header p {
            font-size: 1.5em;
            margin-top: 10px;
            -webkit-text-stroke: 1.7px var(--black);
        }
        
        .header-info {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 15px;
            margin-top: 30px;
            transform: skewY(2deg);
        }
        
        .info-card {
            background: var(--black);
            color: var(--yellow);
            padding: 20px;
            border: 5px solid var(--black);
            box-shadow: 6px 6px 0 var(--black);
            transition: all 0.2s;
            transform: rotate(-1deg);
        }
        
        .info-card:hover {
            transform: rotate(-1deg) translate(-4px, -4px);
            box-shadow: 10px 10px 0 var(--black);
        }
        
        .info-card:nth-child(even) {
            transform: rotate(1deg);
            background: var(--red);
        }
        
        .info-card:nth-child(even):hover {
            transform: rotate(1deg) translate(-4px, -4px);
        }
        
        .info-label {
            font-size: 1.3em;
            text-transform: uppercase;
            letter-spacing: 2px;
            font-weight: 900;
            color: var(--yellow);
            -webkit-text-stroke: 1px var(--black);
        }
        
        .info-value {
            font-size: 3em;
            font-weight: 900;
            font-family: 'Anton', sans-serif;
            color: var(--yellow);
            -webkit-text-stroke: 3px var(--black);
            paint-order: stroke fill;
            text-shadow: 4px 4px 0 var(--black);
            margin-top: 8px;
        }
        
        .content {
            padding: 40px 30px;
            background: var(--white);
        }
        
        .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
            gap: 25px;
            margin-bottom: 40px;
        }
        
        .stat-box {
            padding: 35px 25px;
            text-align: center;
            font-weight: 900;
            border: 6px solid var(--black);
            transition: all 0.2s;
            box-shadow: 8px 8px 0 var(--black);
        }
        
        .stat-box:hover {
            transform: translate(-4px, -4px) rotate(-2deg);
            box-shadow: 12px 12px 0 var(--black);
        }
        
        .stat-box.pass {
            background: var(--black);
            color: var(--yellow);
            transform: rotate(-2deg);
        }
        
        .stat-box.fail {
            background: var(--red);
            color: var(--yellow);
            transform: rotate(2deg);
        }
        
        .stat-number {
            font-size: 4.5em;
            font-family: 'Anton', sans-serif;
            font-weight: 900;
            letter-spacing: 3px;
            -webkit-text-stroke: 4px var(--black);
            paint-order: stroke fill;
            text-shadow: 5px 5px 0 var(--black);
            margin-bottom: 8px;
        }
        
        .stat-box div:last-child {
            font-size: 1.3em;
            -webkit-text-stroke: 2px var(--black);
            paint-order: stroke fill;
            text-transform: uppercase;
            letter-spacing: 2px;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 30px;
            border: 5px solid var(--black);
        }
        
        thead {
            background: var(--black);
            border-bottom: 6px solid var(--black);
        }
        
        th {
            padding: 20px 15px;
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: 2px;
            color: var(--yellow);
            font-size: 1.1em;
            font-family: 'Bangers', cursive;
            -webkit-text-stroke: 2px var(--black);
            paint-order: stroke fill;
            border-right: 3px solid var(--red);
        }
        
        th:hover {
            background: var(--red);
            color: var(--yellow);
        }
        
        th:last-child {
            border-right: none;
        }
        
        td {
            padding: 15px;
            border-bottom: 3px solid var(--black);
            border-right: 2px solid #999;
            color: var(--black);
            font-weight: 700;
            font-size: 1em;
        }
        
        td:last-child {
            border-right: none;
        }
        
        tbody tr {
            transition: all 0.2s;
            background: var(--white);
        }
        
        tbody tr:nth-child(4n+1),
        tbody tr:nth-child(4n+2) {
            background: #a8a8a8;
        }
        
        tbody tr:hover {
            background: var(--red);
            color: var(--yellow);
        }
        
        code {
    color: var(--black);
    padding: 4px 8px;
    border-radius: 3px;
    font-family: 'Courier New', monospace;
    font-size: 0.85em;
    font-weight: 900;
    -webkit-text-stroke: 1px var(--black);
             }
        
        .badge {
            display: inline-block;
            padding: 10px 20px;
            font-weight: 900;
            font-size: 0.9em;
            text-transform: uppercase;
            letter-spacing: 2px;
            border: 4px solid var(--black);
            box-shadow: 5px 5px 0 var(--black);
            transition: all 0.2s;
            font-family: 'Bangers', cursive;
            -webkit-text-stroke: 1px var(--black);
            paint-order: stroke fill;
            transform: rotate(-2deg);
        }
        
        .badge.PASS {
            background: var(--yellow);
            color: var(--black);
        }
        
        .badge.FAIL {
            background: var(--red);
            color: var(--yellow);
            transform: rotate(2deg);
        }
        
        .badge:hover {
            transform: rotate(-2deg) translate(-3px, -3px);
            box-shadow: 8px 8px 0 var(--black);
        }
        
        .expand-btn {
            background: var(--red);
            border: 4px solid var(--black);
            cursor: pointer;
            color: var(--yellow);
            width: 45px;
            height: 45px;
            font-weight: 900;
            box-shadow: 5px 5px 0 var(--black);
            transition: all 0.2s;
            font-size: 1.3em;
            font-family: 'Anton', sans-serif;
            -webkit-text-stroke: 2px var(--black);
            paint-order: stroke fill;
            padding: 0;
        }
        
        .expand-btn:hover {
            transform: translate(-3px, -3px) rotate(-5deg);
            box-shadow: 8px 8px 0 var(--black);
        }
        
        .detail-row {
            display: none;
        }
        
        .detail-row.show {
            display: table-row;
            background: var(--white);
            border-top: 4px solid var(--red);
        }
        
        .detail-content {
            padding: 25px;
            background: var(--white);
            border-top: 5px solid var(--black);
            border-left: 8px solid var(--red);
            color: var(--black);
            font-weight: 700;
        }
        
        .detail-content p {
            margin-bottom: 15px;
            font-size: 1em;
            font-weight: 700;
        }
        
        .detail-content strong {
            font-weight: 700;
      
        }
        
        .detail-msg {
            white-space: pre-wrap;
            font-family: 'Courier New', monospace;
            background: var(--black);
            color: var(--yellow);
            padding: 15px;
            border: 4px solid var(--black);
            box-shadow: 5px 5px 0 var(--black);
            font-weight: 700;
            margin-top: 10px;
            overflow-x: auto;
            font-size: 0.9em;
        }
        
        .footer {
            background: var(--black);
            color: var(--yellow);
            padding: 30px;
            text-align: center;
            border-top: 8px solid var(--black);
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: 2px;
            -webkit-text-stroke: 2px var(--black);
            paint-order: stroke fill;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>API TEST REPORT</h1>
            <p>Generated on ${timestamp}</p>
            <div class="header-info">
                <div class="info-card">
                    <div class="info-label">Total</div>
                    <div class="info-value">${results.length}</div>
                </div>
                <div class="info-card">
                    <div class="info-label">Passed</div>
                    <div class="info-value">${passedCount}</div>
                </div>
                <div class="info-card">
                    <div class="info-label">Failed</div>
                    <div class="info-value">${failedCount}</div>
                </div>
                <div class="info-card">
                    <div class="info-label">Total Time</div>
                    <div class="info-value">${totalTime}ms</div>
                </div>
            </div>
        </div>
        
        <div class="content">
            <div class="stats">
                <div class="stat-box pass">
                    <div class="stat-number">${passedCount}</div>
                    <div>Passed</div>
                </div>
                <div class="stat-box fail">
                    <div class="stat-number">${failedCount}</div>
                    <div>Failed</div>
                </div>
                <div class="stat-box pass">
                    <div class="stat-number">${results.length}</div>
                    <div>Total</div>
                </div>
            </div>
            
            <table>
                <thead>
                    <tr>
                        <th style="width:40px;"></th>
                        <th>Test Name</th>
                        <th>Method</th>
                        <th>URL</th>
                        <th>Status</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    ${resultRows}
                </tbody>
            </table>
        </div>
        
        <div class="footer">
            <p>MrPostmanAuto - API Test Report</p>
        </div>
    </div>
    
    <script>
        function toggleDetail(event) {
            event.preventDefault();
            const btn = event.target;
            const row = btn.closest('tr');
            const detailRow = row.nextElementSibling;
            
            if (detailRow && detailRow.classList.contains('detail-row')) {
                detailRow.classList.toggle('show');
                btn.classList.toggle('expanded');
                btn.textContent = detailRow.classList.contains('show') ? '▼' : '▶';
            }
        }
    </script>
</body>
</html>
  `;
}

function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

export type { TestResult };
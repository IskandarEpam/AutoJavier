/**
 * Main automation script for testing HTTP endpoints
 * Reads requests from requests.http file, executes each enabled request,
 * collects results, and generates an HTML test report
 */


import { chromium } from 'playwright';
import { parseHttpFile } from './parser';
import { generateHtmlReport, type TestResult } from './report-generator';
import * as path from 'path';
import * as fs from 'fs';

async function testEndpoints() {
  const httpFilePath = path.join(__dirname, '..', 'requests.http');
  const requests = parseHttpFile(httpFilePath);
  const enabledRequests = requests.filter(req => req.enabled);
  
  console.log(`📋 Found ${enabledRequests.length} enabled request(s)\n`);

  const browser = await chromium.launch();
  const context = await browser.newContext();
  const request = context.request;
  
  // Array to store test results
  const results: TestResult[] = [];

  try {
    for (const httpRequest of enabledRequests) {
      console.log(`🚀 Testing: ${httpRequest.name}`);
      console.log(`   Method: ${httpRequest.method}`);
      console.log(`   URL: ${httpRequest.url}`);
      
      if (httpRequest.headers) {
        console.log(`   Headers:`, JSON.stringify(httpRequest.headers));
      }
      
      if (httpRequest.body) {
        console.log(`   Body: ${httpRequest.body}`);
      }
      
      console.log('');

      const startTime = Date.now();

      try {
        let response;
        
        // Build request options with headers and body
        const requestOptions: any = {};
        
        if (httpRequest.headers) {
          requestOptions.headers = httpRequest.headers;
        }
        
        if (httpRequest.body) {
          // Try to parse as JSON, otherwise send as string
          try {
            requestOptions.data = JSON.parse(httpRequest.body);
          } catch {
            requestOptions.data = httpRequest.body;
          }
        }

        // Make the request based on the method
        if (httpRequest.method === 'GET') {
          response = await request.get(httpRequest.url, requestOptions);
        } else if (httpRequest.method === 'POST') {
          response = await request.post(httpRequest.url, requestOptions);
        } else if (httpRequest.method === 'PUT') {
          response = await request.put(httpRequest.url, requestOptions);
        } else if (httpRequest.method === 'DELETE') {
          response = await request.delete(httpRequest.url, requestOptions);
        } else if (httpRequest.method === 'PATCH') {
          response = await request.patch(httpRequest.url, requestOptions);
        }

        if (!response) throw new Error('No response received');

        const responseTime = Date.now() - startTime;

        console.log(`   📊 Status Code: ${response.status()}`);
        console.log(`   📝 Status Text: ${response.statusText()}`);
        console.log(`   ⏱️  Response Time: ${responseTime}ms`);

        let responseData;
        try {
          responseData = await response.json();
          console.log('   ✅ Response:');
          console.log('   ' + JSON.stringify(responseData, null, 2).split('\n').join('\n   '));
        } catch {
          const text = await response.text();
          responseData = text;
          console.log('   ✅ Response:', text);
        }

        results.push({
          name: httpRequest.name,
          method: httpRequest.method,
          url: httpRequest.url,
          statusCode: response.status(),
          statusText: response.statusText(),
          responseTime,
          success: response.status() >= 200 && response.status() < 300,
          response: responseData,
        });

      } catch (error) {
        const responseTime = Date.now() - startTime;
        console.error(`   ❌ Error: ${error}`);

        results.push({
          name: httpRequest.name,
          method: httpRequest.method,
          url: httpRequest.url,
          statusCode: 0,
          statusText: 'Error',
          responseTime,
          success: false,
          error: String(error),
        });
      }

      console.log('---\n');
    }

  } finally {
    await context.close();
    await browser.close();
  }

  // Generate and save HTML report
  const htmlReport = generateHtmlReport(results);
  const reportPath = path.join(__dirname, '..', 'test-report.html');
  fs.writeFileSync(reportPath, htmlReport);
  
  console.log(`\n📊 Report generated: ${reportPath}`);
}

testEndpoints();
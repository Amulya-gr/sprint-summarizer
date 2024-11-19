import { fetchSprintData } from './devrev-api';
import { postToSlack } from './slack-api';
import { summarizeSprint } from './summarizer';
import { scheduleSummary } from './scheduler';

import * as dotenv from 'dotenv';
dotenv.config();

// Main entry point
function main() {
    // Schedule the sprint summary to be generated and posted to Slack
    scheduleSummary();
}

// Run the main function when the script is executed
main();

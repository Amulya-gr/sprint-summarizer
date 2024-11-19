import axios from "axios";
export async function postToSlack(
    summary: { totalTasks: number; completedTasks: number; pendingTasks: number },
    slackMessage: { text: string },
    slackChannel: string = process.env.SLACK_CHANNEL || 'general', // Default to 'general' if not provided
    slackToken: string = process.env.SLACK_TOKEN || ''
) {
    const webhookUrl = `https://hooks.slack.com/services/${slackToken}`;

    try {
        await axios.post(webhookUrl, slackMessage, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('Summary posted to Slack successfully.');
    } catch (error) {
        console.error('Error posting summary to Slack:', error);
    }
}


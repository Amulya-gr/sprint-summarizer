import axios from 'axios';
import { fetchSprintData } from './devrev-api';
import { postToSlack } from './slack-api';

/**
 * Summarizes the sprint using AI for insights and posts it to Slack.
 */
export async function summarizeSprint() {
    try {
        // Fetch sprint data
        const sprintData = await fetchSprintData();

        // Structure sprint data for AI processing
        const structuredData = {
            totalTasks: sprintData.tasks.length,
            completedTasks: sprintData.tasks.filter((task: any) => task.status === 'completed').length,
            pendingTasks: sprintData.tasks.filter((task: any) => task.status !== 'completed').length,
            blockers: sprintData.tasks
                .filter((task: any) => task.status === 'blocked')
                .map((task: any) => task.title),
            highlights: sprintData.tasks
                .filter((task: any) => task.status === 'completed')
                .map((task: any) => task.title),
        };

        // Generate AI-based summary
        const aiSummary = await generateSummaryWithAI(structuredData);

        // Post summary to Slack
        const slackMessage = {
            text: `Sprint Summary:
            - Total Tasks: ${structuredData.totalTasks}
            - Completed Tasks: ${structuredData.completedTasks}
            - Pending Tasks: ${structuredData.pendingTasks}
            - Highlights: ${structuredData.highlights.join(', ')}
            - Blockers: ${structuredData.blockers.join(', ')}
            
            AI-Generated Insights:
            ${aiSummary}`,
        };

        await postToSlack(structuredData,slackMessage);
    } catch (error) {
        console.error('Error summarizing sprint:', error);
    }
}

/**
 * Generate AI-based summary of the sprint based on the provided structured data.
 */
async function generateSummaryWithAI(structuredData: { totalTasks: number; completedTasks: number; pendingTasks: number; blockers: string[]; highlights: string[]; }): Promise<string> {
    const prompt = `
        Based on the following sprint data, provide a summary with insights:
        - Total Tasks: ${structuredData.totalTasks}
        - Completed Tasks: ${structuredData.completedTasks}
        - Pending Tasks: ${structuredData.pendingTasks}
        - Highlights: ${structuredData.highlights.join(', ')}
        - Blockers: ${structuredData.blockers.join(', ')}

        Insights:
    `;

    try {
        const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
            prompt,
            max_tokens: 150,
            temperature: 0.7,
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,  // Use environment variable for the API key
                'Content-Type': 'application/json',
            },
        });

        return response.data.choices[0].text.trim();
    } catch (error) {
        console.error('Error generating AI summary:', error);
        return 'Unable to generate AI summary at this time.';
    }
}

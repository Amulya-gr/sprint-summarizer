# 🚀 **Sprint Summary Automation**

An AI-powered automation tool to generate sprint summaries, provide insightful analytics, and post them directly to Slack. Designed for efficient team collaboration and productivity, this tool leverages data, AI, and scheduling to keep your team up-to-date effortlessly.

---

## 📋 **Features**
- **Data Fetching**: Pull sprint data seamlessly from DevRev.
- **AI-Powered Insights**: Summarize sprint highlights, blockers, and trends using OpenAI.
- **Slack Integration**: Automatically post structured and insightful summaries to your Slack channel.
- **Automated Scheduling**: Run weekly summaries with ease using cron jobs.

---

## 🛠 **Architecture Overview**

### 🔧 **Modules**
1. **DevRev API Integration**:
   - Fetches sprint data, including task statuses, blockers, and highlights.
2. **Summarizer**:
   - Processes the data and uses AI to generate detailed insights.
3. **Slack API Integration**:
   - Posts the AI-generated summaries to a specified Slack channel.
4. **Scheduler**:
   - Automates the weekly summary using a cron job.

---

### **📊 Architecture Diagram**
```plaintext
         +----------------+        +-----------------+          +-----------------+
         |                |        |                 |          |                 |
         |  DevRev API    +------->|    Summarizer    +--------->|   Slack API     |
         |                |        | (AI-powered)    |          |                 |
         +----------------+        +-----------------+          +-----------------+
                                          |
                                          |
                                  +-----------------+
                                  |  Scheduler       |
                                  | (node-cron)      |
                                  +-----------------+


```
## 📦 Tech Stack

- **Node.js**: Backend development.
- **Axios**: API requests for data fetching and posting.
- **node-cron**: Scheduling weekly summaries.
- **OpenAI API**: AI-powered insights.
- **Slack API**: Slack integration for posting messages.

---

## 🔗 How It Works

1. **Data Fetching**:
   - The `fetchSprintData` function queries the DevRev API and retrieves sprint data.

2. **Summarization**:
   - The data is structured and passed to OpenAI's API for insight generation.
   - AI generates a textual summary of sprint highlights, blockers, and trends.

3. **Slack Posting**:
   - The generated summary is formatted into a Slack-compatible message and posted to the specified channel.

4. **Scheduling**:
   - A `node-cron` job automates the process to run every Monday at 9 AM.


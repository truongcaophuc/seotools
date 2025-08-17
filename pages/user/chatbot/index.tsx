import { ChatbotDashboardLayout } from '@components/layout/dashboard/chatbot.dashboard.layout';
import { DetailConversation } from '@components/page/user/chatbot';

export default function ChatbotPage() {
    return (
        <ChatbotDashboardLayout
            title="Chatbot"
            breadcrumb={[{ label: 'Chatbot' }]}
        >
            <DetailConversation />
        </ChatbotDashboardLayout>
    );
}

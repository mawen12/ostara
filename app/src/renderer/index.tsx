import { createRoot } from 'react-dom/client';
import App from './App';
import * as Sentry from '@sentry/electron/renderer';

// CSS
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'reactflow/dist/style.css';
import 'allotment/dist/style.css';

if (window.NODE_ENV !== 'development' && window.configurationStore.isErrorReportingEnabled()) {
  Sentry.init({
    dsn: 'https://d28c9ac8891348d0926af5d2b8454988@o4504882077302784.ingest.sentry.io/4504882079531008',
    debug: true,
    beforeSend(event, hint) {
      // Check if it is an exception, and if so, show the report dialog
      if (event.exception) {
        Sentry.showReportDialog({ eventId: event.event_id });
      }
      return event;
    },
  });
  Sentry.setTag('service.type', 'electron.renderer');
}

// 应用的唯一顶部根节点 FiberRootNode
const container = document.getElementById('root')!;
const root = createRoot(container);
// 渲染 App
root.render(<App />);

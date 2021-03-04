import ReportageWidget from './ReportageWidget';

const url = 'https://ahj-online-reportage.herokuapp.com/sse';
const widget = new ReportageWidget(url);
widget.init();

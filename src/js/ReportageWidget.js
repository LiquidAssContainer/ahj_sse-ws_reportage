export default class ReportageWidget {
  constructor(url) {
    this.url = url;
    this.eventsContainer = document.getElementById('events');
  }

  init() {
    const eventSource = new EventSource(this.url);
    const eventTypes = ['start', 'action', 'freekick', 'goal'];
    for (const event of eventTypes) {
      eventSource.addEventListener(event, (e) => this.eventHandler(e));
    }
  }

  eventHandler(e) {
    const { message, date } = JSON.parse(e.data);
    const { type } = e;
    this.renderNewEvent({ message, type, date });
  }

  renderNewEvent(event) {
    const date = new Date(event.date);
    const formattedDate = this.getFormattedDate(date);
    const eventElem = `
      <div class="event">
        <div class="event_date">${formattedDate}</div>
        <div class="event_message event-${event.type}">${event.message}</div>
      </div>`;
    this.eventsContainer.insertAdjacentHTML('beforeend', eventElem);
  }

  getFormattedDate(date) {
    const twoDigits = (number) => (number < 10 ? `0${number}` : number);

    const day = twoDigits(date.getDate());
    const month = twoDigits(date.getMonth() + 1);
    const year = date.getFullYear().toString().substr(2, 2);
    const DMY = `${day}.${month}.${year}`;

    const hours = twoDigits(date.getHours());
    const minutes = twoDigits(date.getMinutes());
    const seconds = twoDigits(date.getSeconds());
    const time = `${hours}:${minutes}:${seconds}`;

    return `${time} ${DMY}`;
  }
}

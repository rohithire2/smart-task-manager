export function notify(message) {
  if (!('Notification' in window)) return

  if (Notification.permission === 'granted') {
    new Notification('Smart Task Manager', { body: message })
    return
  }

  if (Notification.permission !== 'denied') {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        new Notification('Smart Task Manager', { body: message })
      }
    })
  }
}

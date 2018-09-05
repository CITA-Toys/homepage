const j = jQuery

var bindToggleEventList = function() {
  var scroll = j('html, body')
  var eventsContainer = j('#events .events-container')
  var toggle = j('#events .events-toggle-img')
  var eventlist = j('#events .event-container.not-active')
  var keyevent = eventlist[2]
  var bottom1 = eventsContainer[0].getBoundingClientRect().bottom
  var bottom2 = keyevent.getBoundingClientRect().bottom
  var hComplete = eventsContainer.height()
  var hSpace = bottom1 - bottom2
  var hShrink = hComplete - hSpace
  eventsContainer.height(hShrink)

  var toggleEventList = function() {
    var h = eventsContainer.height()
    if (h == hComplete) {
      eventsContainer.height(hShrink)
      toggle.css('transform', 'translate(-50%) rotate(0deg)')
      scroll.animate(
        {
          scrollTop: eventsContainer.offset().top,
        },
        500
      )
    } else {
      eventsContainer.height(hComplete)
      toggle.css('transform', 'translate(-50%) rotate(180deg)')
      scroll.animate(
        {
          scrollTop: toggle.offset().top + toggle.height(),
        },
        500
      )
    }
  }

  toggle.on('click', toggleEventList)
}

const htmlEventCell = function(info) {
  const { classes, name, address, time, link } = info
  const html = `
        <a class="${classes}" target="_blank" href="${link}">
          <div class="event-name">
          ${name}
          </div>
          <div class="event-info">
          <span class="event-address">
            ${address} 
          </span>
          <span class="event-time">
            ${time}
          </span>
          </div>
        </a>`
  return html
}

const htmlEventList = function(eventInfos) {
  const l = eventInfos
  let html = ''
  const clstodo = 'event-container active'
  const clsdone = 'event-container not-active'
  const eventdone = []
  const eventtodo = []
  const now = new Date()
  eventInfos.forEach((info) => {
    const [year, month, day] = info.t.split('-')
    info.t = new Date(info.t)
    if (info.t > now) {
      info.classes = clstodo
      eventtodo.push(info)
    } else {
      eventdone.push(info)
      info.classes = clsdone
    }
  })
  eventtodo.sort((o1, o2) => {
    return o2.t < o1.t ? 1 : -1
  })
  eventdone.sort((o1, o2) => {
    return o2.t > o1.t ? 1 : -1
  })
  eventInfos.forEach((info, i) => {
    html += htmlEventCell(info)
  })
  return html
}

const fetchEvents = function() {
  j.get('https://cdn.staging.cryptape.com/nervos-eventlist.json', (list) => {
    var eventsContainer = j('#events .events-container')
    const html = htmlEventList(list)
    eventsContainer.append(html)
    bindToggleEventList()
  })
}

export { bindToggleEventList, fetchEvents }

import { bindToggleEventList, fetchEvents} from './event'

const bindAllAfterDomLoaded = function() {
  // bindToggleEventList()
  fetchEvents()
}

const main = function() {
  document.addEventListener('DOMContentLoaded', bindAllAfterDomLoaded)
}

main()

import Spectrum from '../components/views/spectrum/Spectrum.vue'
import EventList from '../components/views/spectrum/EventList.vue'
import ScannerList from '../components/views/spectrum/ScannerList.vue'
import ScanList from '../components/views/spectrum/ScanList.vue'

const routes = [
  {
    path: 'eventlist',
    alias: '',
    component: EventList,
    name: 'EventList',
    meta: {
      description: 'List of all events scanned',
      title: 'Event List',
      requiresAuth: true
    }
  },
  {
    path: 'scanlist',
    alias: '',
    component: ScanList,
    name: 'ScanList',
    meta: {
      description: 'List of all scans',
      title: 'Scan List',
      requiresAuth: true
    }
  },
  {
    path: 'scannerlist',
    alias: '',
    component: ScannerList,
    name: 'ScannerList',
    meta: {
      description: 'List of all scanners',
      title: 'Scanner List',
      requiresAuth: true
    }
  },
  {
    path: 'spectrum',
    alias: '',
    component: Spectrum,
    name: 'Spectrum',
    meta: {
      description: 'Overview of app',
      title: 'Spectrum',
      requiresAuth: true
    }
  }
]

export default routes

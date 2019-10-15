import { routes } from '../router'

import homeIcon from '../assets/home-icon.svg'
import plusIcon from '../assets/plus-icon.svg'

export const navbarItems = [
  { id: 1, label: 'Home', to: routes.home, img: homeIcon, alt: 'Ir a la home' },
  { id: 2, label: 'Nuevo', to: routes.new, img: plusIcon, alt: 'Agregar nuevo item' }
]

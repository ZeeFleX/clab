import { useContext } from 'react'
import { RootStore } from '../stores'
import { StoreContext } from '../contexts/store'

export const useStores = (): RootStore => useContext(StoreContext)

'use client'

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

interface ZipCodeContextType {
  enteredZipCode: string
  searchedZipCode: string
  setEnteredZipCode: (zipCode: string) => void
  setSearchedZipCode: (zipCode: string) => void
  showZipCodePopup: boolean
  setShowZipCodePopup: (show: boolean) => void
  clearZipCode: () => void
}

const ZipCodeContext = createContext<ZipCodeContextType | undefined>(undefined)

const STORAGE_KEY = 'flexdrive-zipcode'

export function ZipCodeProvider({ children }: { children: ReactNode }) {
  const [enteredZipCode, setEnteredZipCodeState] = useState('')
  const [searchedZipCode, setSearchedZipCodeState] = useState('')
  const [showZipCodePopup, setShowZipCodePopup] = useState(true)
  const [isInitialized, setIsInitialized] = useState(false)

  // Load zip code from localStorage on mount
  useEffect(() => {
    const savedZipCode = localStorage.getItem(STORAGE_KEY)
    if (savedZipCode) {
      setEnteredZipCodeState(savedZipCode)
      setSearchedZipCodeState(savedZipCode)
      setShowZipCodePopup(false) // Don't show popup if we have a saved zip code
    }
    setIsInitialized(true)
  }, [])

  // Custom setter for enteredZipCode that also saves to localStorage
  const setEnteredZipCode = (zipCode: string) => {
    setEnteredZipCodeState(zipCode)
    if (zipCode) {
      localStorage.setItem(STORAGE_KEY, zipCode)
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  }

  // Custom setter for searchedZipCode that also saves to localStorage
  const setSearchedZipCode = (zipCode: string) => {
    setSearchedZipCodeState(zipCode)
    if (zipCode) {
      localStorage.setItem(STORAGE_KEY, zipCode)
    }
  }

  // Function to clear zip code from both state and localStorage
  const clearZipCode = () => {
    setEnteredZipCodeState('')
    setSearchedZipCodeState('')
    localStorage.removeItem(STORAGE_KEY)
    setShowZipCodePopup(true)
  }

  // Don't render children until we've loaded from localStorage
  if (!isInitialized) {
    return null
  }

  return (
    <ZipCodeContext.Provider
      value={{
        enteredZipCode,
        searchedZipCode,
        setEnteredZipCode,
        setSearchedZipCode,
        showZipCodePopup,
        setShowZipCodePopup,
        clearZipCode,
      }}
    >
      {children}
    </ZipCodeContext.Provider>
  )
}

export function useZipCode() {
  const context = useContext(ZipCodeContext)
  if (context === undefined) {
    throw new Error('useZipCode must be used within a ZipCodeProvider')
  }
  return context
}

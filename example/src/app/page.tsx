'use client'

import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers'
import AdapterDateFns from 'date-fns-buddhist-adapter'
import { th } from 'date-fns/locale'
import { useState } from 'react'

export default function Home() {
  const [value, setValue] = useState(new Date())

  return (
    <div className="flex w-screen h-screen justify-center items-center bg-gradient-to-r from-sky-500 to-indigo-500">
      <div className="bg-white p-4 rounded">
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={th}>
          <MobileDatePicker
            format="dd MMM yyyy"
            defaultValue={value}
            disablePast
            onChange={(newValue: Date | null) => {
              if (!newValue) return
              setValue(newValue)
            }}
          />
        </LocalizationProvider>
      </div>
    </div>
  )
}

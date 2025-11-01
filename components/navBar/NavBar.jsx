'use client'
import React, { Suspense } from 'react'
import NavBarWrapper from './NavBarWrapper'
export default function page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
      <NavBarWrapper />
    </Suspense>
    )
}
